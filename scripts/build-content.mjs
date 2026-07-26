// Compiles /content into a single JSON module that gets bundled with the app.
// Runs before `next build` and `next dev` (see package.json scripts).
//
// Why this exists: the site deploys to Cloudflare Workers via @opennextjs/cloudflare,
// where there is no filesystem at runtime. Reading MDX with `fs` inside a server
// component works locally and fails in production, so all content is resolved here
// at build time and imported as data instead.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const ROOT = process.cwd();
const CONTENT = join(ROOT, "content");
const OUT_DIR = join(CONTENT, ".generated");

marked.setOptions({ gfm: true, breaks: false });

// Content is first-party and committed to this repo — it is never user-submitted,
// so the rendered HTML is trusted by construction.
const renderMarkdown = (md) => marked.parse(md).toString().trim();

const readCollection = (dir) =>
  readdirSync(join(CONTENT, dir))
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const raw = readFileSync(join(CONTENT, dir, file), "utf8");
      const { data, content } = matter(raw);
      return { ...data, html: renderMarkdown(content) };
    });

const services = readCollection("services").sort((a, b) => a.order - b.order);

const posts = readCollection("blog").sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);

const bundle = {
  services,
  posts,
  generatedAt: new Date().toISOString(),
};

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  join(OUT_DIR, "content.json"),
  JSON.stringify(bundle, null, 2),
  "utf8",
);

console.log(
  `content: ${services.length} services, ${posts.length} posts compiled`,
);
