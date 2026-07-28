"use client";

import { domAnimation, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the animation features this site actually uses.
 *
 * Framer Motion's full `motion` component pulls its entire feature set into the
 * first load — it measured ~142KB gzipped, which put the homepage 44% over the
 * 260KB budget on its own. `domAnimation` covers animations, variants, exit and
 * hover/tap gestures, which is everything here; layout animations and drag are
 * not used anywhere, so they are not shipped.
 *
 * `strict` makes this enforceable: any `motion.*` left in the tree throws in
 * development, so a future edit cannot silently pull the full bundle back in.
 * Use `m.*` from framer-motion instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
