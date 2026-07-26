import * as LabelPrimitive from "@radix-ui/react-label";
import * as React from "react";

import { cn } from "@/lib/utils";

const controlStyles =
  "w-full rounded-xl border border-white/15 bg-navy-surface/60 px-4 py-3 text-base text-ink placeholder:text-muted transition-colors hover:border-white/25 focus:border-gold focus:outline-none disabled:opacity-50";

export function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "mb-2 block font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Input({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return <input className={cn(controlStyles, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlStyles, "resize-y", className)} {...props} />
  );
}

export function Select({
  className,
  children,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select className={cn(controlStyles, "appearance-none", className)} {...props}>
      {children}
    </select>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-2 text-sm text-gold-light">
      {children}
    </p>
  );
}
