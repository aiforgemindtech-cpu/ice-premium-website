import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  /** Rendered in solid gold immediately after the title — never a gradient. */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="mono-label mb-4">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem]">
        {title}
        {accent && <span className="text-gold"> {accent}</span>}
      </h2>
      {description && (
        <p className="mt-5 text-lg text-body sm:text-xl">{description}</p>
      )}
    </Reveal>
  );
}
