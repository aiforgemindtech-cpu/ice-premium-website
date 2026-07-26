import { TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Visible marker for content that is sample copy rather than the real thing.
 * Deliberately shown in the UI, not just in code comments, so placeholder
 * material cannot reach production silently.
 */
export function PlaceholderNotice({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-3 rounded-xl border border-gold/30 bg-gold/[0.07] px-5 py-4 text-sm text-body",
        className,
      )}
    >
      <TriangleAlert
        className="mt-0.5 size-4 shrink-0 text-gold"
        aria-hidden="true"
      />
      <span>
        <span className="font-semibold text-gold">Placeholder content. </span>
        {children}
      </span>
    </p>
  );
}
