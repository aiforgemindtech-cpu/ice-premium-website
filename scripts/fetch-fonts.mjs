/**
 * Downloads the webfonts into the repo so builds never touch the network.
 *
 * `next/font/google` fetches from Google at build time, which made `npm run
 * build` fail intermittently on a flaky connection and would do the same in
 * CI. Self-hosting removes that dependency, and also drops a third-party
 * connection from every page load.
 *
 * Run once (already done — the files are committed):
 *   node scripts/fetch-fonts.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "app", "fonts");
mkdirSync(OUT, { recursive: true });

// A modern UA is required or Google serves legacy TTF instead of woff2.
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

const FAMILIES = [
  { css: "Space+Grotesk:wght@500;700", prefix: "space-grotesk" },
  { css: "Inter:wght@400;500;600", prefix: "inter" },
  { css: "JetBrains+Mono:wght@400;500", prefix: "jetbrains-mono" },
];

const run = async () => {
  const written = [];

  for (const family of FAMILIES) {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${family.css}&display=swap`;
    const css = await (
      await fetch(cssUrl, { headers: { "User-Agent": UA } })
    ).text();

    // Latin only — the site is English, so the extended subsets are dead weight.
    const blocks = css.split("/*").filter((b) => b.startsWith(" latin */"));
    let i = 0;

    for (const block of blocks) {
      const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
      const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
      if (!url || !weight) continue;

      const buf = Buffer.from(
        await (await fetch(url, { headers: { "User-Agent": UA } })).arrayBuffer(),
      );
      const name = `${family.prefix}-${weight}.woff2`;
      writeFileSync(join(OUT, name), buf);
      written.push(`${name} (${Math.round(buf.length / 1024)}KB)`);
      i++;
    }

    if (i === 0) console.warn(`! no latin faces found for ${family.prefix}`);
  }

  console.log(`saved ${written.length} font files to app/fonts:`);
  for (const w of written) console.log(`  ${w}`);
};

run().catch((e) => {
  console.error("failed:", e.message);
  process.exit(1);
});
