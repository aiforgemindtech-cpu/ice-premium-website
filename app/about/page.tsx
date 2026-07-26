import type { Metadata } from "next";
import { Lightbulb, Palette, Sparkles } from "lucide-react";
import Image from "next/image";

import { AnimatedStats } from "@/components/home/animated-stats";
import { FinalCta } from "@/components/home/final-cta";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ServiceAreas } from "@/components/home/service-areas";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "ICE-PREMIUM LIMITED (RC 8682310) is an engineering, construction and maintenance company established in 2025, working across Abuja, Lagos, Enugu, Asaba and Port Harcourt.",
  alternates: { canonical: "/about" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
];

const PILLARS = [
  {
    icon: Lightbulb,
    title: "Innovation",
    body: "Better methods where they genuinely perform better — a decoupling layer that stops a floor cracking, a temporary supply that keeps a server room live through a rewire. Not novelty for its own sake.",
  },
  {
    icon: Palette,
    title: "Creativity",
    body: "Design that answers the constraint instead of ignoring it. A low ceiling is not a reason to give up on the room; it is a reason to drop the perimeter and leave the centre high.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    body: "Detailing and finishing held to a standard that survives inspection in good light. Most of that standard is set before the visible work begins.",
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow={`RC ${siteConfig.company.rcNumber} · Est. ${siteConfig.company.established}`}
        title="Engineering, construction"
        accent="and maintenance."
        description={siteConfig.company.description}
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-3">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                <Image
                  src="/images/general/company-overview.jpg"
                  alt="ICE-Premium engineers reviewing drawings on a project site"
                  fill
                  priority
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mono-label mb-4">Who we are</p>
              <h2 className="text-3xl sm:text-4xl">
                A company built around{" "}
                <span className="text-gold">the gap between trades.</span>
              </h2>
              <div className="mt-6 space-y-5 text-lg text-body">
                <p>
                  ICE-PREMIUM LIMITED was established in{" "}
                  {siteConfig.company.established} and is registered in Nigeria
                  under RC {siteConfig.company.rcNumber}. We deliver engineering,
                  construction and maintenance work across twelve disciplines in{" "}
                  {siteConfig.serviceAreas.map((a) => a.city).join(", ")}.
                </p>
                <p>
                  The company exists because of a specific, recurring problem.
                  On a multi-trade project where each trade is engaged
                  separately, the work itself is rarely what fails — the
                  interfaces between trades are. The tiler waits on the plumber.
                  The ceiling closes before the electrician has finished. A wet
                  area leaks and two contractors each point at the other.
                </p>
                <p>
                  Carrying all twelve disciplines in-house makes those
                  interfaces internal. They become our problem to sequence and
                  resolve, rather than yours to coordinate and arbitrate.
                </p>
                <p>
                  The second thing we do differently is survey before we price.
                  A quote produced from a walkthrough is an estimate that will
                  move. A quote produced from a condition survey is a price. We
                  would rather spend the time upfront and give you a figure that
                  holds.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-navy-surface/20">
        <div className="container-page">
          <SectionHeading
            eyebrow="What the name means"
            title="Innovation · Creativity"
            accent="· Excellence"
            description="The motto is an acronym of the company name, and each part corresponds to something we actually do rather than an aspiration."
          />
          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {PILLARS.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} delay={i * 0.1}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy p-8">
                  <pillar.icon className="size-6 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-4 text-base text-body">{pillar.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <AnimatedStats />
      <ProcessTimeline />
      <ServiceAreas />
      <FinalCta />
    </>
  );
}
