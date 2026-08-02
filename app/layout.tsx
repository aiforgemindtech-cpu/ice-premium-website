import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Toaster } from "sonner";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ServiceWorker } from "@/components/layout/service-worker";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";

import "./globals.css";

/**
 * Fonts are self-hosted from app/fonts rather than fetched via
 * `next/font/google`. Google's font API was fetched at build time, which made
 * builds fail intermittently on a poor connection and would do the same in CI.
 * Serving them ourselves also removes a third-party connection per page load.
 *
 * Refresh the files with `node scripts/fetch-fonts.mjs`.
 */
/**
 * One variable file per family, subset to the ~100 glyphs this site uses.
 *
 * This was 247KB across seven preloaded files — the largest thing on the
 * critical path, and all of it render-blocking on a slow connection. Google's
 * subsetting endpoint returns a single variable font per family covering the
 * whole weight range, so declaring the range rather than a file per weight
 * takes it to 72KB.
 *
 * Regenerate with `node scripts/fetch-fonts.mjs` after adding content that
 * uses characters outside the current set.
 */
const spaceGrotesk = localFont({
  src: [{ path: "./fonts/space-grotesk.woff2", weight: "500 700", style: "normal" }],
  display: "swap",
  variable: "--font-space-grotesk",
  // Metric-matched fallback, so the swap doesn't shift layout.
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const inter = localFont({
  src: [{ path: "./fonts/inter.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial",
});

const jetbrainsMono = localFont({
  src: [{ path: "./fonts/jetbrains-mono.woff2", weight: "400 500", style: "normal" }],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.site.url),
  title: {
    default: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    template: `%s · ${siteConfig.company.name}`,
  },
  description: siteConfig.company.description,
  applicationName: siteConfig.company.name,
  keywords: [
    "engineering",
    "construction",
    "maintenance",
    "renovation",
    "Nigeria",
    ...siteConfig.serviceAreas.map((a) => a.city),
  ],
  authors: [{ name: siteConfig.company.name }],
  openGraph: {
    type: "website",
    locale: siteConfig.site.locale,
    url: siteConfig.site.url,
    siteName: siteConfig.company.name,
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: `${siteConfig.company.name} — ${siteConfig.company.motto}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Only set the handle once a real one exists; "@REPLACE-ME" would be
    // published to every crawler that reads the page.
    ...(siteConfig.site.twitterHandle.includes("REPLACE-ME")
      ? {}
      : { site: siteConfig.site.twitterHandle }),
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
    images: ["/api/og"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#070d1f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-navy antialiased">
        <OrganizationJsonLd />
        <ServiceWorker />
        <MotionProvider>
          <SmoothScroll />
          <ScrollProgress />
          <a href="#main" className="skip-link">
            Skip to main content
          </a>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppButton />
        </MotionProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0d1a3a",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#ffffff",
            },
          }}
        />
      </body>
    </html>
  );
}
