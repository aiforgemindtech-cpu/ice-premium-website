import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "You are offline",
  robots: { index: false, follow: false },
};

/**
 * Served by the service worker when a page is requested with no connection and
 * nothing cached. It carries the phone number, because someone who has lost
 * signal on a building site still needs a way to reach the company.
 */
export default function OfflinePage() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.12),transparent_60%)]"
      />
      <div className="container-page relative max-w-2xl text-center">
        <p className="mono-label">No connection</p>
        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl">
          You are <span className="text-gold">offline.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-body">
          This page has not been saved to your device yet. Pages you have
          already visited will still open. Everything else will load again as
          soon as you have signal.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <a href={`tel:${siteConfig.contact.phoneHref}`}>
              Call {siteConfig.contact.phone}
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              WhatsApp us
            </a>
          </Button>
        </div>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <Link href="/" className="transition-colors hover:text-gold">
            Try the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
