"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 12, suffix: "", label: "Disciplines in-house" },
  { value: 5, suffix: "", label: "Cities served" },
  { value: 2025, suffix: "", label: "Established", raw: true },
  { value: 100, suffix: "%", label: "Written scopes" },
];

function Counter({
  value,
  suffix,
  raw,
  active,
}: {
  value: number;
  suffix: string;
  raw?: boolean;
  active: boolean;
}) {
  const reduced = useReducedMotion();
  const [counted, setCounted] = useState(0);

  // Derived rather than pushed through state: reduced motion jumps straight to
  // the final value, and the counter only runs once the section is in view.
  const display = reduced ? value : active ? counted : 0;

  useEffect(() => {
    if (reduced || !active) return;

    const duration = 1400;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCounted(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduced, value]);

  return (
    <span className="font-mono text-4xl font-medium text-gold sm:text-5xl">
      {raw ? display : display.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

/** Section 8 — animated counters. */
export function AnimatedStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      <div ref={ref} className="container-page">
        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-t border-gold/40 pt-6">
              <dd>
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  raw={stat.raw}
                  active={inView}
                />
              </dd>
              <dt className="mt-3 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
