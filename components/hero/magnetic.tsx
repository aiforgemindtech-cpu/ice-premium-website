"use client";

import { m, useReducedMotion } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";

/** Magnetic hover — the element leans toward the cursor. Inert under reduced motion. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  if (reduced) return <div className="inline-flex">{children}</div>;

  return (
    <m.div
      ref={ref}
      className="inline-flex"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      onPointerMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.28,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.28,
        });
      }}
      onPointerLeave={() => setPos({ x: 0, y: 0 })}
    >
      {children}
    </m.div>
  );
}
