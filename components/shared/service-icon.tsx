import {
  Armchair,
  Droplets,
  Factory,
  Grid3x3,
  Hammer,
  Layers,
  Paintbrush,
  Ruler,
  Sparkles,
  Umbrella,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

// Explicit map rather than a dynamic lookup, so an unknown icon name in a
// service's frontmatter is a type error at build rather than a blank tile.
const ICONS = {
  Hammer,
  Zap,
  Droplets,
  Paintbrush,
  Umbrella,
  Layers,
  Sparkles,
  Grid3x3,
  Ruler,
  Factory,
  Wrench,
  Armchair,
} satisfies Record<string, LucideIcon>;

export type ServiceIconName = keyof typeof ICONS;

export function ServiceIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = ICONS[name as ServiceIconName] ?? Hammer;
  return <Icon className={cn("size-6", className)} aria-hidden="true" />;
}
