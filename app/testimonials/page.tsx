import type { Metadata } from "next";
import { Quote, Star } from "lucide-react";

import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { Reveal } from "@/components/shared/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { hasPlaceholderTestimonials, testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Client feedback on engineering, construction and maintenance work delivered by ICE-PREMIUM LIMITED.",
  alternates: { canonical: "/testimonials" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Testimonials", href: "/testimonials" },
];

export default function TestimonialsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Client feedback"
        title="What clients say"
        accent="about working with us."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page">
          {hasPlaceholderTestimonials && (
            <PlaceholderNotice className="mx-auto max-w-3xl">
              Every quote on this page is sample copy demonstrating the layout —
              none are real client testimonials. Replace them in{" "}
              <code className="text-gold">content/testimonials.json</code> and
              set each entry&rsquo;s <code className="text-gold">placeholder</code>{" "}
              flag to <code className="text-gold">false</code> before launch.
            </PlaceholderNotice>
          )}

          <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Reveal as="li" key={item.id} delay={(i % 3) * 0.08}>
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-surface/50 p-7">
                  <Quote className="size-7 text-gold/50" aria-hidden="true" />
                  <blockquote className="mt-5 flex-1 text-base text-body">
                    {item.quote}
                  </blockquote>
                  <div
                    className="mt-6 flex gap-1"
                    role="img"
                    aria-label={`Rated ${item.rating} out of 5`}
                  >
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        aria-hidden="true"
                        className={cn(
                          "size-4",
                          s < item.rating
                            ? "fill-gold text-gold"
                            : "text-white/20",
                        )}
                      />
                    ))}
                  </div>
                  <figcaption className="mt-5 border-t border-white/10 pt-5">
                    <span className="block font-display text-base font-semibold text-ink">
                      {item.name}
                    </span>
                    <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                      {item.role} · {item.city}
                    </span>
                    <span className="mt-3 inline-block rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold">
                      {item.service}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection />
      <FinalCta />
    </>
  );
}
