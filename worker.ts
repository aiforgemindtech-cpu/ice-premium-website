/**
 * Worker entry point.
 *
 * Wraps the OpenNext handler purely to attach security headers to every
 * response. This is done here rather than anywhere more obvious because both
 * of the usual places silently fail on this stack:
 *
 *  - `public/_headers` is a Cloudflare *Pages* feature; Workers ignores it.
 *  - Next's `headers()` never runs for prerendered routes, because OpenNext
 *    serves that HTML straight from the assets binding without invoking the
 *    Next server.
 *
 * Wrapping the fetch handler catches everything: static assets, prerendered
 * HTML, and dynamic routes alike.
 */
// Typed via open-next-worker.d.ts — the bundle itself only exists after an
// OpenNext build, so the declaration stands in for it.
import handler from "./.open-next/worker.js";

const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "X-DNS-Prefetch-Control": "on",
};

/**
 * Rate limiting for the contact endpoint.
 *
 * Uses the Cache API rather than a binding. Two alternatives were tried and
 * rejected against the live deployment:
 *   - Cloudflare's native `ratelimits` binding binds correctly but never
 *     denies on this account (verified at 2 requests per 10s, six 200s).
 *   - A Durable Object class was not emitted by the deploy bundler, so the
 *     namespace resolved to nothing at runtime.
 *
 * `caches.default` needs no binding, is always present in Workers, and gives
 * the same per-colo guarantee Cloudflare's own limiter documents.
 */
const CONTACT_LIMIT = 5;
const CONTACT_WINDOW_S = 600;

async function overContactLimit(request: Request): Promise<false | number> {
  const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const key = new Request(
    `https://rate-limit.internal/contact/${encodeURIComponent(ip)}`,
  );
  const cache = caches.default;

  const existing = await cache.match(key);
  const hits = existing ? Number(await existing.text()) || 0 : 0;

  if (hits >= CONTACT_LIMIT) return CONTACT_WINDOW_S;

  await cache.put(
    key,
    new Response(String(hits + 1), {
      headers: { "Cache-Control": `max-age=${CONTACT_WINDOW_S}` },
    }),
  );
  return false;
}

const worker = {
  async fetch(request: Request, env: unknown, ctx: unknown): Promise<Response> {
    const url = new URL(request.url);
    // Trailing slashes must not open a bypass around the limiter.
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/api/contact" && request.method === "POST") {
      try {
        const retryAfter = await overContactLimit(request);
        if (retryAfter !== false) {
          return new Response(
            JSON.stringify({
              ok: false,
              error:
                "Too many enquiries from this connection. Please try again shortly, or call us directly.",
            }),
            {
              status: 429,
              headers: {
                "Content-Type": "application/json",
                "Retry-After": String(retryAfter),
              },
            },
          );
        }
      } catch (err) {
        // Never let a limiter fault block a genuine enquiry.
        console.error("rate limiter failed open:", String(err).slice(0, 120));
      }
    }

    const response = await handler.fetch(request, env, ctx);

    // A 101 (websocket upgrade) response has an immutable, bodiless shape that
    // must be passed through untouched.
    if (response.status === 101) return response;

    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;

// Durable Objects and the cache-purge binding must stay exported from the
// entry point or Wrangler cannot find their class definitions.
export { BucketCachePurge, DOQueueHandler, DOShardedTagCache } from "./.open-next/worker.js";


/**
 * Durable Object rate limiter for the contact endpoint.
 *
 * Cloudflare's native `ratelimits` binding was tried first and bound correctly,
 * but never returned `success: false` on this account — verified by dropping it
 * to 2 requests per 10 seconds and still getting six 200s. A Durable Object
 * gives real, persistent, testable state instead.
 *
 * One instance per client IP, so counters never contend across addresses.
 */
