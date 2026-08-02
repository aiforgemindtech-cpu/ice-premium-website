/**
 * Service worker.
 *
 * Written for the connection this site actually has to survive: intermittent
 * mobile data where a request may hang for ten seconds and then fail. The
 * strategies below are chosen per resource type rather than applied uniformly.
 *
 *  - Hashed build output and fonts are immutable, so cache-first, forever.
 *  - Images are cache-first with a background refresh; a slightly stale hero
 *    is better than a blank box.
 *  - Pages are network-first but only briefly — after 3.5 seconds the cached
 *    copy is served instead of leaving someone staring at white.
 *  - If everything fails and nothing is cached, an offline page explains what
 *    happened and still shows the phone number.
 */
const VERSION = "v1";
const PAGES = `pages-${VERSION}`;
const ASSETS = `assets-${VERSION}`;
const IMAGES = `images-${VERSION}`;

const OFFLINE_URL = "/offline";
const PAGE_TIMEOUT_MS = 3500;
const MAX_IMAGES = 60;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(PAGES)
      .then((cache) => cache.addAll([OFFLINE_URL, "/"]))
      // A failed precache must not block activation — the worker is still
      // useful for everything it can cache later.
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => !k.endsWith(VERSION))
            .map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/** Keep the image cache from growing without bound on a long session. */
async function trim(cacheName, max) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  await Promise.all(keys.slice(0, keys.length - max).map((k) => cache.delete(k)));
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);
  if (hit) return hit;

  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const hit = await cache.match(request);

  const network = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone()).then(() => trim(cacheName, MAX_IMAGES));
      }
      return response;
    })
    .catch(() => hit);

  return hit || network;
}

async function networkFirstWithTimeout(request) {
  const cache = await caches.open(PAGES);

  try {
    const response = await Promise.race([
      fetch(request),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("slow")), PAGE_TIMEOUT_MS),
      ),
    ]);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const hit = await cache.match(request);
    if (hit) return hit;

    // Try the network once more without the timeout, in case the connection is
    // merely slow rather than gone.
    try {
      const slow = await fetch(request);
      if (slow.ok) cache.put(request, slow.clone());
      return slow;
    } catch {
      return (await cache.match(OFFLINE_URL)) || Response.error();
    }
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // The editor and the API must always be live.
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return;

  if (url.pathname.startsWith("/_next/static/") || /\.woff2$/.test(url.pathname)) {
    event.respondWith(cacheFirst(request, ASSETS));
    return;
  }

  if (url.pathname.startsWith("/opt/") || /\.(webp|jpg|jpeg|png|svg)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request, IMAGES));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirstWithTimeout(request));
  }
});
