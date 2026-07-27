import { cn } from "@/lib/utils";

/**
 * ICE-PREMIUM "iP" hexagon monogram.
 *
 * Vector recreation of the supplied logo, in the site's gold rather than the
 * brighter amber of the original raster so it blends with the rest of the UI.
 * Inlined rather than loaded via next/image: no extra request, and it inherits
 * colour from the surrounding UI.
 *
 * To swap in official artwork, replace the paths below (and
 * `public/logo-mark.svg`, which carries the same geometry for favicon use).
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={cn("size-10", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M140 17 L207.5 56 L207.5 134 L140 173 L72.5 134 L72.5 56 Z
           M140 62 L168.6 78.5 L168.6 111.5 L140 128 L111.4 111.5 L111.4 78.5 Z"
      />
      <path fill="currentColor" d="M72.5 108 L105 126 L105 223 L72.5 205 Z" />
      <path fill="currentColor" d="M28 104 L60.5 122 L60.5 205 L28 187 Z" />
      <path
        className="text-gold"
        fill="#d4af37"
        d="M28 46 L60.5 46 L60.5 92 L28 92 Z"
        transform="skewX(-12) translate(14 0)"
      />
    </svg>
  );
}

/**
 * Full horizontal lockup: mark + wordmark + RC number + motto.
 * The wordmark is real text rather than SVG paths so it uses the loaded
 * webfont and stays selectable and accessible.
 */
export function LogoLockup({
  className,
  showMotto = false,
}: {
  className?: string;
  showMotto?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="size-11 shrink-0 text-ink" />
      <span className="flex flex-col leading-none">
        <span className="font-mono text-[0.5rem] uppercase tracking-[0.2em] text-gold">
          RC 8682310
        </span>
        <span className="mt-1 font-display text-base font-bold tracking-tight text-ink">
          ICE PREMIUM
          <span className="ml-1.5 rounded-sm bg-gold px-1.5 py-0.5 font-mono text-[0.5rem] font-medium uppercase tracking-[0.2em] text-navy align-middle">
            Limited
          </span>
        </span>
        {showMotto && (
          <span className="mt-1.5 text-[0.6875rem] italic text-muted">
            Innovation, Creativity, Excellence
          </span>
        )}
      </span>
    </span>
  );
}
