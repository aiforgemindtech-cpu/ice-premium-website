import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { MotionProvider } from "@/components/layout/motion-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains-mono",
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
  },
  twitter: {
    card: "summary_large_image",
    site: siteConfig.site.twitterHandle,
    title: `${siteConfig.company.name} — ${siteConfig.company.tagline}`,
    description: siteConfig.company.description,
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
