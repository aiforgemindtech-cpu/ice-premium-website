import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * These are set here rather than in `public/_headers` because that file is a
 * Cloudflare *Pages* feature and is silently ignored by Workers, which is what
 * the @opennextjs/cloudflare adapter deploys to. Setting them in Next means
 * they are served by the app itself and work on any host.
 */
const SECURITY_HEADERS = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    // Next's optimizer is a no-op on Cloudflare's free tier — it returns the
    // original bytes at every width. Variants are pre-built instead by
    // scripts/optimize-images.mjs and resolved by this loader.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    formats: ["image/webp"],
    qualities: [72],
    // Matched exactly to WIDTHS in scripts/optimize-images.mjs so each srcset
    // candidate maps to a real file rather than rounding up to a larger one.
    // Without this a 360px phone picked the 640w slot and got the 960px file.
    deviceSizes: [480, 960, 1440, 1920],
    imageSizes: [480],
  },
  poweredByHeader: false,

  async redirects() {
    return [
      // /testimonials was removed rather than ship invented client quotes.
      // Anything already linking to it lands on the commitments instead of a 404.
      { source: "/testimonials", destination: "/about", permanent: true },
    ];
  },

  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Hashed build output is immutable.
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
