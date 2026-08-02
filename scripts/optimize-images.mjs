/**
 * Pre-generates responsive WebP variants of every site image.
 *
 * Next's image optimizer does not work on Cloudflare's free tier: a request to
 * `/_next/image?w=640` returns the original bytes with `content-type:
 * image/jpeg`, identical at every width. Verified against production — w=640
 * and w=3840 both returned exactly 188791 bytes. So a phone on a 3G connection
 * was downloading a 2400px hero image to display it 360px wide.
 *
 * Resizing at the edge needs Cloudflare Images, which is a paid add-on. Doing
 * it at build time costs nothing at runtime, works on any host, and the output
 * is plain static files the CDN already caches well.
 *
 * Pairs with lib/image-loader.ts, which rewrites next/image URLs to point here.
 */
import { existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import sharp from "sharp";

const SRC = join(process.cwd(), "public", "images");
const OUT = join(process.cwd(), "public", "opt");

/**
 * Widths chosen against the layout's real breakpoints rather than a generic
 * ladder: 480 covers most phones in this market at 1x, 960 covers phones at 2x
 * and tablets, 1440 covers laptops, 1920 covers desktop hero full-bleed.
 */
const WIDTHS = [480, 960, 1440, 1920];

// WebP rather than AVIF: near-identical size at this quality, decodes far
// faster on the low-end Android hardware this site needs to serve, and is
// supported by every browser with meaningful share in Nigeria.
const QUALITY = 72;

const sources = [];
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(path);
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      sources.push(path);
    }
  }
};
walk(SRC);

const available = {};
let written = 0;
let bytesIn = 0;
let bytesOut = 0;
let skipped = 0;

const run = async () => {
  for (const src of sources) {
    const rel = relative(SRC, src).replace(/\\/g, "/");
    const stem = rel.replace(/\.(jpe?g|png)$/i, "");
    const meta = await sharp(src).metadata();
    bytesIn += statSync(src).size;

    // Only widths at or below the source width exist. The loader needs to know
    // which, or it emits srcset URLs for files that were never written — the
    // production audit caught exactly that as 404s on 1600px blog images.
    available[stem] = [];

    for (const width of WIDTHS) {
      // Never upscale — a 1200px source has no business being served at 1920.
      if (meta.width && width > meta.width && width !== WIDTHS[0]) continue;
      available[stem].push(width);

      const dest = join(OUT, `${stem}-${width}.webp`);
      mkdirSync(dirname(dest), { recursive: true });

      if (existsSync(dest) && statSync(dest).mtimeMs > statSync(src).mtimeMs) {
        bytesOut += statSync(dest).size;
        skipped++;
        continue;
      }

      await sharp(src)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(dest);

      bytesOut += statSync(dest).size;
      written++;
    }
  }

  writeFileSync(
    join(process.cwd(), "lib", "image-widths.json"),
    `${JSON.stringify(available, null, 2)}\n`,
  );

  const mb = (n) => (n / 1024 / 1024).toFixed(1) + "MB";
  console.log(`${sources.length} sources -> ${written} written, ${skipped} up to date`);
  console.log(`originals ${mb(bytesIn)} -> variants ${mb(bytesOut)} across ${WIDTHS.length} widths`);
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
