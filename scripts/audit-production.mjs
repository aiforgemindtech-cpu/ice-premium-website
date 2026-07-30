/**
 * Full production audit against the live site.
 *
 * Crawls every route the sitemap declares plus the known extras, and checks
 * each one for the things that actually break a client site: dead links,
 * broken images, missing or duplicated metadata, malformed structured data,
 * absent security headers, oversized payloads and accessibility basics.
 *
 * Usage: node scripts/audit-production.mjs [baseUrl]
 */
const BASE = process.argv[2] || "https://icepremiumltd.com";
const UA = "ice-premium-audit/1.0";

const results = { pass: [], warn: [], fail: [] };
const ok = (m) => results.pass.push(m);
const warn = (m) => results.warn.push(m);
const fail = (m) => results.fail.push(m);

const get = async (path, init = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(45000),
    ...init,
  });
  return res;
};

const REQUIRED_HEADERS = [
  "strict-transport-security",
  "x-content-type-options",
  "x-frame-options",
  "referrer-policy",
  "permissions-policy",
  "cross-origin-opener-policy",
];

/** Pull every URL out of the sitemap so the crawl matches what search engines see. */
async function routesFromSitemap() {
  const xml = await (await get("/sitemap.xml")).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].replace(BASE, ""))
    .map((p) => p || "/");
}

function extract(html) {
  const one = (re) => (html.match(re) || [])[1];
  return {
    title: one(/<title>([^<]*)<\/title>/),
    description: one(/name="description" content="([^"]*)"/),
    canonical: one(/rel="canonical" href="([^"]*)"/),
    ogTitle: one(/property="og:title" content="([^"]*)"/),
    ogImage: one(/property="og:image" content="([^"]*)"/),
    h1Count: (html.match(/<h1[\s>]/g) || []).length,
    jsonLd: [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
      (m) => m[1],
    ),
    imgs: [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]),
    links: [...html.matchAll(/href="(\/[^"#?]*)"/g)].map((m) => m[1]),
    placeholders: /REPLACE-ME|000 000 0000|lorem ipsum/i.test(html),
    langAttr: /<html[^>]+lang="[a-z-]+"/i.test(html),
    skipLink: /skip-link|Skip to main/i.test(html),
  };
}

const run = async () => {
  console.log(`Auditing ${BASE}\n`);

  // ── 1. Routes ───────────────────────────────────────────────────────────
  const sitemapRoutes = await routesFromSitemap();
  const extras = ["/robots.txt", "/sitemap.xml", "/llms.txt", "/api/og", "/manifest.webmanifest"];
  const allRoutes = [...new Set([...sitemapRoutes, ...extras])];
  console.log(`Sitemap declares ${sitemapRoutes.length} routes; checking ${allRoutes.length} total\n`);

  const seenTitles = new Map();
  const seenDescriptions = new Map();
  const pages = [];

  for (const route of allRoutes) {
    let res;
    try {
      res = await get(route);
    } catch (e) {
      fail(`${route} — request failed: ${e.message}`);
      continue;
    }

    if (res.status !== 200) {
      fail(`${route} — HTTP ${res.status}`);
      continue;
    }

    // Security headers on every response, not just the homepage.
    const missing = REQUIRED_HEADERS.filter((h) => !res.headers.get(h));
    if (missing.length) fail(`${route} — missing headers: ${missing.join(", ")}`);

    const type = res.headers.get("content-type") || "";
    if (!type.includes("text/html")) {
      ok(`${route} — ${res.status} ${type.split(";")[0]}`);
      continue;
    }

    const html = await res.text();
    const meta = extract(html);
    pages.push({ route, meta, bytes: html.length });

    // ── Metadata ──
    if (!meta.title) fail(`${route} — no <title>`);
    else if (meta.title.length > 70) warn(`${route} — title ${meta.title.length} chars (>70)`);
    if (!meta.description) fail(`${route} — no meta description`);
    else if (meta.description.length > 165)
      warn(`${route} — description ${meta.description.length} chars (>165)`);
    if (!meta.canonical) fail(`${route} — no canonical`);
    if (!meta.ogTitle) warn(`${route} — no og:title`);
    if (!meta.ogImage) warn(`${route} — no og:image`);

    if (meta.title) {
      if (seenTitles.has(meta.title))
        fail(`${route} — duplicate title, same as ${seenTitles.get(meta.title)}`);
      else seenTitles.set(meta.title, route);
    }
    if (meta.description) {
      if (seenDescriptions.has(meta.description))
        warn(`${route} — duplicate description, same as ${seenDescriptions.get(meta.description)}`);
      else seenDescriptions.set(meta.description, route);
    }

    // ── Accessibility / structure ──
    if (meta.h1Count !== 1) fail(`${route} — ${meta.h1Count} <h1> elements (expected 1)`);
    if (!meta.langAttr) fail(`${route} — <html> missing lang attribute`);
    if (!meta.skipLink) warn(`${route} — no skip link`);

    const noAlt = meta.imgs.filter((t) => !/\balt=/.test(t));
    if (noAlt.length) fail(`${route} — ${noAlt.length} <img> without alt`);

    // ── Structured data ──
    for (const [i, block] of meta.jsonLd.entries()) {
      try {
        JSON.parse(block);
      } catch {
        fail(`${route} — JSON-LD block ${i + 1} is not valid JSON`);
      }
    }

    // ── Content hygiene ──
    if (meta.placeholders) fail(`${route} — placeholder text still rendered`);

    // ── Weight ──
    if (html.length > 400_000) warn(`${route} — HTML ${Math.round(html.length / 1024)}KB`);

    ok(`${route} — 200, ${meta.jsonLd.length} JSON-LD, ${meta.imgs.length} imgs`);
  }

  // ── 2. Internal links resolve ───────────────────────────────────────────
  const linkTargets = new Set();
  for (const p of pages) for (const l of p.meta.links) linkTargets.add(l);
  console.log(`\nChecking ${linkTargets.size} distinct internal link targets…`);

  for (const target of linkTargets) {
    if (allRoutes.includes(target)) continue;
    try {
      const res = await get(target, { method: "HEAD" });
      if (res.status >= 400) fail(`broken internal link: ${target} → ${res.status}`);
    } catch {
      fail(`broken internal link: ${target} → request failed`);
    }
  }

  // ── 3. Every referenced image loads ─────────────────────────────────────
  const imgSrcs = new Set();
  for (const p of pages) {
    for (const tag of p.meta.imgs) {
      const src = (tag.match(/src="([^"]+)"/) || [])[1];
      if (!src) continue;
      const decoded = src.replace(/&amp;/g, "&");
      imgSrcs.add(decoded.startsWith("http") ? decoded.replace(BASE, "") : decoded);
    }
  }
  console.log(`Checking ${imgSrcs.size} distinct image sources…`);

  for (const src of imgSrcs) {
    try {
      const res = await get(src);
      if (res.status !== 200) {
        fail(`image ${res.status}: ${src.slice(0, 70)}`);
        continue;
      }
      const len = Number(res.headers.get("content-length") || 0);
      if (len > 500_000)
        warn(`image ${Math.round(len / 1024)}KB: ${src.slice(0, 60)}`);
    } catch {
      fail(`image request failed: ${src.slice(0, 70)}`);
    }
  }

  // ── 4. Contact endpoint behaviour ───────────────────────────────────────
  console.log("Checking contact endpoint…");
  const post = (body) =>
    get("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "User-Agent": UA },
      body: JSON.stringify(body),
    });

  const invalid = await post({ name: "A", email: "bad", message: "x" });
  if (invalid.status === 400) ok("contact — rejects invalid input with 400");
  else fail(`contact — invalid input returned ${invalid.status}, expected 400`);

  const honeypot = await post({
    name: "Bot",
    email: "b@example.com",
    service: "Plumbing",
    city: "Abuja",
    message: "Honeypot submission with sufficient length to pass validation.",
    company: "spam",
  });
  const honeypotBody = await honeypot.json().catch(() => ({}));
  if (honeypot.status === 200 && honeypotBody.ok)
    ok("contact — honeypot accepted silently, revealing nothing to the bot");
  else fail(`contact — honeypot returned ${honeypot.status}, should accept silently`);

  // ── 5. Report ───────────────────────────────────────────────────────────
  console.log(`\n${"=".repeat(60)}`);
  console.log(`PASS ${results.pass.length}   WARN ${results.warn.length}   FAIL ${results.fail.length}`);
  console.log("=".repeat(60));

  if (results.warn.length) {
    console.log("\nWARNINGS");
    for (const w of results.warn) console.log(`  · ${w}`);
  }
  if (results.fail.length) {
    console.log("\nFAILURES");
    for (const f of results.fail) console.log(`  ✗ ${f}`);
    process.exitCode = 1;
  } else {
    console.log("\nNo failures.");
  }
};

run().catch((e) => {
  console.error("audit crashed:", e.message);
  process.exit(1);
});
