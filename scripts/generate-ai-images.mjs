/**
 * Generates the site's photography with Google's Gemini image model and writes
 * it over the brand-graphic placeholders, in place, at the same paths.
 *
 * This calls the Generative Language API directly rather than going through a
 * Claude Code plugin, so it is just an npm script — no marketplace install, and
 * it runs in CI or on any machine with the key.
 *
 * Consistency: hero-01 is generated first and then passed back as a reference
 * image on every subsequent request, so lighting, grade and mood hold across
 * the whole set instead of drifting image to image.
 *
 * Usage:
 *   export GEMINI_API_KEY=...        (free key: aistudio.google.com → Get API Key)
 *   npm run images:ai                 generate everything missing
 *   npm run images:ai -- --force      regenerate everything
 *   npm run images:ai -- hero         only paths starting with "hero"
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

import { CASTING, images, STYLE_PREFIX } from "./image-manifest.mjs";

const KEY = process.env.GEMINI_API_KEY;
const OUT = join(process.cwd(), "public", "images");
const MODEL = process.env.GEMINI_IMAGE_MODEL || "gemini-2.5-flash-image";
const ENDPOINT = (m) =>
  `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const filters = args.filter((a) => !a.startsWith("--"));

if (!KEY) {
  console.error(
    [
      "",
      "  GEMINI_API_KEY is not set, so no images were generated.",
      "",
      "  Get a free key at https://aistudio.google.com → Get API Key, then:",
      "",
      "      export GEMINI_API_KEY=your-key-here",
      "      npm run images:ai",
      "",
      "  The site still builds and runs without this — the brand graphics in",
      "  /public/images hold every image slot until you run it.",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Single generation call. `reference` keeps the set visually consistent. */
async function generate(prompt, reference) {
  const parts = [];
  if (reference) {
    parts.push({
      inlineData: { mimeType: "image/jpeg", data: reference.toString("base64") },
    });
    parts.push({
      text:
        "Match the lighting, colour grade, lens character and overall mood of " +
        "the reference image exactly. Same photographic treatment, new subject: ",
    });
  }
  parts.push({ text: STYLE_PREFIX + prompt + CASTING });

  const res = await fetch(`${ENDPOINT(MODEL)}?key=${KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts }],
      generationConfig: { responseModalities: ["IMAGE"] },
    }),
    signal: AbortSignal.timeout(120000),
  });

  if (!res.ok) {
    const body = await res.text();

    // `limit: 0` is not an exhausted allowance, it is no allowance at all:
    // image generation is not on the Gemini free tier. Retrying never clears
    // it, so say so plainly instead of burning the retry budget.
    if (res.status === 429 && /limit:\s*0\b/.test(body)) {
      const err = new Error(
        "image generation is not available on this key's free tier " +
          "(quota limit is 0, not exhausted). Enable billing on the Google " +
          "Cloud project behind this key, or use a key from a billed project.",
      );
      err.fatal = true;
      throw err;
    }

    throw new Error(`HTTP ${res.status}: ${body.slice(0, 300)}`);
  }

  const json = await res.json();
  const blob = json.candidates?.[0]?.content?.parts?.find(
    (p) => p.inlineData?.data,
  );
  if (!blob) {
    const reason = json.candidates?.[0]?.finishReason || "no image in response";
    throw new Error(String(reason));
  }
  return Buffer.from(blob.inlineData.data, "base64");
}

/**
 * Crop to the exact target aspect and write both WebP and a JPEG fallback.
 * The model returns whatever aspect it likes, so this is what guarantees the
 * layout never shifts.
 */
async function writeVariants(buf, item) {
  const base = join(OUT, item.path);
  mkdirSync(dirname(base), { recursive: true });

  const pipeline = () =>
    sharp(buf).resize(item.w, item.h, { fit: "cover", position: "attention" });

  await pipeline().webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
  await pipeline().jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);

  const meta = await sharp(`${base}.webp`).metadata();
  return { width: meta.width, height: meta.height };
}

const run = async () => {
  const targets = filters.length
    ? images.filter((i) => filters.some((f) => i.path.startsWith(f)))
    : images;

  if (!targets.length) {
    console.error(`No images match: ${filters.join(", ")}`);
    process.exit(1);
  }

  // hero-01 anchors the look for everything else.
  const anchor = images.find((i) => i.path === "hero/hero-01");
  let reference = null;

  const anchorFile = join(OUT, `${anchor.path}.jpg`);
  const needsAnchor = FORCE || !existsSync(`${join(OUT, anchor.path)}.webp`);

  if (needsAnchor) {
    process.stdout.write(`  ${anchor.path} … `);
    let buf;
    try {
      buf = await generate(anchor.prompt);
    } catch (err) {
      if (err.fatal) {
        console.log("FAILED");
        console.error(`\n  ${err.message}\n`);
        console.error(
          "  Nothing was changed. The brand graphics in /public/images still\n" +
            "  fill every image slot, so the site is unaffected.\n",
        );
        process.exit(1);
      }
      throw err;
    }
    const dims = await writeVariants(buf, anchor);
    reference = await sharp(buf).resize({ width: 768 }).jpeg({ quality: 80 }).toBuffer();
    console.log(`ok ${dims.width}x${dims.height}`);
  } else {
    reference = await sharp(anchorFile)
      .resize({ width: 768 })
      .jpeg({ quality: 80 })
      .toBuffer();
    console.log(`  ${anchor.path} … reusing as style reference`);
  }

  let done = needsAnchor ? 1 : 0;
  let skipped = 0;
  const failed = [];

  for (const item of targets) {
    if (item.path === anchor.path) continue;
    if (!FORCE && existsSync(`${join(OUT, item.path)}.webp`)) {
      skipped++;
      continue;
    }

    process.stdout.write(`  ${item.path} … `);
    let ok = false;
    for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
      try {
        const buf = await generate(item.prompt, reference);
        const dims = await writeVariants(buf, item);
        console.log(`ok ${dims.width}x${dims.height}`);
        done++;
        ok = true;
      } catch (err) {
        if (err.fatal) {
          console.log("FAILED");
          console.error(`\n  ${err.message}\n`);
          console.error(
            "  Nothing was changed. The brand graphics in /public/images still\n" +
              "  fill every image slot, so the site is unaffected.\n",
          );
          process.exit(1);
        }
        if (attempt === 3) {
          console.log(`FAILED (${err.message.slice(0, 80)})`);
          failed.push(item.path);
        } else {
          // Back off on rate limits, then retry.
          await sleep(attempt * 4000);
        }
      }
    }
    // Stay well inside the free tier's per-minute quota.
    await sleep(1500);
  }

  writeFileSync(
    join(OUT, "GENERATED.txt"),
    [
      "AI-GENERATED IMAGERY — not photographs of real ICE-Premium projects.",
      "",
      `Model:      ${MODEL}`,
      `Generated:  ${new Date().toISOString()}`,
      `Files:      ${done}`,
      "",
      "These images represent each discipline generically. Never describe them",
      "in copy, captions or alt text as a specific completed ICE-Premium job.",
      "Replace with the client's own photography once recovered.",
      "",
    ].join("\n"),
  );

  console.log(
    `\n${done} generated, ${skipped} already present, ${failed.length} failed`,
  );
  if (failed.length) {
    console.log(`Retry these with: npm run images:ai -- ${failed.join(" ")}`);
    process.exitCode = 1;
  }
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
