import Link from "next/link";

import { PostCard } from "@/components/shared/post-card";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { posts } from "@/lib/content";

/** Section 11 — three most recent articles. */
export function LatestBlog() {
  return (
    <section className="section border-t border-white/10">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Insight"
            title="Notes from"
            accent="the site."
            className="max-w-2xl"
          />
          <Reveal delay={0.15}>
            <Button asChild variant="outline">
              <Link href="/blog">All articles</Link>
            </Button>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 0.1}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
