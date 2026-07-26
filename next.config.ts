import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Placeholder art is generated at a few fixed sizes; real photography can
    // widen this list later without any code change.
    qualities: [70, 75, 85],
  },
  poweredByHeader: false,
};

export default nextConfig;
