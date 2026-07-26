import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/shared/reveal";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
        {items.map((item, i) => (
          <li key={item.href} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page" className="text-gold">
                {item.name}
              </span>
            ) : (
              <Link href={item.href} className="transition-colors hover:text-gold">
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Standard inner-page header. Optional background image sits behind a navy scrim. */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  image,
  imageAlt,
  breadcrumbs,
  children,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: { name: string; href: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-navy pt-32 pb-16 lg:pt-40 lg:pb-24">
      {image && (
        <div aria-hidden="true" className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(212,175,55,0.12),transparent_60%)]" />
        </div>
      )}

      <div className="container-page relative">
        {breadcrumbs && (
          <Reveal>
            <Breadcrumbs items={breadcrumbs} />
          </Reveal>
        )}
        <Reveal delay={0.05} className="mt-6 max-w-4xl">
          {eyebrow && <p className="mono-label mb-4">{eyebrow}</p>}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl">
            {title}
            {accent && <span className="text-gold"> {accent}</span>}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg text-body sm:text-xl">
              {description}
            </p>
          )}
          {imageAlt && <span className="sr-only">{imageAlt}</span>}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
