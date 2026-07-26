import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium whitespace-nowrap transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "btn-sheen bg-gradient-to-r from-gold to-gold-light text-navy font-semibold shadow-[0_0_0_0_rgba(212,175,55,0.4)] hover:shadow-[0_8px_30px_-6px_rgba(212,175,55,0.55)]",
        outline:
          "border border-white/20 bg-white/5 text-ink backdrop-blur-sm hover:border-gold/60 hover:bg-white/10",
        ghost: "text-body hover:text-gold",
      },
      size: {
        // 44px minimum touch target on every size.
        sm: "h-11 px-5 text-sm",
        md: "h-12 px-7 text-base",
        lg: "h-14 px-9 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { buttonVariants };
