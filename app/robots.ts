import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin"],
      },
    ],
    sitemap: `${siteConfig.site.url}/sitemap.xml`,
    host: siteConfig.site.url,
  };
}
