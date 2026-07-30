import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FinalCta } from "@/components/home/final-cta";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { ServiceIcon } from "@/components/shared/service-icon";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Twelve engineering, construction and maintenance disciplines delivered in-house, from renovation and electrical to steel fabrication and interior design.",
  alternates: { canonical: "/services" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="What we do"
        title="Twelve disciplines,"
        accent="one contract."
        description="Every discipline below is delivered by our own teams. On a multi-trade project that means one programme, one point of accountability, and no gap between trades for problems to fall into."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={(i % 3) * 0.06}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-navy-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]"
                >
                  <span className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                    <ServiceIcon name={service.icon} />
                  </span>
                  <h2 className="mt-6 font-display text-lg font-semibold text-ink">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-base text-body">
                    {service.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
                    Explore
                    <ArrowRight
                      className="size-3.5 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <ProcessTimeline />
      <FinalCta />
    </>
  );
}
