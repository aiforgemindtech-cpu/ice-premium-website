import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering, construction and maintenance projects delivered by ICE-PREMIUM LIMITED across Abuja, Lagos, Enugu, Asaba and Port Harcourt.",
  alternates: { canonical: "/projects" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

export default function ProjectsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Selected work"
        title="Projects delivered"
        accent="across five cities."
        description="Each entry below sets out what the constraint actually was and how it was resolved — the part of a project that determines whether it succeeds."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.slug} delay={(i % 2) * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-surface/40 transition-colors hover:border-gold/40"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold">
                        {project.discipline}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
                        {project.city} · {project.year}
                      </span>
                    </div>
                    <h2 className="mt-4 font-display text-xl font-semibold text-ink transition-colors group-hover:text-gold">
                      {project.title}
                    </h2>
                    <p className="mt-3 flex-1 text-base text-body">
                      {project.summary}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
