"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { BlueprintLayer } from "@/components/hero/blueprint-layer";
import { KenBurns } from "@/components/hero/ken-burns";
import { Magnetic } from "@/components/hero/magnetic";
import { ParticleCanvas } from "@/components/hero/particle-canvas";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/content";

const HEADLINE_WHITE = ["Engineering", "the", "future,"];
const HEADLINE_GOLD = ["built", "to", "perfection."];

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

  const word = (index: number) =>
    reduced
      ? { opacity: 1, y: 0 }
      : {
          opacity: 1,
          y: 0,
          transition: { delay: 0.35 + index * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy pt-20"
      aria-label="Introduction"
    >
      <KenBurns />
      <BlueprintLayer />
      <ParticleCanvas />

      <motion.div
        style={reduced ? undefined : { y, opacity }}
        className="container-page relative z-10 py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Eyebrow */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-gold/30 bg-gold/10 px-4 py-2"
          >
            <span className="relative flex size-2">
              {!reduced && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-70" />
              )}
              <span className="relative inline-flex size-2 rounded-full bg-gold" />
            </span>
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-gold">
              RC {siteConfig.company.rcNumber} · Est. {siteConfig.company.established}
            </span>
          </motion.p>

          {/* Headline — solid gold accent, never a gradient on text */}
          <h1 className="mt-8 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
            <span className="block">
              {HEADLINE_WHITE.map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: 34 }}
                  animate={word(i)}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </span>
            <span className="block text-gold">
              {HEADLINE_GOLD.map((w, i) => (
                <motion.span
                  key={w}
                  className="inline-block"
                  initial={reduced ? false : { opacity: 0, y: 34 }}
                  animate={word(i + HEADLINE_WHITE.length)}
                >
                  {w}&nbsp;
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.7 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-white/70 sm:text-xl"
          >
            Twelve engineering, construction and maintenance disciplines under one
            contract — surveyed properly, priced honestly, and delivered by the
            team that designed them.
          </motion.p>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
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
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.35, duration: 0.7 }}
            className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-white/50"
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
          </motion.p>

          {/* Stats — no boxes, thin gold dividers */}
          <motion.dl
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.7 }}
            className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-y-6"
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
          </motion.dl>
        </div>
      </motion.div>

      {/* Layer 5 — scroll cue */}
      <motion.a
        href="#overview"
        aria-label="Scroll to content"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-full border border-gold/40"
      >
        <motion.span
          className="block size-1.5 rounded-full bg-gold"
          animate={reduced ? undefined : { opacity: [1, 0.25, 1], y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.a>
    </section>
  );
}
