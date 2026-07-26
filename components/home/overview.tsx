import { Lightbulb, Palette, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Better methods, properly specified — not novelty for its own sake.",
  },
  {
    icon: Palette,
    title: "Creativity",
    body: "Design that solves the constraint rather than ignoring it.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    body: "Detailing and finishing held to a standard that survives inspection.",
  },
];

/** Section 2 — company overview split layout. */
export function Overview() {
  return (
    <section id="overview" className="section scroll-mt-24">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="glass relative overflow-hidden rounded-3xl p-3">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
              <Image
                src="/images/general/company-overview.jpg"
                alt="ICE-Premium engineers reviewing drawings on a project site"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating RC card */}
          <div className="glass absolute -bottom-6 -right-4 rounded-2xl px-6 py-5 sm:-right-8">
            <p className="mono-label">Registered</p>
            <p className="mt-2 font-display text-2xl font-bold text-ink">
              RC {siteConfig.company.rcNumber}
            </p>
            <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
              Est. {siteConfig.company.established}
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mono-label mb-4">Who we are</p>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">
              One contractor,{" "}
              <span className="text-gold">twelve disciplines.</span>
            </h2>
            <div className="mt-6 space-y-5 text-lg text-body">
              <p>
                ICE-PREMIUM LIMITED is an engineering, construction and
                maintenance company working across Abuja, Lagos, Enugu, Asaba and
                Port Harcourt. We carry all twelve of our disciplines in-house,
                which means a multi-trade project runs under one contract and one
                programme instead of five.
              </p>
              <p>
                That structure removes the most common failure on a build: the gap
                between trades, where sequencing slips and nobody owns the
                interface. When the tiling meets the plumbing, both are ours.
              </p>
            </div>
          </Reveal>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy-surface/50 p-5 transition-colors hover:border-gold/40">
                  <pillar.icon
                    className="size-5 text-gold"
                    aria-hidden="true"
                  />
                  <h3 className="mt-4 font-display text-base font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm text-body">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3}>
            <Button asChild variant="outline" className="mt-10">
              <Link href="/about">More about us</Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
