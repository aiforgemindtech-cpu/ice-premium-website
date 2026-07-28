/**
 * Fills the people slots with real photography from Pexels.
 *
 * Every slot that shows a person comes from here rather than from image
 * generation. Generated people are unreliable in exactly the ways that matter
 * on a contractor's site — hands, limb counts and technical equipment — so the
 * only way to get clean human subjects is to use real photographs.
 *
 * The Pexels licence permits commercial use with no attribution required.
 * Photographer credits are still recorded in public/images/PHOTO-CREDITS.txt,
 * because crediting people whose work you are using is decent practice.
 *
 * Usage:
 *   npm run images:photos                 fill missing people slots
 *   npm run images:photos -- --force      refetch them all
 *   npm run images:photos -- --candidates build review sheets instead of picking
 *   npm run images:photos -- hero/hero-03 --pick 4    choose candidate #4
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";

import { images } from "./image-manifest.mjs";

const KEY = process.env.PEXELS_API_KEY;
const OUT = join(process.cwd(), "public", "images");
const SHEETS = join(process.cwd(), ".tmp-check");

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const CANDIDATES = args.includes("--candidates");
const pickIndex = args.includes("--pick")
  ? Number(args[args.indexOf("--pick") + 1])
  : null;
const filters = args.filter((a, i) => {
  if (a.startsWith("--")) return false;
  return args[i - 1] !== "--pick";
});

if (!KEY) {
  console.error(
    [
      "",
      "  PEXELS_API_KEY is not set.",
      "",
      "  Get a free key at https://www.pexels.com/api/ (no card required), then:",
      "",
      "      export PEXELS_API_KEY=your-key-here",
      "      npm run images:photos",
      "",
    ].join("\n"),
  );
  process.exit(1);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query, perPage = 12) {
  const url =
    "https://api.pexels.com/v1/search?" +
    new URLSearchParams({
      query,
      per_page: String(perPage),
      orientation: "landscape",
      size: "large",
    });

  const res = await fetch(url, {
    headers: { Authorization: KEY },
    signal: AbortSignal.timeout(45000),
  });
  if (!res.ok) throw new Error(`Pexels ${res.status}`);

  const json = await res.json();
  return json.photos || [];
}

async function download(photo) {
  // `original` is the full-resolution file; everything here is downsized anyway.
  const res = await fetch(photo.src.original, {
    signal: AbortSignal.timeout(90000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function writeVariants(buf, item) {
  const base = join(OUT, item.path);
  mkdirSync(dirname(base), { recursive: true });

  const pipeline = () =>
    sharp(buf).resize(item.w, item.h, { fit: "cover", position: "attention" });

  await pipeline().webp({ quality: 82, effort: 5 }).toFile(`${base}.webp`);
  await pipeline().jpeg({ quality: 82, mozjpeg: true }).toFile(`${base}.jpg`);

  return sharp(`${base}.jpg`).metadata();
}

/** Numbered grid so a whole slot's candidates can be judged in one look. */
async function buildSheet(slug, photos) {
  mkdirSync(SHEETS, { recursive: true });
  const COLS = 4;
  const CW = 420;
  const CH = 280;
  const rows = Math.ceil(photos.length / COLS);
  const tiles = [];

  for (const [i, p] of photos.entries()) {
    const x = (i % COLS) * CW;
    const y = Math.floor(i / COLS) * CH;
    try {
      const res = await fetch(p.src.large, { signal: AbortSignal.timeout(45000) });
      const buf = Buffer.from(await res.arrayBuffer());
      tiles.push({
        input: await sharp(buf).resize(CW - 6, CH - 30, { fit: "cover" }).toBuffer(),
        top: y + 3,
        left: x + 3,
      });
    } catch {
      continue;
    }
    tiles.push({
      input: Buffer.from(
        `<svg width="${CW}" height="28" xmlns="http://www.w3.org/2000/svg">
           <rect width="${CW}" height="28" fill="#000"/>
           <text x="8" y="20" font-family="Helvetica,Arial" font-size="17" font-weight="700" fill="#ffdd55">#${i + 1}</text>
           <text x="44" y="20" font-family="Helvetica,Arial" font-size="12" fill="#fff">${p.width}x${p.height}</text>
         </svg>`,
      ),
      top: y + CH - 28,
      left: x,
    });
  }

  const out = join(SHEETS, `pexels-${slug}.jpg`);
  await sharp({
    create: { width: COLS * CW, height: rows * CH, channels: 3, background: "#111" },
  })
    .composite(tiles)
    .jpeg({ quality: 80 })
    .toFile(out);
  return out;
}

const credits = [];

const run = async () => {
  let targets = images.filter((i) => i.people);
  if (filters.length) {
    targets = targets.filter((i) => filters.some((f) => i.path.startsWith(f)));
  }

  for (const item of targets) {
    const slug = item.path.replace("/", "-");

    if (!FORCE && !CANDIDATES && existsSync(`${join(OUT, item.path)}.webp`)) {
      console.log(`  ${item.path} … already present`);
      continue;
    }

    process.stdout.write(`  ${item.path} … `);
    try {
      // Pexels' African coverage is thinner for some trades, so widen through
      // the fallback queries until there is a reasonable pool to choose from.
      const queries = [item.photoQuery, ...(item.photoFallbacks || [])];
      const seen = new Set();
      const photos = [];
      for (const q of queries) {
        if (photos.length >= 12) break;
        for (const p of await search(q)) {
          if (seen.has(p.id)) continue;
          seen.add(p.id);
          photos.push(p);
        }
        await sleep(300);
      }

      if (!photos.length) {
        console.log("no results");
        continue;
      }

      if (CANDIDATES) {
        console.log(`${photos.length} candidates -> ${await buildSheet(slug, photos)}`);
        writeFileSync(
          join(SHEETS, `pexels-${slug}.json`),
          JSON.stringify(photos, null, 2),
        );
        await sleep(400);
        continue;
      }

      // Curated selections. Every candidate sheet was reviewed by eye; these
      // are the frames that are both African-cast and technically credible.
      // Rejected along the way: COVID-era masks (dates the site), solar-panel
      // shots (not our trades), and South Asian brickfield workers returned by
      // masonry queries.
      const PICKS = {
        "hero/hero-01": 7,
        "hero/hero-02": 1,
        "hero/hero-03": 1,
        "hero/hero-04": 3,
        "hero/hero-05": 2,
        "hero/hero-07": 5,
        "about/team-photo": 1,
      };
      const idx = pickIndex ?? PICKS[item.path] ?? 1;
      const chosen = photos[idx - 1] || photos[0];
      const meta = await writeVariants(await download(chosen), item);
      credits.push({
        path: item.path,
        photographer: chosen.photographer,
        url: chosen.url,
        description: chosen.alt,
      });
      console.log(`ok ${meta.width}x${meta.height} — ${chosen.photographer}`);
    } catch (err) {
      console.log(`FAILED (${err.message.slice(0, 60)})`);
    }

    await sleep(600);
  }

  if (credits.length) {
    writeFileSync(
      join(OUT, "PHOTO-CREDITS.txt"),
      [
        "Real photography sourced from Pexels (pexels.com).",
        "",
        "The Pexels licence allows commercial use with no attribution required.",
        "Credits are recorded here anyway. These are stock photographs of other",
        "people's sites and staff — they are NOT ICE-Premium projects or staff,",
        "and must never be described as such.",
        "",
        ...credits.map(
          (c) => `${c.path}\n  ${c.photographer} — ${c.url}\n  "${c.description}"\n`,
        ),
      ].join("\n"),
    );
    console.log(`\nwrote credits for ${credits.length} photographs`);
  }
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
