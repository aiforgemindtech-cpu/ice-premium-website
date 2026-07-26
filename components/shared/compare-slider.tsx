"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Clip-path based before/after comparison.
 *
 * Draggable with pointer, and driven by a real range input underneath so it is
 * fully keyboard operable and announced correctly by screen readers.
 */
export function CompareSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  label,
  priority = false,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  label: string;
  priority?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(50);
  const [dragging, setDragging] = useState(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setValue(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => setFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [dragging, setFromClientX]);

  return (
    <figure className="w-full">
      <div
        ref={containerRef}
        onPointerDown={(e) => {
          setDragging(true);
          setFromClientX(e.clientX);
        }}
        className="relative aspect-16/10 w-full touch-none select-none overflow-hidden rounded-2xl border border-white/10"
      >
        {/* After (base layer) */}
        <Image
          src={after}
          alt={afterAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />

        {/* Before (clipped overlay) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover"
          />
        </div>

        {/* Corner labels */}
        <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-white backdrop-blur">
          Before
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-gold/90 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-navy backdrop-blur">
          After
        </span>

        {/* Handle */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold"
          style={{ left: `${value}%` }}
        >
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-navy shadow-[0_0_20px_rgba(212,175,55,0.5)]">
            <svg
              viewBox="0 0 24 24"
              className="size-5 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M9 6 4 12l5 6M15 6l5 6-5 6" />
            </svg>
          </span>
        </div>

        {/* Keyboard + screen-reader control */}
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(value)}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={`${label} — reveal before and after. Left shows more of the before image, right shows more of the after image.`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="mt-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label} — drag or use arrow keys
      </figcaption>
    </figure>
  );
}
