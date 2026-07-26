import Link from "next/link";

import { Button } from "@/components/ui/button";
import { services, siteConfig } from "@/lib/content";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-32 pb-20">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.12),transparent_60%)]"
      />
      <div className="container-page relative text-center">
        <p className="mono-label">Error 404</p>
        <p className="mt-8 font-mono text-7xl font-medium text-gold sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl">
          That page is not <span className="text-gold">on the drawing.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-body">
          The page you were looking for does not exist, or has moved. The links
          below cover most of what people are after.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact us</Link>
          </Button>
        </div>

        <nav aria-label="Popular services" className="mx-auto mt-14 max-w-3xl">
          <p className="mono-label">Popular services</p>
          <ul className="mt-5 flex flex-wrap justify-center gap-3">
            {services.slice(0, 6).map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center rounded-full border border-white/15 px-5 py-2.5 text-sm text-body transition-colors hover:border-gold/60 hover:text-gold"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-12 font-mono text-xs uppercase tracking-[0.15em] text-muted">
          Or call {siteConfig.contact.phone}
        </p>
      </div>
    </section>
  );
}
