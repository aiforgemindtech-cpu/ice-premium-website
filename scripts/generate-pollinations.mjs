/**
 * Generates the people-free imagery with Pollinations.ai (FLUX), which needs no
 * API key at all.
 *
 * Scope is deliberate. Text-to-image models are reliable on buildings,
 * interiors, materials and site views, and unreliable on people — a test
 * generation of an electrician produced four hands and an electrical panel made
 * of texture mush. So every slot that must show a person is flagged
 * `people: true` in the manifest and is skipped here; those come from real
 * photography via fetch-pexels.mjs instead.
 *
 * Usage:
 *   npm run images:gen                generate people-free slots that are missing
 *   npm run images:gen -- --force     regenerate them all
 *   npm run images:gen -- services    only paths starting with "services"
 */
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

import { images, STYLE_PREFIX } from "./image-manifest.mjs";

const OUT = join(process.cwd(), "public", "images");
const MODEL = process.env.POLLINATIONS_MODEL || "flux";

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const filters = args.filter((a) => !a.startsWith("--"));

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Negative guidance. Belt and braces alongside the people-free prompts. */
const NEGATIVE =
  " No people, no faces, no hands, no text, no watermark, no logos, no signage, " +
  "no distorted geometry. Clean, plausible, correctly proportioned.";

async function generate(item, seed) {
  const prompt = STYLE_PREFIX + item.prompt + NEGATIVE;
  const url =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}` +
    `?width=${item.w}&height=${item.h}&nologo=true&model=${MODEL}&seed=${seed}`;

  const res = await fetch(url, { signal: AbortSignal.timeout(180000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error(`suspiciously small (${buf.length}b)`);
  return buf;
}

async function writeVariants(buf, item) {
  const base = join(OUT, item.path);
  mkdirSync(dirname(base), { recursive: true });

  // Crop to the exact target aspect so layout can never shift.
  const pipeline = () =>
    sharp(buf).resize(item.w, item.h, { fit: "cover", position: "attention" });

  await pipeline().webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
  await pipeline().jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);

  return sharp(`${base}.jpg`).metadata();
}

const run = async () => {
  let targets = images.filter((i) => !i.people);
  if (filters.length) {
    targets = targets.filter((i) => filters.some((f) => i.path.startsWith(f)));
  }

  const skippedPeople = images.filter((i) => i.people).length;
  console.log(
    `${targets.length} people-free slots; ${skippedPeople} people slots left to real photography\n`,
  );

  let done = 0;
  let skipped = 0;
  const failed = [];

  for (const item of targets) {
    if (!FORCE && existsSync(`${join(OUT, item.path)}.webp`)) {
      skipped++;
      continue;
    }

    process.stdout.write(`  ${item.path} … `);
    let ok = false;

    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        // Vary the seed per attempt so a retry is a genuinely new composition.
        const buf = await generate(item, 1000 + attempt * 137);
        const meta = await writeVariants(buf, item);
        console.log(`ok ${meta.width}x${meta.height}`);
        done++;
        ok = true;
      } catch (err) {
        if (attempt === 3) {
          console.log(`FAILED (${err.message.slice(0, 60)})`);
          failed.push(item.path);
        } else {
          await sleep(attempt * 3000);
        }
      }
    }

    await sleep(800);
  }

  console.log(`\n${done} generated, ${skipped} already present, ${failed.length} failed`);
  if (failed.length) {
    console.log(`Retry: npm run images:gen -- ${failed.join(" ")}`);
    process.exitCode = 1;
  }
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
