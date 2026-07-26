import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.company.name,
    short_name: siteConfig.company.shortName,
    description: siteConfig.company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#070d1f",
    theme_color: "#070d1f",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
