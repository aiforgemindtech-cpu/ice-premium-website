"use client";

import { useEffect } from "react";

/**
 * Registers the service worker after the page has settled.
 *
 * Deliberately deferred to the load event: registration competes for the same
 * connection as the page's own assets, and on a slow link that trade is worth
 * making once, not during first paint.
 */
export function ServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // A failed registration costs nothing — the site works without it.
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
