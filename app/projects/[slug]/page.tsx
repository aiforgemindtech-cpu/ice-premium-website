import type { Metadata } from "next";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[slug]">,
) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: project.title, href: `/projects/${project.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <PageHero
        eyebrow={`${project.discipline} · ${project.city}`}
        title={project.title}
        description={project.summary}
        image={project.image}
        imageAlt={`Placeholder graphic representing ${project.title}`}
        breadcrumbs={breadcrumbs}
      />

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl">The challenge</h2>
              <p className="mt-5 text-lg text-body">{project.challenge}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-12 text-2xl sm:text-3xl">
                What we <span className="text-gold">did about it</span>
              </h2>
              <p className="mt-5 text-lg text-body">{project.solution}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <h2 className="mt-12 text-2xl sm:text-3xl">Outcome</h2>
              <p className="mt-5 text-lg text-body">{project.outcome}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="sticky top-28 rounded-2xl border border-white/10 bg-navy-surface/60 p-7">
              <h2 className="mono-label">Scope of works</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {project.scope.map((item) => (
                  <li key={item} className="flex gap-3 text-base text-body">
                    <Check
                      className="mt-1 size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-7 grid grid-cols-2 gap-5 border-t border-white/10 pt-6">
                <div>
                  <dt className="mono-label">Discipline</dt>
                  <dd className="mt-2 text-sm text-ink">{project.discipline}</dd>
                </div>
                <div>
                  <dt className="mono-label">Location</dt>
                  <dd className="mt-2 text-sm text-ink">{project.city}</dd>
                </div>
                <div>
                  <dt className="mono-label">Year</dt>
                  <dd className="mt-2 text-sm text-ink">{project.year}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-white/10 bg-navy-surface/20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="Project"
            accent="imagery."
            description="Placeholder graphics standing in for real project photography."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {project.gallery.map((src, i) => (
              <Reveal as="li" key={src} delay={i * 0.08}>
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={src}
                    alt={`${project.title} — placeholder image ${i + 1}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-white/10">
        <div className="container-page">
          <SectionHeading eyebrow="More work" title="Other" accent="projects." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {others.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-surface/40 transition-colors hover:border-gold/40"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold">
                      {item.discipline}
                    </p>
                    <h3 className="mt-2 font-display text-base font-semibold text-ink">
                      {item.title}
                    </h3>
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
