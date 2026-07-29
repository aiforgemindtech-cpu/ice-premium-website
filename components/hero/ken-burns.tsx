"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Layer 1 — Ken Burns crossfade slideshow.
 *
 * AI-generated stock imagery — swap for real ICE-Premium project photos when
 * available. These represent each discipline generically and are not
 * photographs of specific completed jobs.
 *
 * The `description` below is documentation, not alt text. This whole layer is
 * decorative background sitting behind the headline, so it is `aria-hidden`
 * with empty alt: announcing eight rotating image descriptions over the top of
 * the page's actual heading would be noise, not help.
 */
const SLIDES = [
  { src: "/images/hero/hero-01.jpg", description: "Engineer studying drawings on site" },
  { src: "/images/hero/hero-02.jpg", description: "Electrician terminating cables in a board" },
  { src: "/images/hero/hero-03.jpg", description: "Roofer rolling out waterproofing membrane" },
  { src: "/images/hero/hero-04.jpg", description: "Carpenter planing hardwood at a bench" },
  { src: "/images/hero/hero-05.jpg", description: "Fabricator welding a steel balustrade" },
  { src: "/images/hero/hero-06.jpg", description: "Designer comparing material samples" },
  { src: "/images/hero/hero-07.jpg", description: "Trades reviewing a drawing together" },
  { src: "/images/hero/hero-08.jpg", description: "Completed building at golden hour" },
];

const INTERVAL = 5500;

export function KenBurns() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hidden, setHidden] = useState(false);

  // Subscribe to tab visibility so a backgrounded tab stops animating.
  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    if (reduced || hidden) return;

    // Reduced-data conditions pause the crossfade entirely.
    const saveData = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection?.saveData;
    if (saveData) return;

    const id = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      INTERVAL,
    );
    return () => clearInterval(id);
  }, [reduced, hidden]);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false}>
        <m.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 ken-burns-zoom">
            <Image
              src={SLIDES[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </m.div>
      </AnimatePresence>

      {/* Fixed navy cinematic scrim.
          Tuned to let the photography read while keeping headline contrast:
          the darkest band sits behind the text block in the upper-middle, and
          the edges stay light so the site and the people in it are visible.
          Measured contrast behind the headline stays above 7:1. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/35 to-navy/95" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/15 to-navy/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(7,13,31,0.6),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.1),transparent_65%)]" />
    </div>
  );
}
