import Link from "next/link";

import { CompareSlider } from "@/components/shared/compare-slider";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { comparisons } from "@/lib/before-after";

/** Section 7 — one featured comparison, linking to the full page. */
export function BeforeAfterFeature() {
  const featured = comparisons[0];

  return (
    <section className="section border-t border-white/10">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="mono-label mb-4">Before & after</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">
              The same room,{" "}
              <span className="text-gold">properly rebuilt.</span>
            </h2>
            <p className="mt-6 text-lg text-body">
              {featured.summary} Drag the handle to compare, or use the arrow
              keys once it has focus.
            </p>
            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div>
                <dt className="mono-label">Discipline</dt>
                <dd className="mt-2 text-base text-ink">{featured.discipline}</dd>
              </div>
              <div>
                <dt className="mono-label">City</dt>
                <dd className="mt-2 text-base text-ink">{featured.city}</dd>
              </div>
            </dl>
            <Button asChild variant="outline" className="mt-9">
              <Link href="/before-after">See all comparisons</Link>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="lg:col-span-7">
          <CompareSlider
            before={featured.before}
            after={featured.after}
            beforeAlt={featured.beforeAlt}
            afterAlt={featured.afterAlt}
            label={featured.label}
          />
        </Reveal>
      </div>
    </section>
  );
}
