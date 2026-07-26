import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/lib/content";

/**
 * Section 9 — stylised Nigeria outline with a pin per service city.
 * The shape is deliberately simplified for legibility at this size; it is a
 * decorative locator, not a survey-accurate map.
 */
const NIGERIA_PATH =
  "M12,38 L18,26 L26,20 L34,17 L42,15 L52,14 L62,16 L70,14 L78,18 L84,24 L88,32 L86,42 L82,52 L78,60 L74,68 L70,76 L64,84 L56,90 L48,92 L40,88 L34,82 L28,74 L22,64 L16,52 Z";

export function ServiceAreas() {
  return (
    <section className="section border-t border-white/10">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Where we work"
            title="Five cities,"
            accent="one team."
            description="We take on projects across these locations. If yours sits outside them, ask anyway — depending on scale and duration we can often still help, and we will tell you honestly if we cannot."
          />

          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {siteConfig.serviceAreas.map((area, i) => (
              <Reveal as="li" key={area.city} delay={i * 0.07}>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-navy-surface/40 px-5 py-4">
                  <span className="size-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span className="font-display text-base font-semibold text-ink">
                    {area.city}
                  </span>
                  <span className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                    {area.state}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-md">
            <svg
              viewBox="0 0 100 100"
              className="w-full"
              role="img"
              aria-label={`Map of Nigeria showing ICE-Premium service areas: ${siteConfig.serviceAreas
                .map((a) => a.city)
                .join(", ")}`}
            >
              <path
                d={NIGERIA_PATH}
                fill="rgba(212,175,55,0.06)"
                stroke="rgba(212,175,55,0.35)"
                strokeWidth="0.6"
                strokeLinejoin="round"
              />
              {siteConfig.serviceAreas.map((area) => (
                <g key={area.city}>
                  <circle
                    cx={area.x}
                    cy={area.y}
                    r="1.6"
                    fill="#d4af37"
                    className="motion-safe:origin-center"
                    style={{
                      animation: "pulse-ring 3s ease-out infinite",
                      transformBox: "fill-box",
                      transformOrigin: "center",
                    }}
                  />
                  <circle cx={area.x} cy={area.y} r="1.4" fill="#e6c659" />
                  <text
                    x={area.x + 3.4}
                    y={area.y + 1.2}
                    fill="rgba(255,255,255,0.8)"
                    fontSize="3"
                    fontFamily="monospace"
                  >
                    {area.city}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
