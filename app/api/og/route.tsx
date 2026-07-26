import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Dynamic Open Graph image.
 *
 * This route is one of the reasons the site targets the Cloudflare adapter
 * rather than a static export — `output: 'export'` cannot serve it.
 *
 * Usage: /api/og?title=...&eyebrow=...
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const title =
    searchParams.get("title")?.slice(0, 120) || siteConfig.company.tagline;
  const eyebrow =
    searchParams.get("eyebrow")?.slice(0, 60) ||
    `RC ${siteConfig.company.rcNumber} · Est. ${siteConfig.company.established}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#070d1f",
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(212,175,55,0.22), transparent 55%), radial-gradient(circle at 85% 85%, rgba(212,175,55,0.14), transparent 50%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "12px",
              border: "2px solid rgba(212,175,55,0.5)",
              color: "#d4af37",
              fontSize: "22px",
              fontWeight: 700,
            }}
          >
            ICE
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            {siteConfig.company.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#d4af37",
              fontSize: "20px",
              letterSpacing: "5px",
              textTransform: "uppercase",
              marginBottom: "22px",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              color: "#ffffff",
              fontSize: "62px",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid rgba(212,175,55,0.35)",
            paddingTop: "26px",
          }}
        >
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "21px" }}>
            {siteConfig.company.motto}
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "19px",
              letterSpacing: "2px",
            }}
          >
            {siteConfig.serviceAreas.map((a) => a.city).join("  ·  ")}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
