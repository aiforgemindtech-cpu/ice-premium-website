import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Section 6 — mosaic: one large tile plus five small. */
export function ProjectShowcase() {
  const [lead, ...rest] = projects;

  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      {/* AI-generated stock imagery — swap for real ICE-Premium project photos when available */}
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects delivered"
            accent="across five cities."
            className="max-w-2xl"
          />
          <Reveal delay={0.15}>
            <Button asChild variant="outline">
              <Link href="/projects">All projects</Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[lead, ...rest].map((project, i) => (
            <Reveal
              key={project.slug}
              delay={(i % 3) * 0.08}
              className={cn(
                i === 0 && "sm:col-span-2 sm:row-span-2",
                "min-h-0",
              )}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group relative flex size-full flex-col justify-end overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 1024px) 66vw, 100vw"
                      : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  }
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/50 to-transparent" />
                <div className="relative p-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold">
                      {project.discipline}
                    </span>
                    <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                      {project.city}
                    </span>
                  </div>
                  <h3
                    className={cn(
                      "mt-3 font-display font-semibold text-ink",
                      i === 0 ? "text-2xl sm:text-3xl" : "text-lg",
                    )}
                  >
                    {project.title}
                  </h3>
                  {i === 0 && (
                    <p className="mt-3 max-w-xl text-base text-white/70">
                      {project.summary}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
