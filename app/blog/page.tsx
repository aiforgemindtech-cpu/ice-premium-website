import type { Metadata } from "next";

import { FinalCta } from "@/components/home/final-cta";
import { PageHero } from "@/components/shared/page-hero";
import { PostCard } from "@/components/shared/post-card";
import { Reveal } from "@/components/shared/reveal";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on construction, renovation and maintenance from the ICE-PREMIUM LIMITED team — diagnosis, specification and why things fail.",
  alternates: { canonical: "/blog" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
];

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Insight"
        title="Notes from"
        accent="the site."
        description="Practical writing on why building work fails and what prevents it — diagnosis, specification and sequencing, without the sales gloss."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={(i % 3) * 0.08}>
                <PostCard post={post} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
