"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Layer 2 — architectural elevation drawn in via pathLength, then drifting with
 * mouse parallax. Replaces a WebGL scene: same sense of technical depth, a
 * fraction of the cost.
 */
export function BlueprintLayer() {
  const reduced = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 26;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setOffset({ x, y });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  const draw = (delay: number) =>
    reduced
      ? { pathLength: 1, opacity: 1 }
      : {
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: 2.2, delay, ease: "easeInOut" as const },
            opacity: { duration: 0.4, delay },
          },
        };

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 hidden items-center justify-center md:flex"
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 40, damping: 20 }}
    >
      <svg
        viewBox="0 0 1200 600"
        className="h-full w-full opacity-[0.5]"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <g filter="url(#emissive)">
          {/* Building elevation */}
          <m.path
            d="M150 520 L150 260 L330 190 L510 260 L510 520"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.2)}
          />
          <m.path
            d="M195 520 L195 350 L465 350 L465 520"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.5)}
          />
          <m.path
            d="M240 350 L240 300 M300 350 L300 300 M360 350 L360 300 M420 350 L420 300"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.8)}
          />
          <m.path
            d="M700 520 L700 150 L950 150 L950 520"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.4)}
          />
          <m.path
            d="M740 200 L910 200 M740 260 L910 260 M740 320 L910 320 M740 380 L910 380 M740 440 L910 440"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0.9)}
          />
          {/* Ground line */}
          <m.path
            d="M60 520 L1140 520"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={draw(0)}
          />

          {/* Crane, with a slow swinging arm */}
          <m.g
            animate={
              reduced
                ? undefined
                : { rotate: [-1.5, 1.5, -1.5] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "1030px", originY: "110px" }}
          >
            <m.path
              d="M1030 110 L1030 520"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(0.6)}
            />
            <m.path
              d="M880 110 L1110 110"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(1.0)}
            />
            <m.path
              d="M880 110 L1030 60 L1110 110"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(1.2)}
            />
            <m.path
              d="M920 110 L920 178"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(1.5)}
            />
            <m.rect
              x="905"
              y="178"
              width="30"
              height="22"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={draw(1.7)}
            />
          </m.g>
        </g>

        <defs>
          <filter id="emissive" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </m.div>
  );
}
