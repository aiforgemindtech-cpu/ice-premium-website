import Image from "next/image";
import Link from "next/link";

import { formatDate, type Post } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-navy-surface/40 transition-colors hover:border-gold/40"
      >
        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 rounded-full bg-navy/85 px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.15em] text-gold backdrop-blur">
            {post.category}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.15em] text-muted">
            {formatDate(post.date)} · {post.readingTime} min read
          </p>
          <h3 className="mt-3 font-display text-lg font-semibold text-ink transition-colors group-hover:text-gold">
            {post.title}
          </h3>
          <p className="mt-3 flex-1 text-base text-body">{post.excerpt}</p>
        </div>
      </Link>
    </article>
  );
}
