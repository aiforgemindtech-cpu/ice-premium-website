import { siteConfig } from "@/lib/content";

/** Section 1 — trusted-by marquee. CSS-driven so it costs no JS. */
export function Marquee() {
  const items = siteConfig.trustedBy;
  // Duplicated once so the -50% translate loops seamlessly.
  const loop = [...items, ...items];

  return (
    <section
      aria-label="Client sectors we work with"
      className="border-y border-white/10 bg-navy-surface/30 py-8"
    >
      <div className="edge-fade group overflow-hidden">
        <ul className="flex w-max animate-[marquee_38s_linear_infinite] items-center gap-12 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {loop.map((item, i) => (
            <li
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-12"
              aria-hidden={i >= items.length}
            >
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                {item}
              </span>
              <span className="size-1.5 rounded-full bg-gold" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
