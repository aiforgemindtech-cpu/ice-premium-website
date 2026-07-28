"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";

import { BlueprintLayer } from "@/components/hero/blueprint-layer";
import { KenBurns } from "@/components/hero/ken-burns";
import { Magnetic } from "@/components/hero/magnetic";
import { ParticleCanvas } from "@/components/hero/particle-canvas";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/content";

const HEADLINE_WHITE = ["Engineering", "the", "future,"];
const HEADLINE_GOLD = ["built", "to", "perfection."];

/**
 * Entrance timing. These drive the CSS `rise-in` animation rather than Framer
 * `initial`/`animate`, so the content can never be left stranded at opacity 0
 * if the animation library fails to start — see the note in globals.css.
 */
const rise = (delay: number, distance = 24): CSSProperties =>
  ({
    "--rise-delay": `${delay}s`,
    "--rise": `${distance}px`,
  }) as CSSProperties;

export function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Layer 6 — headline rises and fades as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy pt-20"
      aria-label="Introduction"
    >
      <KenBurns />
      <BlueprintLayer />
      <ParticleCanvas />

      <m.div
        style={reduced ? undefined : { y, opacity }}
        className="container-page relative z-10 py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <p
            style={rise(0, 12)}
            className="rise-in inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-70 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
              RC {siteConfig.company.rcNumber} · Est. {siteConfig.company.established}
            </span>
          </p>

          {/* Headline — word-by-word reveal, solid gold accent, never a gradient */}
          <h1 className="mt-8 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block">
              {HEADLINE_WHITE.map((word, i) => (
                <span
                  key={word}
                  style={rise(0.35 + i * 0.1, 34)}
                  className="rise-in inline-block"
                >
                  {word}&nbsp;
                </span>
              ))}
            </span>
            <span className="block text-gold">
              {HEADLINE_GOLD.map((word, i) => (
                <span
                  key={word}
                  style={rise(0.35 + (i + HEADLINE_WHITE.length) * 0.1, 34)}
                  className="rise-in inline-block"
                >
                  {word}&nbsp;
                </span>
              ))}
            </span>
          </h1>

          <p
            style={rise(1.05)}
            className="rise-in mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            Twelve engineering, construction and maintenance disciplines under one
            contract — surveyed properly, priced honestly, and delivered by the
            team that designed them.
          </p>

          <div
            style={rise(1.2)}
            className="rise-in mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Magnetic>
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>

          <p
            style={rise(1.35)}
            className="rise-in mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/50"
          >
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-gold"
            >
              WhatsApp {siteConfig.contact.whatsappDisplay}
            </a>
            <span className="mx-3 text-gold">·</span>
            Free consultation
          </p>

          {/* Stats — no boxes, thin gold dividers */}
          <dl
            style={rise(1.5)}
            className="rise-in mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-y-6"
          >
            {[
              { value: "12", label: "Disciplines" },
              { value: "5", label: "Cities" },
              { value: "2025", label: "Established" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`px-8 ${i > 0 ? "border-l border-gold/25" : ""}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-mono text-2xl font-medium text-gold sm:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white/45">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </m.div>

      {/* Layer 5 — scroll cue.
          The translate lives on the wrapper because `rise-in` ends at
          `transform: none`, which would otherwise undo the centering. */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <a
          href="#overview"
          aria-label="Scroll to content"
          style={rise(1.8, 0)}
          className="rise-in grid size-11 place-items-center rounded-full border border-gold/40"
        >
          <span className="block size-1.5 animate-pulse rounded-full bg-gold motion-reduce:animate-none" />
        </a>
      </div>
    </section>
  );
}
