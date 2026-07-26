import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { services } from "@/lib/content";

/** Section 3 — all twelve services. */
export function ServicesGrid() {
  return (
    <section className="section border-t border-white/10">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Twelve disciplines,"
          accent="one standard."
          description="Every service below is delivered by our own teams, sequenced under a single programme."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal as="li" key={service.slug} delay={(i % 3) * 0.08}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-navy-surface/40 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]"
              >
                <span className="grid size-12 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold transition-colors group-hover:bg-gold/20">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3 className="mt-6 font-display text-lg font-semibold text-ink">
                  {service.title}
                </h3>
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
  );
}
