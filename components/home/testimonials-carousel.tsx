"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { testimonials, type Testimonial } from "@/lib/content";
import { cn } from "@/lib/utils";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(
            "size-4",
            i < rating ? "fill-gold text-gold" : "text-white/20",
          )}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel({ items }: { items: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance every 5s, paused when the user prefers reduced motion.
  useEffect(() => {
    if (!emblaApi) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="flex">
          {items.map((item) => (
            <li
              key={item.id}
              className="min-w-0 shrink-0 grow-0 basis-full px-2 sm:basis-1/2 lg:basis-1/3"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-navy-surface/50 p-7">
                <Quote className="size-7 text-gold/50" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-base text-body">
                  {item.quote}
                </blockquote>
                <Stars rating={item.rating} />
                <figcaption className="mt-5 border-t border-white/10 pt-5">
                  <span className="block font-display text-base font-semibold text-ink">
                    {item.name}
                  </span>
                  <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                    {item.role} · {item.city}
                  </span>
                  <span className="mt-2 inline-block rounded-full border border-gold/25 bg-gold/10 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold">
                    {item.service}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous testimonial"
          className="grid size-11 place-items-center rounded-full border border-white/15 text-body transition-colors hover:border-gold/60 hover:text-gold"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>

        <div className="flex">
          {items.map((item, i) => (
            // The visible dot stays small; the button carries a full 44px hit area.
            <button
              key={item.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === selected}
              className="grid h-11 place-items-center px-1"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all",
                  i === selected ? "w-8 bg-gold" : "w-1.5 bg-white/25",
                )}
              />
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next testimonial"
          className="grid size-11 place-items-center rounded-full border border-white/15 text-body transition-colors hover:border-gold/60 hover:text-gold"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

/** Section 10 — testimonials. */
export function Testimonials() {
  return <TestimonialsCarousel items={testimonials} />;
}
