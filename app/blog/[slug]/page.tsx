import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { FinalCta } from "@/components/home/final-cta";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { PostCard } from "@/components/shared/post-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { BlogPostingJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { formatDate, getPost, posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      images: [{ url: post.image }],
    },
  };
}

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt}
        date={post.date}
        slug={post.slug}
        image={post.image}
      />

      <article>
        <header className="border-b border-white/10 pt-32 pb-12 lg:pt-40">
          <div className="container-page max-w-3xl">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mono-label mt-6">
              {post.category} · {formatDate(post.date)} · {post.readingTime} min
              read
            </p>
            <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-6 text-lg text-body sm:text-xl">{post.excerpt}</p>
          </div>
        </header>

        <div className="container-page max-w-3xl py-12 lg:py-16">
          <div className="relative aspect-16/9 overflow-hidden rounded-2xl border border-white/10">
            <Image
              src={post.image}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div
            className="prose-ice mt-12"
            // Compiled at build time from content/blog/*.mdx — first-party content only.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </article>

      <section className="section border-t border-white/10 bg-navy-surface/20">
        <div className="container-page">
          <SectionHeading eyebrow="Keep reading" title="More" accent="articles." />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {more.map((item, i) => (
              <Reveal as="li" key={item.slug} delay={i * 0.08}>
                <PostCard post={item} />
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
