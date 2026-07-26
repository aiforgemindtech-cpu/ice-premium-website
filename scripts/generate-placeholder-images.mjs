// Generates the placeholder imagery used across the site.
//
// These are NOT photographs. They are generated abstract graphics standing in for
// real project photography, and every one carries a visible "PLACEHOLDER" label so
// it can never be mistaken for a real ICE-Premium project photo. Replace the files
// in /public/images with real photography before launch — the paths are referenced
// from content/*.json and content/services/*.mdx.
//
// Output is JPEG rather than SVG so next/image runs its normal AVIF/WebP pipeline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const PUBLIC = join(process.cwd(), "public", "images");

const NAVY = "#070d1f";
const NAVY_MID = "#0d1a3a";
const GOLD = "#d4af37";

// Deterministic PRNG so re-running produces identical files (no git churn).
function rng(seed) {
  let s = [...seed].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function buildSvg({ w, h, label, kind, seed }) {
  const r = rng(seed);
  const parts = [];

  parts.push(
    `<defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${NAVY}"/>
        <stop offset="55%" stop-color="${NAVY_MID}"/>
        <stop offset="100%" stop-color="${NAVY}"/>
      </linearGradient>
      <radialGradient id="glow" cx="${20 + r() * 60}%" cy="${20 + r() * 50}%" r="60%">
        <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.30"/>
        <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    <rect width="${w}" height="${h}" fill="url(#glow)"/>`,
  );

  // Faint blueprint grid.
  const step = Math.round(w / 18);
  for (let x = step; x < w; x += step) {
    parts.push(
      `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>`,
    );
  }
  for (let y = step; y < h; y += step) {
    parts.push(
      `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>`,
    );
  }

  // Abstract structural forms — a suggestion of buildings and site geometry.
  if (kind === "structure" || kind === "hero") {
    const cols = 5 + Math.floor(r() * 3);
    for (let i = 0; i < cols; i++) {
      const bw = w / (cols + 1);
      const bh = h * (0.25 + r() * 0.5);
      const x = i * bw + bw * 0.35;
      parts.push(
        `<rect x="${x.toFixed(0)}" y="${(h - bh).toFixed(0)}" width="${(bw * 0.62).toFixed(0)}" height="${bh.toFixed(0)}" fill="#ffffff" fill-opacity="${(0.03 + r() * 0.05).toFixed(3)}" stroke="${GOLD}" stroke-opacity="0.18" stroke-width="1.5"/>`,
      );
    }
    // Crane silhouette.
    const cx = w * (0.6 + r() * 0.25);
    const cy = h * 0.16;
    parts.push(
      `<g stroke="${GOLD}" stroke-opacity="0.45" stroke-width="2" fill="none">
        <line x1="${cx}" y1="${cy}" x2="${cx}" y2="${h * 0.78}"/>
        <line x1="${cx - w * 0.16}" y1="${cy}" x2="${cx + w * 0.1}" y2="${cy}"/>
        <line x1="${cx - w * 0.16}" y1="${cy}" x2="${cx}" y2="${cy - h * 0.07}"/>
        <line x1="${cx + w * 0.1}" y1="${cy}" x2="${cx}" y2="${cy - h * 0.07}"/>
        <line x1="${cx - w * 0.1}" y1="${cy}" x2="${cx - w * 0.1}" y2="${cy + h * 0.12}"/>
      </g>`,
    );
  }

  if (kind === "detail") {
    for (let i = 0; i < 14; i++) {
      const x = r() * w;
      const y = r() * h;
      const size = 20 + r() * 90;
      parts.push(
        `<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${size.toFixed(0)}" height="${size.toFixed(0)}" fill="none" stroke="${GOLD}" stroke-opacity="${(0.08 + r() * 0.18).toFixed(3)}" stroke-width="1.5" transform="rotate(${(r() * 45).toFixed(1)} ${x.toFixed(0)} ${y.toFixed(0)})"/>`,
      );
    }
  }

  if (kind === "arc") {
    for (let i = 0; i < 5; i++) {
      const rad = (h / 2) * (0.4 + i * 0.22);
      parts.push(
        `<circle cx="${w * 0.5}" cy="${h * 0.55}" r="${rad.toFixed(0)}" fill="none" stroke="${GOLD}" stroke-opacity="${(0.22 - i * 0.035).toFixed(3)}" stroke-width="1.5"/>`,
      );
    }
  }

  // Gold rule + label block.
  const pad = Math.round(w * 0.06);
  const fs = Math.max(13, Math.round(w / 46));
  parts.push(
    `<line x1="${pad}" y1="${h - pad - fs * 2.6}" x2="${pad + w * 0.1}" y2="${h - pad - fs * 2.6}" stroke="${GOLD}" stroke-width="2"/>`,
    `<text x="${pad}" y="${h - pad - fs * 1.15}" fill="#ffffff" fill-opacity="0.92" font-family="Helvetica,Arial,sans-serif" font-size="${fs}" font-weight="700" letter-spacing="0.5">${esc(label)}</text>`,
    `<text x="${pad}" y="${h - pad + fs * 0.25}" fill="${GOLD}" fill-opacity="0.85" font-family="Helvetica,Arial,sans-serif" font-size="${Math.round(fs * 0.68)}" letter-spacing="3">PLACEHOLDER — NOT A REAL PROJECT PHOTO</text>`,
  );

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${parts.join("")}</svg>`;
}

async function write(dir, name, opts) {
  mkdirSync(join(PUBLIC, dir), { recursive: true });
  const svg = buildSvg({ ...opts, seed: name });
  const buf = await sharp(Buffer.from(svg))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  writeFileSync(join(PUBLIC, dir, `${name}.jpg`), buf);
  return `${dir}/${name}.jpg`;
}

const HERO = [
  ["hero-1", "Electrical installation"],
  ["hero-2", "Roofing works"],
  ["hero-3", "Carpentry & joinery"],
  ["hero-4", "Painting & finishing"],
  ["hero-5", "Site engineering"],
  ["hero-6", "Steel fabrication"],
  ["hero-7", "Interior fit-out"],
  ["hero-8", "Facility maintenance"],
];

const SERVICES = [
  ["renovation-remodeling", "Renovation & Remodeling"],
  ["electrical-installations", "Electrical Installations"],
  ["plumbing", "Plumbing"],
  ["painting-finishing", "Painting & Finishing"],
  ["roofing-waterproofing", "Roofing & Waterproofing"],
  ["ceiling-installation", "Ceiling Installation"],
  ["ceiling-design", "Ceiling Design"],
  ["tiling-flooring", "Tiling & Flooring"],
  ["carpentry-woodworking", "Carpentry & Woodworking"],
  ["steel-metal-fabrication", "Steel & Metal Fabrication"],
  ["facility-maintenance", "Facility Maintenance"],
  ["interior-design", "Interior Design"],
];

const PROJECTS = [
  ["cbd-office-refit", "CBD Office Refit — Abuja"],
  ["lekki-residence-rewire", "Lekki Residence Rewire — Lagos"],
  ["enugu-retail-fitout", "Enugu Retail Fit-Out"],
  ["asaba-roof-replacement", "Asaba Roof Replacement"],
  ["ph-facility-maintenance", "PH Facility Maintenance"],
  ["abuja-steel-balustrade", "Abuja Steel Balustrade"],
];

const POSTS = [
  ["why-your-roof-keeps-leaking-after-repairs", "Roofing"],
  ["what-a-condition-survey-actually-finds", "Process"],
  ["planned-maintenance-versus-emergency-callouts", "Maintenance"],
  ["why-tiles-crack-and-how-to-prevent-it", "Flooring"],
  ["designing-ceilings-in-rooms-without-height", "Design"],
  ["single-contractor-versus-managing-trades-yourself", "Process"],
];

const BEFORE_AFTER = [
  ["office-reception", "Office Reception"],
  ["kitchen-refit", "Kitchen Refit"],
  ["facade-restoration", "Facade Restoration"],
  ["bathroom-renovation", "Bathroom Renovation"],
];

const run = async () => {
  const written = [];

  for (const [name, label] of HERO)
    written.push(await write("hero", name, { w: 1920, h: 1080, label, kind: "hero" }));

  for (const [name, label] of SERVICES)
    written.push(
      await write("services", name, { w: 1600, h: 900, label, kind: "structure" }),
    );

  for (const [name, label] of PROJECTS) {
    written.push(
      await write("projects", name, { w: 1600, h: 1100, label, kind: "structure" }),
    );
    written.push(
      await write("projects", `${name}-2`, {
        w: 1400,
        h: 1000,
        label: `${label} — detail`,
        kind: "detail",
      }),
    );
    written.push(
      await write("projects", `${name}-3`, {
        w: 1400,
        h: 1000,
        label: `${label} — detail`,
        kind: "arc",
      }),
    );
  }

  for (const [name, label] of POSTS)
    written.push(await write("blog", name, { w: 1400, h: 900, label, kind: "arc" }));

  for (const [name, label] of BEFORE_AFTER) {
    written.push(
      await write("before-after", `${name}-before`, {
        w: 1400,
        h: 1000,
        label: `${label} — before`,
        kind: "detail",
      }),
    );
    written.push(
      await write("before-after", `${name}-after`, {
        w: 1400,
        h: 1000,
        label: `${label} — after`,
        kind: "structure",
      }),
    );
  }

  written.push(
    await write("general", "company-overview", {
      w: 1400,
      h: 1200,
      label: "ICE-Premium team on site",
      kind: "structure",
    }),
  );
  written.push(
    await write("general", "og-fallback", {
      w: 1200,
      h: 630,
      label: "ICE-PREMIUM LIMITED",
      kind: "hero",
    }),
  );

  console.log(`generated ${written.length} placeholder images`);
};

run();
