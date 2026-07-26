import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/home/final-cta";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceIcon } from "@/components/shared/service-icon";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";
import { getRelatedServices, getService, services } from "@/lib/content";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.title,
      description: service.summary,
      images: [{ url: service.heroImage }],
    },
  };
}

export default async function ServiceDetailPage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = getService(slug);
  if (!service) notFound();

  const related = getRelatedServices(service);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.title, href: `/services/${service.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd items={service.faqs} />

      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        image={service.heroImage}
        imageAlt={`Placeholder graphic representing ${service.title.toLowerCase()} work`}
        breadcrumbs={breadcrumbs}
      >
        <span className="mt-8 inline-grid size-14 place-items-center rounded-2xl border border-gold/30 bg-gold/10 text-gold">
          <ServiceIcon name={service.icon} className="size-7" />
        </span>
      </PageHero>

      {/* Overview */}
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <div
              className="prose-ice"
              // Compiled at build time from content/services/*.mdx — first-party content only.
              dangerouslySetInnerHTML={{ __html: service.html }}
            />
          </Reveal>

          {/* Terminal-style spec sheet */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="sticky top-28 overflow-hidden rounded-2xl border border-white/10 bg-navy-surface/60">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
                <span className="size-2.5 rounded-full bg-gold/70" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/25" aria-hidden="true" />
                <span className="size-2.5 rounded-full bg-white/25" aria-hidden="true" />
                <span className="ml-2 font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                  spec-sheet
                </span>
              </div>
              <dl className="divide-y divide-white/5">
                {service.specs.map((spec) => (
                  <div key={spec.label} className="px-5 py-4">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-gold">
                      {spec.label}
                    </dt>
                    <dd className="mt-1.5 font-mono text-sm text-body">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Benefits */}
      <section className="section border-t border-white/10 bg-navy-surface/20">
        <div className="container-page">
          <SectionHeading eyebrow="What you get" title="Why this is done" accent="properly." />
          <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.benefits.map((benefit, i) => (
              <Reveal as="li" key={benefit.title} delay={(i % 3) * 0.08}>
                <div className="h-full rounded-2xl border border-white/10 bg-navy p-7">
                  <Check className="size-5 text-gold" aria-hidden="true" />
                  <h3 className="mt-5 font-display text-base font-semibold text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-3 text-base text-body">{benefit.description}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section className="section border-t border-white/10">
        <div className="container-page">
          <SectionHeading eyebrow="How it runs" title="From survey" accent="to handover." />
          <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-8">
            {service.process.map((step, i) => (
              <Reveal as="li" key={step.step} delay={i * 0.1}>
                <div className="border-t border-gold/40 pt-6">
                  <span className="font-mono text-2xl font-medium text-gold">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-base text-body">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      <section className="section border-t border-white/10 bg-navy-surface/20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="Representative"
            accent="imagery."
            description="Placeholder graphics standing in for real project photography — these are not photographs of ICE-Premium work."
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {[service.heroImage, ...related.map((r) => r.heroImage)]
              .slice(0, 3)
              .map((src, i) => (
                <Reveal as="li" key={src} delay={i * 0.08}>
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={src}
                      alt="Placeholder graphic standing in for project photography"
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

      {/* FAQs */}
      <section className="section border-t border-white/10">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Questions" title="About" accent={service.title.toLowerCase()} />
          </div>
          <Reveal delay={0.1} className="lg:col-span-7">
            <FaqAccordion items={service.faqs} />
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section border-t border-white/10 bg-navy-surface/20">
          <div className="container-page">
            <SectionHeading eyebrow="Related" title="Often delivered" accent="alongside." />
            <ul className="mt-12 grid gap-4 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 0.08}>
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-white/10 bg-navy p-7 transition-all hover:-translate-y-1 hover:border-gold/40"
                  >
                    <span className="grid size-11 place-items-center rounded-xl border border-gold/25 bg-gold/10 text-gold">
                      <ServiceIcon name={item.icon} className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-body">{item.summary}</p>
                    <ArrowRight
                      className="mt-5 size-4 text-gold transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
