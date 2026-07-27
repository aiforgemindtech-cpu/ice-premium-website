/**
 * Generates the site's imagery as designed brand graphics.
 *
 * These are illustrations, not photographs, and deliberately so: an abstract
 * graphic cannot be mistaken for one of ICE-Premium's own project photos, which
 * a piece of unrelated stock photography very easily can. They are drawn per
 * trade (a truss for roofing, a circuit for electrical, a perspective room for
 * interiors) in the navy/gold brand palette, so the site reads as intentional
 * rather than unfinished while real photography is unavailable.
 *
 * Replace /public/images with real photography when it is recovered — see the
 * swap-before-launch checklist in the README.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { images } from "./image-manifest.mjs";
import { join } from "node:path";
import sharp from "sharp";

const OUT = join(process.cwd(), "public", "images");

const NAVY = "#070d1f";
const NAVY_MID = "#0d1a3a";
const NAVY_HI = "#16305e";
const GOLD = "#d4af37";
const GOLD_HI = "#e6c659";

/** Deterministic PRNG, so re-running produces identical files (no git churn). */
function rng(seed) {
  let s = [...String(seed)].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 17);
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

const defs = (r) => `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${NAVY_HI}"/>
      <stop offset="55%" stop-color="${NAVY_MID}"/>
      <stop offset="100%" stop-color="${NAVY}"/>
    </linearGradient>
    <radialGradient id="sun" cx="${(18 + r() * 64).toFixed(1)}%" cy="${(14 + r() * 26).toFixed(1)}%" r="52%">
      <stop offset="0%" stop-color="${GOLD}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${GOLD}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="vign" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${NAVY}" stop-opacity="0.55"/>
      <stop offset="40%" stop-color="${NAVY}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${NAVY}" stop-opacity="0.85"/>
    </linearGradient>
    <linearGradient id="goldbar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${GOLD}"/>
      <stop offset="100%" stop-color="${GOLD_HI}"/>
    </linearGradient>
  </defs>`;

/** Layered city skyline with atmospheric depth. */
function skyline(w, h, r) {
  let out = "";
  const bands = [
    { y: 0.52, op: 0.16, n: 16 },
    { y: 0.63, op: 0.3, n: 12 },
    { y: 0.74, op: 0.55, n: 9 },
  ];
  for (const band of bands) {
    let x = -40;
    while (x < w + 40) {
      const bw = w * (0.045 + r() * 0.075);
      const bh = h * (0.12 + r() * 0.3);
      const top = h * band.y - bh;
      out += `<rect x="${x.toFixed(0)}" y="${top.toFixed(0)}" width="${bw.toFixed(0)}" height="${(h - top).toFixed(0)}" fill="${NAVY}" fill-opacity="${band.op}"/>`;
      // window grid
      if (band.op > 0.25) {
        const cols = Math.max(2, Math.floor(bw / 26));
        const rows = Math.max(3, Math.floor(bh / 30));
        for (let c = 0; c < cols; c++)
          for (let q = 0; q < rows; q++)
            if (r() > 0.62)
              out += `<rect x="${(x + 10 + c * (bw / cols)).toFixed(0)}" y="${(top + 14 + q * (bh / rows)).toFixed(0)}" width="6" height="9" fill="${GOLD}" fill-opacity="${(0.15 + r() * 0.5).toFixed(2)}"/>`;
      }
      x += bw + w * 0.012;
    }
  }
  return out;
}

/** Tower crane with jib and hoist. */
function crane(w, h, r, scale = 1) {
  const cx = w * (0.58 + r() * 0.26);
  const top = h * 0.1;
  const base = h * 0.78;
  const jib = w * 0.2 * scale;
  const s = 2.2 * scale;
  let g = `<g stroke="${GOLD}" stroke-opacity="0.75" stroke-width="${s}" fill="none" stroke-linecap="round">`;
  g += `<line x1="${cx}" y1="${top}" x2="${cx}" y2="${base}"/>`;
  // mast lattice
  for (let y = top; y < base; y += 26 * scale) {
    g += `<line x1="${cx - 9 * scale}" y1="${y}" x2="${cx + 9 * scale}" y2="${y + 13 * scale}" stroke-opacity="0.4"/>`;
    g += `<line x1="${cx + 9 * scale}" y1="${y}" x2="${cx - 9 * scale}" y2="${y + 13 * scale}" stroke-opacity="0.4"/>`;
  }
  g += `<line x1="${cx - 9 * scale}" y1="${top}" x2="${cx - 9 * scale}" y2="${base}" stroke-opacity="0.5"/>`;
  g += `<line x1="${cx + 9 * scale}" y1="${top}" x2="${cx + 9 * scale}" y2="${base}" stroke-opacity="0.5"/>`;
  // jib + counter-jib
  g += `<line x1="${cx - jib}" y1="${top}" x2="${cx + jib * 0.55}" y2="${top}"/>`;
  g += `<line x1="${cx - jib}" y1="${top}" x2="${cx}" y2="${top - h * 0.07}"/>`;
  g += `<line x1="${cx + jib * 0.55}" y1="${top}" x2="${cx}" y2="${top - h * 0.07}"/>`;
  // hoist
  const hx = cx - jib * 0.6;
  g += `<line x1="${hx}" y1="${top}" x2="${hx}" y2="${top + h * 0.17}"/>`;
  g += `</g><rect x="${hx - 16 * scale}" y="${top + h * 0.17}" width="${32 * scale}" height="${20 * scale}" fill="${GOLD}" fill-opacity="0.5"/>`;
  return g;
}

/** Scaffold / building frame grid. */
function frame(w, h, r) {
  const x0 = w * 0.06;
  const y0 = h * 0.3;
  const cols = 5 + Math.floor(r() * 3);
  const rows = 4;
  const cw = (w * 0.36) / cols;
  const ch = (h * 0.5) / rows;
  let g = `<g stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.6" fill="none">`;
  for (let c = 0; c <= cols; c++)
    g += `<line x1="${x0 + c * cw}" y1="${y0}" x2="${x0 + c * cw}" y2="${y0 + rows * ch}"/>`;
  for (let q = 0; q <= rows; q++)
    g += `<line x1="${x0}" y1="${y0 + q * ch}" x2="${x0 + cols * cw}" y2="${y0 + q * ch}"/>`;
  for (let c = 0; c < cols; c++)
    for (let q = 0; q < rows; q++)
      if (r() > 0.55)
        g += `<line x1="${x0 + c * cw}" y1="${y0 + q * ch}" x2="${x0 + (c + 1) * cw}" y2="${y0 + (q + 1) * ch}" stroke-opacity="0.22"/>`;
  return g + `</g>`;
}

/** Roof truss geometry. */
function truss(w, h) {
  const y = h * 0.62;
  const span = w * 0.78;
  const x0 = (w - span) / 2;
  const peak = h * 0.26;
  let g = `<g stroke="${GOLD}" stroke-opacity="0.6" stroke-width="2.4" fill="none" stroke-linejoin="round">`;
  g += `<path d="M${x0} ${y} L${w / 2} ${peak} L${x0 + span} ${y} Z"/>`;
  const n = 6;
  for (let i = 1; i < n; i++) {
    const t = i / n;
    const lx = x0 + (span / 2) * t;
    const ly = y - (y - peak) * t;
    g += `<line x1="${lx}" y1="${ly}" x2="${x0 + (span / n) * i}" y2="${y}" stroke-opacity="0.4"/>`;
    const rx = x0 + span - (span / 2) * t;
    g += `<line x1="${rx}" y1="${ly}" x2="${x0 + span - (span / n) * i}" y2="${y}" stroke-opacity="0.4"/>`;
  }
  g += `<line x1="${x0}" y1="${y}" x2="${x0 + span}" y2="${y}" stroke-width="3"/>`;
  return g + `</g>`;
}

/** Electrical schematic: bus lines with nodes. */
function circuit(w, h, r) {
  let g = `<g stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2" fill="none" stroke-linecap="round">`;
  const lanes = 5;
  for (let i = 0; i < lanes; i++) {
    const y = h * (0.2 + (i * 0.62) / (lanes - 1));
    let x = w * 0.06;
    let d = `M${x} ${y}`;
    while (x < w * 0.94) {
      const step = w * (0.06 + r() * 0.1);
      x += step;
      if (r() > 0.55) {
        const dy = (r() > 0.5 ? -1 : 1) * h * 0.07;
        d += ` L${(x - step * 0.35).toFixed(0)} ${y} L${x.toFixed(0)} ${(y + dy).toFixed(0)}`;
        d += ` L${(x + step * 0.3).toFixed(0)} ${(y + dy).toFixed(0)} L${(x + step * 0.55).toFixed(0)} ${y}`;
        x += step * 0.55;
      } else {
        d += ` L${x.toFixed(0)} ${y}`;
      }
    }
    g += `<path d="${d}"/>`;
  }
  g += `</g>`;
  for (let i = 0; i < 16; i++)
    g += `<circle cx="${(w * (0.08 + r() * 0.84)).toFixed(0)}" cy="${(h * (0.18 + r() * 0.64)).toFixed(0)}" r="${(3 + r() * 4).toFixed(1)}" fill="${GOLD}" fill-opacity="${(0.35 + r() * 0.5).toFixed(2)}"/>`;
  return g;
}

/** Plumbing pipe runs with elbows and flanges. */
function pipes(w, h, r) {
  let g = "";
  for (let i = 0; i < 5; i++) {
    const y = h * (0.18 + i * 0.16);
    const bend = w * (0.3 + r() * 0.4);
    const drop = y + h * (0.08 + r() * 0.14);
    g += `<path d="M${w * 0.04} ${y} L${bend} ${y} L${bend} ${drop} L${w * 0.96} ${drop}"
             stroke="${GOLD}" stroke-opacity="${(0.28 + r() * 0.3).toFixed(2)}" stroke-width="${(7 + r() * 7).toFixed(1)}"
             fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    g += `<circle cx="${bend}" cy="${y}" r="${(7 + r() * 4).toFixed(1)}" fill="${NAVY}" stroke="${GOLD}" stroke-opacity="0.6" stroke-width="2"/>`;
  }
  return g;
}

/** Brick / block bond. */
function brick(w, h, r) {
  let g = "";
  const bh = h / 14;
  const bw = w / 7;
  for (let row = 0; row * bh < h; row++) {
    const off = row % 2 ? bw / 2 : 0;
    for (let x = -bw; x < w + bw; x += bw) {
      g += `<rect x="${(x + off + 3).toFixed(0)}" y="${(row * bh + 3).toFixed(0)}" width="${(bw - 6).toFixed(0)}" height="${(bh - 6).toFixed(0)}"
              fill="${GOLD}" fill-opacity="${(0.03 + r() * 0.1).toFixed(3)}" stroke="${GOLD}" stroke-opacity="0.13" stroke-width="1"/>`;
    }
  }
  return g;
}

/** Floor tiles in one-point perspective. */
function tiles(w, h) {
  const vx = w / 2;
  const vy = h * 0.3;
  let g = `<g stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1.4" fill="none">`;
  for (let i = -8; i <= 8; i++)
    g += `<line x1="${vx + i * (w / 9)}" y1="${h}" x2="${vx + i * 6}" y2="${vy}"/>`;
  for (let i = 1; i <= 12; i++) {
    const t = i / 12;
    const y = vy + (h - vy) * (t * t);
    g += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke-opacity="${(0.4 - t * 0.22).toFixed(2)}"/>`;
  }
  return g + `</g>`;
}

/** Timber grain planks, with visible end joints and butt lines. */
function timber(w, h, r) {
  let g = "";
  const ph = h / 6;
  for (let i = 0; i < 6; i++) {
    const y = i * ph;
    // Plank face, alternating tone so the boards read individually.
    g += `<rect x="0" y="${y + 3}" width="${w}" height="${ph - 6}" fill="${GOLD}" fill-opacity="${(0.07 + (i % 2) * 0.05 + r() * 0.05).toFixed(3)}" />`;
    // Bevel between boards.
    g += `<line x1="0" y1="${y + 3}" x2="${w}" y2="${y + 3}" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.6"/>`;
    // Butt joint.
    const bx = w * (0.2 + r() * 0.6);
    g += `<line x1="${bx.toFixed(0)}" y1="${y + 3}" x2="${bx.toFixed(0)}" y2="${(y + ph - 3).toFixed(0)}" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1.6"/>`;
    for (let k = 0; k < 6; k++) {
      const gy = y + ph * (0.15 + r() * 0.7);
      g += `<path d="M0 ${gy.toFixed(0)} Q${(w * 0.3).toFixed(0)} ${(gy + (r() - 0.5) * 16).toFixed(0)} ${(w * 0.6).toFixed(0)} ${gy.toFixed(0)} T${w} ${(gy + (r() - 0.5) * 12).toFixed(0)}"
              stroke="${GOLD}" stroke-opacity="${(0.16 + r() * 0.2).toFixed(3)}" stroke-width="1.5" fill="none"/>`;
    }
    // Knot.
    if (r() > 0.5) {
      const kx = w * (0.1 + r() * 0.8);
      const ky = y + ph * 0.5;
      g += `<ellipse cx="${kx.toFixed(0)}" cy="${ky.toFixed(0)}" rx="${(9 + r() * 7).toFixed(0)}" ry="${(5 + r() * 4).toFixed(0)}" fill="none" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.6"/>`;
    }
  }
  return g;
}

/** Steel lattice / space frame. */
function steel(w, h, r) {
  let g = `<g stroke="${GOLD}" stroke-opacity="0.45" stroke-width="2" fill="none">`;
  const cols = 8;
  const rows = 5;
  const cw = w / cols;
  const ch = h / rows;
  for (let c = 0; c < cols; c++)
    for (let q = 0; q < rows; q++) {
      const x = c * cw;
      const y = q * ch;
      g += `<rect x="${x}" y="${y}" width="${cw}" height="${ch}" stroke-opacity="0.2"/>`;
      g += `<line x1="${x}" y1="${y}" x2="${x + cw}" y2="${y + ch}" stroke-opacity="${(0.15 + r() * 0.3).toFixed(2)}"/>`;
      g += `<line x1="${x + cw}" y1="${y}" x2="${x}" y2="${y + ch}" stroke-opacity="${(0.15 + r() * 0.3).toFixed(2)}"/>`;
    }
  g += `</g>`;
  for (let i = 0; i <= cols; i++)
    for (let q = 0; q <= rows; q++)
      g += `<circle cx="${i * cw}" cy="${q * ch}" r="2.6" fill="${GOLD}" fill-opacity="0.5"/>`;
  return g;
}

/** Interior room in one-point perspective, with a coffered ceiling. */
function room(w, h) {
  const ix = w * 0.22;
  const iy = h * 0.2;
  const iw = w * 0.56;
  const ih = h * 0.5;
  let g = `<g stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.8" fill="none">`;
  g += `<rect x="${ix}" y="${iy}" width="${iw}" height="${ih}"/>`;
  g += `<line x1="0" y1="0" x2="${ix}" y2="${iy}"/>`;
  g += `<line x1="${w}" y1="0" x2="${ix + iw}" y2="${iy}"/>`;
  g += `<line x1="0" y1="${h}" x2="${ix}" y2="${iy + ih}"/>`;
  g += `<line x1="${w}" y1="${h}" x2="${ix + iw}" y2="${iy + ih}"/>`;
  // ceiling coffers
  for (let i = 1; i < 4; i++) {
    const t = i / 4;
    g += `<line x1="${ix * t}" y1="${iy * t}" x2="${w - (w - ix - iw) * t}" y2="${iy * t}" stroke-opacity="0.25"/>`;
  }
  g += `</g>`;
  // window glow
  g += `<rect x="${ix + iw * 0.12}" y="${iy + ih * 0.16}" width="${iw * 0.3}" height="${ih * 0.5}" fill="${GOLD}" fill-opacity="0.16"/>`;
  return g;
}

/** Architectural floor plan. */
function plan(w, h, r) {
  let g = `<g stroke="${GOLD}" stroke-opacity="0.5" stroke-width="2.4" fill="none">`;
  const x0 = w * 0.12;
  const y0 = h * 0.16;
  const pw = w * 0.76;
  const ph = h * 0.68;
  g += `<rect x="${x0}" y="${y0}" width="${pw}" height="${ph}"/>`;
  const vx = x0 + pw * (0.35 + r() * 0.2);
  const hy = y0 + ph * (0.4 + r() * 0.2);
  g += `<line x1="${vx}" y1="${y0}" x2="${vx}" y2="${hy}"/>`;
  g += `<line x1="${x0}" y1="${hy}" x2="${x0 + pw}" y2="${hy}"/>`;
  g += `<line x1="${vx + pw * 0.25}" y1="${hy}" x2="${vx + pw * 0.25}" y2="${y0 + ph}"/>`;
  g += `</g>`;
  // door swings
  g += `<path d="M${vx} ${hy - 40} A40 40 0 0 1 ${vx + 40} ${hy}" stroke="${GOLD}" stroke-opacity="0.4" stroke-width="1.5" fill="none"/>`;
  // dimension line
  g += `<line x1="${x0}" y1="${y0 - 22}" x2="${x0 + pw}" y2="${y0 - 22}" stroke="${GOLD}" stroke-opacity="0.55" stroke-width="1.2"/>`;
  return g;
}

/** Paint roller sweeps. */
function paint(w, h, r) {
  let g = "";
  for (let i = 0; i < 4; i++) {
    const y = h * (0.16 + i * 0.22);
    const sw = h * 0.12;
    g += `<rect x="${(w * (r() * 0.12)).toFixed(0)}" y="${y.toFixed(0)}" width="${(w * (0.55 + r() * 0.42)).toFixed(0)}" height="${sw.toFixed(0)}"
            fill="${GOLD}" fill-opacity="${(0.07 + r() * 0.14).toFixed(3)}" rx="${(sw / 2).toFixed(0)}"/>`;
  }
  return g;
}

const SCENES = {
  skyline: (w, h, r) => skyline(w, h, r) + crane(w, h, r) + frame(w, h, r),
  crane: (w, h, r) => skyline(w, h, r) + crane(w, h, r, 1.25),
  frame: (w, h, r) => skyline(w, h, r) + frame(w, h, r),
  truss: (w, h, r) => truss(w, h, r),
  circuit: (w, h, r) => circuit(w, h, r),
  pipes: (w, h, r) => pipes(w, h, r),
  brick: (w, h, r) => brick(w, h, r),
  tiles: (w, h, r) => tiles(w, h, r),
  timber: (w, h, r) => timber(w, h, r),
  steel: (w, h, r) => steel(w, h, r),
  room: (w, h, r) => room(w, h, r),
  plan: (w, h, r) => plan(w, h, r),
  paint: (w, h, r) => paint(w, h, r) + room(w, h, r),
};

function svgFor(kind, w, h, seed) {
  const r = rng(seed);
  const body = (SCENES[kind] || SCENES.skyline)(w, h, r);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${defs(r)}
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${body}
    <rect width="${w}" height="${h}" fill="url(#vign)"/>
    <rect x="0" y="${h - 5}" width="${(w * 0.22).toFixed(0)}" height="5" fill="url(#goldbar)"/>
  </svg>`;
}

/** Film grain, so the flat vector art reads with a little texture. */
async function grain(w, h) {
  const px = Buffer.alloc(w * h);
  let s = 12345;
  for (let i = 0; i < px.length; i++) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    px[i] = 118 + ((s >> 16) % 20);
  }
  return sharp(px, { raw: { width: w, height: h, channels: 1 } }).png().toBuffer();
}

async function render(dir, name, kind, w, h) {
  mkdirSync(join(OUT, dir), { recursive: true });
  const base = await sharp(Buffer.from(svgFor(kind, w, h, `${dir}/${name}`)))
    .png()
    .toBuffer();
  const noise = await grain(w, h);
  await sharp(base)
    .composite([{ input: noise, blend: "soft-light" }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(OUT, dir, `${name}.jpg`));
}


const run = async () => {
  for (const item of images) {
    const [dir, name] = item.path.split("/");
    await render(dir, name, item.scene, item.w, item.h);
  }

  writeFileSync(
    join(OUT, "README.txt"),
    [
      "ICE-PREMIUM LIMITED — site imagery",
      "",
      "These files are DESIGNED BRAND GRAPHICS, not photographs. They hold the",
      "image slots so the site is never broken, and are drawn per trade in the",
      "company palette.",
      "",
      "  npm run images     regenerate these brand graphics",
      "  npm run images:ai  overwrite them with AI photography (needs GEMINI_API_KEY)",
      "",
      "Either way these stand in for real ICE-Premium project photography, which",
      "should replace them once recovered. See the README checklist.",
      "",
    ].join("\n"),
  );

  console.log(`generated ${images.length} brand images`);
};

run();
