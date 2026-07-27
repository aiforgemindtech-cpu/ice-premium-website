import type { Metadata } from "next";

import { FinalCta } from "@/components/home/final-cta";
import { CompareSlider } from "@/components/shared/compare-slider";
import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { Reveal } from "@/components/shared/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { comparisons } from "@/lib/before-after";

export const metadata: Metadata = {
  title: "Before & After",
  description:
    "Side-by-side comparisons of ICE-PREMIUM LIMITED renovation, joinery, finishing and tiling work across Abuja, Lagos, Enugu and Port Harcourt.",
  alternates: { canonical: "/before-after" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Before & After", href: "/before-after" },
];

export default function BeforeAfterPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Before & after"
        title="The same space,"
        accent="properly rebuilt."
        description="Drag each handle to compare, or focus a slider and use the arrow keys."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page">
          <PlaceholderNotice className="mx-auto max-w-3xl">
            These comparisons use designed brand graphics, not photographs of
            real ICE-Premium work. Replace the paired files in{" "}
            <code className="text-gold">/public/images/before-after</code> with
            genuine before and after photography before launch.
          </PlaceholderNotice>

          <ul className="mt-14 grid gap-16">
            {comparisons.map((pair, i) => (
              <Reveal as="li" key={pair.slug} delay={0.05}>
                <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
                  <div
                    className={
                      i % 2 === 0
                        ? "lg:col-span-5"
                        : "lg:col-span-5 lg:order-last"
                    }
                  >
                    <p className="mono-label">{pair.discipline}</p>
                    <h2 className="mt-4 text-2xl sm:text-3xl">{pair.label}</h2>
                    <p className="mt-4 text-lg text-body">{pair.summary}</p>
                    <p className="mt-5 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                      {pair.city}
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <CompareSlider
                      before={pair.before}
                      after={pair.after}
                      beforeAlt={pair.beforeAlt}
                      afterAlt={pair.afterAlt}
                      label={pair.label}
                      priority={i === 0}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
