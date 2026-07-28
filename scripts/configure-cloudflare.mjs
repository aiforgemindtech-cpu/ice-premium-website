/**
 * Configures the Cloudflare zone for production.
 *
 * Two things cannot be done from the app itself on Workers:
 *
 *  1. Security headers. `public/_headers` is a Cloudflare Pages feature and is
 *     ignored by Workers. Next's `headers()` does not help either, because
 *     OpenNext serves prerendered HTML straight from the assets binding, so the
 *     Next server never runs for those routes. A response-header Transform Rule
 *     applies to every response regardless of how it was served.
 *
 *  2. Rate limiting on the contact endpoint. In-memory counters do not survive
 *     across isolates, so this belongs at the edge.
 *
 * Usage: CLOUDFLARE_API_TOKEN=... node scripts/configure-cloudflare.mjs
 * (falls back to the wrangler OAuth token if no explicit token is set)
 */
import { existsSync, readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const ZONE_NAME = "icepremiumltd.com";
const API = "https://api.cloudflare.com/client/v4";

function wranglerToken() {
  const candidates = [
    join(homedir(), ".wrangler", "config", "default.toml"),
    join(process.env.APPDATA || "", "xdg.config", ".wrangler", "config", "default.toml"),
  ];
  for (const c of candidates) {
    if (!existsSync(c)) continue;
    const m = readFileSync(c, "utf8").match(/oauth_token\s*=\s*"([^"]+)"/);
    if (m) return m[1];
  }
  return null;
}

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || wranglerToken();
if (!TOKEN) {
  console.error("No Cloudflare token. Run `npx wrangler login` first.");
  process.exit(1);
}

const call = async (path, init = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
    signal: AbortSignal.timeout(60000),
  });
  const json = await res.json().catch(() => ({}));
  if (!json.success) {
    const msg = (json.errors || []).map((e) => `${e.code}: ${e.message}`).join("; ");
    throw new Error(msg || `HTTP ${res.status}`);
  }
  return json.result;
};

const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "on",
};

const run = async () => {
  const zones = await call(`/zones?name=${ZONE_NAME}`);
  if (!zones.length) throw new Error(`zone ${ZONE_NAME} not found`);
  const zone = zones[0].id;
  console.log(`zone ${ZONE_NAME} -> ${zone}`);

  // ── 1. Security headers on every response ──────────────────────────────
  await call(`/zones/${zone}/rulesets/phases/http_response_headers_transform/entrypoint`, {
    method: "PUT",
    body: JSON.stringify({
      rules: [
        {
          action: "rewrite",
          description: "Security headers",
          expression: "true",
          enabled: true,
          action_parameters: {
            headers: Object.fromEntries(
              Object.entries(SECURITY_HEADERS).map(([k, v]) => [
                k,
                { operation: "set", value: v },
              ]),
            ),
          },
        },
      ],
    }),
  });
  console.log(`✓ security headers rule (${Object.keys(SECURITY_HEADERS).length} headers)`);

  // ── 2. Rate limit the contact endpoint ─────────────────────────────────
  try {
    await call(`/zones/${zone}/rulesets/phases/http_ratelimit/entrypoint`, {
      method: "PUT",
      body: JSON.stringify({
        rules: [
          {
            action: "block",
            description: "Throttle contact form submissions",
            expression:
              '(http.request.uri.path eq "/api/contact" and http.request.method eq "POST")',
            enabled: true,
            ratelimit: {
              characteristics: ["ip.src", "cf.colo.id"],
              period: 600,
              requests_per_period: 5,
              mitigation_timeout: 3600,
            },
          },
        ],
      }),
    });
    console.log("✓ rate limit: 5 POSTs per 10 min per IP, 1 hour block");
  } catch (err) {
    // The free plan allows one rule; report rather than fail the whole run.
    console.log(`! rate limit rule not applied — ${err.message}`);
  }
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
