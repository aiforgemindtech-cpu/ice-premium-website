"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const STEPS = [
  {
    step: "01",
    title: "Survey",
    body: "We inspect the building and record what is actually there — structure, services, moisture, substrate — before any figure is quoted.",
  },
  {
    step: "02",
    title: "Scope & proposal",
    body: "You receive a written scope, a fixed price against it, and a programme with real dates rather than a range.",
  },
  {
    step: "03",
    title: "Delivery",
    body: "Trades run in sequence under one project lead, with zoning and out-of-hours working where the building stays occupied.",
  },
  {
    step: "04",
    title: "Handover",
    body: "Final inspection walked with you, snags resolved, and an as-built record handed over for your files.",
  },
];

/** Section 5 — process timeline with a connecting line that draws in on scroll. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();

  return (
    <section className="section border-t border-white/10">
      <div className="container-page">
        <SectionHeading
          eyebrow="How we work"
          title="Four stages,"
          accent="no surprises."
        />

        <ol ref={ref} className="relative mt-16 grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Connecting line */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden w-px origin-top bg-gradient-to-b from-gold to-gold/10 lg:left-0 lg:top-[7px] lg:h-px lg:w-full lg:origin-left lg:bg-gradient-to-r"
            style={{ height: "calc(100% - 1rem)" }}
            initial={reduced ? false : { scaleY: 0, scaleX: 0 }}
            animate={
              inView
                ? { scaleY: 1, scaleX: 1 }
                : reduced
                  ? undefined
                  : { scaleY: 0, scaleX: 0 }
            }
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />

          {STEPS.map((item, i) => (
            <Reveal as="li" key={item.step} delay={i * 0.12} className="relative pl-8 lg:pl-0">
              <span className="absolute left-0 top-1 grid size-4 place-items-center lg:relative lg:top-0">
                <span className="relative flex size-4 items-center justify-center">
                  {!reduced && (
                    <span
                      aria-hidden="true"
                      className="absolute size-2 rounded-full bg-gold"
                      style={{
                        animation: "pulse-ring 2.6s ease-out infinite",
                        animationDelay: `${i * 0.4}s`,
                      }}
                    />
                  )}
                  <span className="relative size-2 rounded-full bg-gold ring-4 ring-navy" />
                </span>
              </span>
              <p className="mt-0 font-mono text-xs uppercase tracking-[0.2em] text-gold lg:mt-7">
                Step {item.step}
              </p>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-base text-body">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
