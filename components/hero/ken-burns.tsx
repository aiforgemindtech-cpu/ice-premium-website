"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

/**
 * Layer 1 — Ken Burns crossfade slideshow.
 *
 * STOCK/PLACEHOLDER IMAGERY: these are generated placeholder graphics, not
 * photographs, and not ICE-Premium's own project photos. Swap the files in
 * /public/images/hero for real project photography before launch.
 */
const SLIDES = [
  { src: "/images/hero/hero-1.jpg", alt: "Electrical installation work in progress" },
  { src: "/images/hero/hero-2.jpg", alt: "Roofing works on a commercial building" },
  { src: "/images/hero/hero-3.jpg", alt: "Carpentry and joinery being fitted" },
  { src: "/images/hero/hero-4.jpg", alt: "Painting and finishing to interior walls" },
  { src: "/images/hero/hero-5.jpg", alt: "Engineers reviewing drawings on site" },
  { src: "/images/hero/hero-6.jpg", alt: "Steel fabrication in the workshop" },
  { src: "/images/hero/hero-7.jpg", alt: "Interior fit-out nearing completion" },
  { src: "/images/hero/hero-8.jpg", alt: "Facility maintenance inspection" },
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
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0"
            initial={reduced ? false : { scale: 1.04 }}
            animate={reduced ? undefined : { scale: 1.14 }}
            transition={{ duration: INTERVAL / 1000 + 2, ease: "linear" }}
          >
            <Image
              src={SLIDES[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Fixed navy cinematic scrim — keeps headline contrast constant across slides. */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/60 to-navy" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/40 to-navy/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(212,175,55,0.14),transparent_65%)]" />
    </div>
  );
}
