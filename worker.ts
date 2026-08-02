/**
 * Worker entry point.
 *
 * Does three jobs the framework cannot do for itself on this stack:
 *
 *  1. Attaches security headers. `public/_headers` is a Cloudflare *Pages*
 *     feature that Workers ignores, and Next's `headers()` never runs for
 *     prerendered routes because OpenNext serves that HTML straight from the
 *     assets binding without invoking the Next server.
 *
 *  2. Edge-caches HTML. Next emits `Vary: rsc, next-router-state-tree, …` on
 *     every document, which makes the response uncacheable at the CDN — so
 *     every single page view was waking the Worker and costing roughly a
 *     second of TTFB. Measured against the live site: assets returned
 *     `CF-Cache-Status: HIT`, documents returned no cache status at all.
 *
 *  3. Rate-limits the contact endpoint.
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
 * rejected against the live deployment: Cloudflare's native `ratelimits`
 * binding binds but never denies on this account (verified at 2 requests per
 * 10s, six 200s), and a Durable Object class was not emitted by the deploy
 * bundler so the namespace resolved to nothing at runtime.
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

/**
 * React Server Component payloads and prefetches are different bytes at the
 * same URL — that is exactly what Next's `Vary` header is protecting. Those
 * requests bypass the document cache rather than poisoning it.
 */
function isNavigationDocument(request: Request): boolean {
  if (request.method !== "GET") return false;
  if (request.headers.get("RSC") === "1") return false;
  if (request.headers.get("Next-Router-Prefetch") === "1") return false;
  if (request.headers.get("Next-Router-State-Tree")) return false;
  return (request.headers.get("Accept") || "").includes("text/html");
}

/** Routes that must always reflect the current request. */
function isUncacheablePath(path: string): boolean {
  return path.startsWith("/api/") || path.startsWith("/admin");
}

const HTML_EDGE_TTL = 3600; // seconds at the edge
const HTML_SWR = 86400; // serve stale this long while revalidating

const worker = {
  async fetch(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
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

    const cacheable = isNavigationDocument(request) && !isUncacheablePath(path);

    // Key on the URL alone. The Vary header is deliberately dropped below, so
    // the key must not depend on headers that no longer participate.
    const cacheKey = new Request(url.toString(), { method: "GET" });
    const cache = caches.default;

    if (cacheable) {
      const hit = await cache.match(cacheKey);
      if (hit) {
        const headers = new Headers(hit.headers);
        headers.set("X-Edge-Cache", "HIT");
        return new Response(hit.body, {
          status: hit.status,
          statusText: hit.statusText,
          headers,
        });
      }
    }

    const response = await handler.fetch(request, env, ctx);

    // A 101 (websocket upgrade) has an immutable, bodiless shape.
    if (response.status === 101) return response;

    const headers = new Headers(response.headers);
    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(key, value);
    }

    if (cacheable && response.status === 200) {
      // Dropping Vary is what makes this cacheable at all. It is safe only
      // because RSC and prefetch requests never reach this branch.
      headers.delete("Vary");
      headers.set(
        "Cache-Control",
        `public, max-age=0, s-maxage=${HTML_EDGE_TTL}, stale-while-revalidate=${HTML_SWR}`,
      );
      headers.set("X-Edge-Cache", "MISS");

      const cached = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });

      // Store a clone and return the original so the response streams to the
      // visitor rather than waiting on the cache write.
      ctx.waitUntil(cache.put(cacheKey, cached.clone()));
      return cached;
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
