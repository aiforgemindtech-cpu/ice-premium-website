# ICE-PREMIUM LIMITED — Website

Marketing site for ICE-PREMIUM LIMITED (RC 8682310), an engineering, construction
and maintenance company operating in Abuja, Lagos, Enugu, Asaba and Port Harcourt.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion and
Lenis. Deploys to Cloudflare Workers via the `@opennextjs/cloudflare` adapter.

---

## ⚠️ Swap-before-launch checklist

**The site is fully functional but is not ready to be shown to the public until
these are done.** Everything below is deliberately, visibly a placeholder.

### 1. Contact details — one file

Open **`content/site.config.json`**. Every value with a `_COMMENT_*` line above it
saying `REPLACE BEFORE LAUNCH` is fake. Replace:

| Field | Current placeholder | What it must become |
| --- | --- | --- |
| `contact.phone` | `+234 000 000 0000` | The real number, formatted for display |
| `contact.phoneHref` | `+2340000000000` | Same number, E.164, no spaces — used by `tel:` links |
| `contact.whatsapp` | `2340000000000` | Same number, digits only, no `+` — used by the WhatsApp link |
| `contact.email` | `hello@REPLACE-ME.com` | The real inbox |
| `contact.addressLine1/2`, `contact.city` | Placeholder address | The registered office |
| `contact.hours` | Mon–Sat 8–6 | Confirm the real hours |
| `socials.*` | `REPLACE-ME` URLs | Real profile URLs. **Delete any row you don't use** and it disappears from the footer automatically |
| `site.url` | `.workers.dev` URL | The real production domain, once bought |
| `site.twitterHandle` | `@REPLACE-ME` | Real handle, or delete |

Change it once here and it updates on every page — header, footer, hero, contact
page, JSON-LD structured data, and the WhatsApp button. **Contact details are not
hardcoded anywhere else in the codebase.**

### 2. Photography

Every image in `/public/images` is a **generated placeholder graphic, not a
photograph**. Each one carries a visible `PLACEHOLDER — NOT A REAL PROJECT PHOTO`
label so it cannot reach production unnoticed.

Replace the files, keeping the same filenames and roughly the same aspect ratios:

| Folder | Count | What it needs |
| --- | --- | --- |
| `hero/` | 8 | Wide landscape shots of trades at work. These crossfade behind the headline |
| `services/` | 12 | One per discipline, matched to that specific trade |
| `projects/` | 18 | 3 per project (main + 2 detail) |
| `blog/` | 6 | One per article |
| `before-after/` | 8 | 4 matched pairs, same angle and framing |
| `general/` | 2 | Company overview shot, and an OG fallback |

Once you have real photography, delete `scripts/generate-placeholder-images.mjs`
and the `images` npm script — they exist only to produce the stand-ins.

> **On stock photography:** the original brief called for Unsplash API imagery.
> That was not used, because live Unsplash photos are stock images of unrelated
> people and sites — placing them beside "our projects" copy risks implying they
> depict ICE-Premium's own work. Neutral, obviously-fake placeholders make the gap
> impossible to miss. If you want Unsplash as an interim step, add
> `UNSPLASH_ACCESS_KEY` to `.env.local` and fetch at build time in the images
> script — but label the results as stock in the UI.

### 3. Testimonials

`content/testimonials.json` contains **sample copy, not real client quotes.**
While any entry has `"placeholder": true`, a visible amber notice appears above
the testimonials on both the home page and `/testimonials`.

Replace each quote with a real, attributable testimonial (with the client's
written permission), then set that entry's `placeholder` to `false`. The notice
disappears automatically once none are left. If you have no testimonials yet,
delete the entries — an empty section is more honest than a fabricated one.

### 4. Legal pages

`/privacy` and `/terms` are good-faith general templates, **not legal advice**,
and both display a notice saying so. Have a qualified lawyer review them against
the Nigeria Data Protection Act and your actual practices, then remove the
`PlaceholderNotice` block from `app/privacy/page.tsx` and `app/terms/page.tsx`.

---

## Editing content — the 60-second workflow

No code knowledge needed. Every task below is one file.

### Change the phone number (or any contact detail)

Open `content/site.config.json`, edit the value, save. Done — it updates
everywhere on the site.

### Add a blog post

Create one new file in `content/blog/`, named after the URL you want
(`why-gutters-matter.mdx` becomes `/blog/why-gutters-matter`).

Copy this structure:

```mdx
---
title: "Your headline here"
slug: "why-gutters-matter"
category: "Roofing"
date: "2026-08-01"
excerpt: "One or two sentences shown on the blog index and in search results."
readingTime: 4
image: "/images/blog/why-gutters-matter.jpg"
---

Your opening paragraph.

## A subheading

More text. **Bold** works, and so do bullet lists:

- First point
- Second point
```

Drop a matching image into `public/images/blog/`. The post appears on `/blog`
automatically, sorted by date, and the three most recent show on the home page.

### Add a project

Open `content/projects.json` and copy an existing entry inside the `[ ]`. Fill in
the fields — `challenge`, `solution` and `outcome` are what make the page worth
reading. Set `"featured": true` to surface it on the home page mosaic, and
`"size": "large"` to make it the big tile.

Add images to `public/images/projects/` matching the paths you referenced.

### Add or edit a service

The 12 services live in `content/services/`, one `.mdx` file each. The frontmatter
block at the top drives the benefits grid, the spec sheet, the process timeline
and the FAQs. The text below it is the page body.

`icon` must be one of the names listed in `components/shared/service-icon.tsx` —
using an unknown one is caught at build time rather than showing a blank tile.

### Edit the FAQs

`content/faqs.json`. These appear on the home page, `/contact` and
`/testimonials`, and are published as `FAQPage` structured data for search
engines.

### Optional: a visual editor

To let a non-technical editor make these changes through a browser UI instead of
files, add [Decap CMS](https://decapcms.org) — it is free, git-based, and commits
straight to this repo, so it needs no database or paid service. It was left out
of this build to keep the dependency surface small; the JSON and MDX files above
are already the source of truth it would edit.

---

## Running costs

| Item | Provider | Cost |
| --- | --- | --- |
| Domain (`.com`) | Cloudflare Registrar (at-cost, no markup) | **$10–16/yr** |
| Hosting + serverless functions | Cloudflare Workers free tier | **$0** |
| Contact form email | Resend free tier (3,000 emails/month) | **$0** |
| Analytics | Cloudflare Web Analytics (no script, no cookie banner) | **$0** |
| Live chat | WhatsApp deep link | **$0** |
| SSL certificate | Cloudflare (automatic) | **$0** |
| **Total** | | **$10–16/year** |

That sits under the $20/year target with headroom against the $30 ceiling.

**What would change it:** the free Workers tier covers 100,000 requests/day — far
beyond what a regional contractor's site will use. Resend's free tier covers 3,000
emails/month. If either is ever exceeded, the next tiers are $5/month (Workers
Paid) and $20/month (Resend Pro), but neither is likely to be needed.

**Upgrade path for live chat:** the WhatsApp button is free and needs no script.
If you later want in-page chat with agent handoff, [Tawk.to](https://www.tawk.to)
is free and drops in as a single script tag in `app/layout.tsx`. It does add a
third-party cookie, which would then require a consent banner.

---

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Copy `.env.example` to `.env.local` and fill in the keys you have. The site runs
fine without any of them — the contact form still works and still shows success,
it just logs the enquiry server-side instead of emailing it.

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (compiles content first) |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run check` | Lint + typecheck + build, in that order |
| `npm run content` | Recompile `/content` into the bundled JSON |
| `npm run images` | Regenerate the placeholder images |
| `npm run preview` | Build and preview on the real Cloudflare runtime locally |
| `npm run deploy` | Build and deploy to Cloudflare |

### How content loading works

Content is authored as MDX and JSON in `/content`, then compiled by
`scripts/build-content.mjs` into `content/.generated/content.json`, which is
imported and bundled.

This indirection exists for a reason: the site runs on Cloudflare Workers, which
has **no filesystem at runtime**. Reading MDX with `fs` inside a server component
works locally and fails in production. Compiling at build time avoids that class
of bug entirely, and keeps the deployed worker small.

`npm run content` runs automatically before `dev` and `build`, so you rarely call
it directly.

---

## Deployment

### First-time setup

1. **Authenticate wrangler**

   ```bash
   npx wrangler login
   ```

   This opens a browser for OAuth. If the callback times out (common on headless
   or remote machines), use an API token instead: create one at
   [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)
   using the **Edit Cloudflare Workers** template, then set it in your shell:

   ```bash
   export CLOUDFLARE_API_TOKEN=your_token_here
   ```

2. **Deploy**

   ```bash
   npm run deploy
   ```

   This runs the OpenNext build and pushes to Cloudflare. The first deploy prints
   the live `*.workers.dev` URL.

3. **Add production secrets**

   ```bash
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put CONTACT_TO_EMAIL
   npx wrangler secret put CONTACT_FROM_EMAIL
   ```

   Secrets are encrypted at rest and never appear in the repo.

### Alternative: connect the GitHub repo

In the Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
repository**, select this repo and set:

- **Build command:** `npm run build && npx opennextjs-cloudflare build`
- **Deploy command:** `npx opennextjs-cloudflare deploy`
- **Environment variables:** add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
  `CONTACT_FROM_EMAIL`

Every push to `main` then deploys automatically.

### Custom domain

Buy the domain through **Cloudflare Registrar** (at-cost pricing, no markup, and
DNS is already there). Then in the Worker's settings → **Domains & Routes** → add
your custom domain. SSL is automatic.

Afterwards, update `site.url` in `content/site.config.json` so canonical URLs, the
sitemap and Open Graph tags point at the real domain.

### Rate limiting — do this after the first deploy

The contact endpoint has **no application-level rate limiting, deliberately.**
In-memory counters do not persist across serverless invocations and would silently
do nothing in production.

Configure it at the edge instead, where it actually works. Cloudflare dashboard →
your domain → **Security** → **WAF** → **Rate limiting rules** → create:

- **If** URI Path equals `/api/contact` **and** Request Method equals `POST`
- **Then** Block for 1 hour
- **When** rate exceeds **5 requests per 10 minutes** from the same IP

The free plan includes one rate limiting rule, which is all this needs.

### Security headers

`public/_headers` sets HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy` and `Cross-Origin-Opener-Policy` on every
route, plus long-lived immutable caching for hashed build assets. Cloudflare
applies it automatically — no configuration needed.

### Analytics

Cloudflare Web Analytics is enabled from the dashboard (**Analytics** → **Web
Analytics** → add your hostname). It is server-side, sets no cookies and needs no
script tag, so the site requires no cookie consent banner.

---

## Architecture notes

```
app/                  Routes (App Router). One folder per page.
  api/contact/        Contact form handler → Resend
  api/og/             Dynamic Open Graph image generation
components/
  hero/               The six-layer home page hero
  home/               The 13 home page sections
  layout/             Header, footer, smooth scroll, scroll progress
  shared/             Reusable pieces (cards, headings, compare slider)
  seo/                JSON-LD structured data
  ui/                 Primitives (button, accordion, form fields)
content/              All editable content. See the workflow above.
lib/content.ts        Typed, zod-validated loaders. Single import point.
scripts/              Build-time content and image generation
```

### Deliberate decisions worth knowing

**Cloudflare adapter, not `output: 'export'`.** Static export cannot run the
contact form route handler or the dynamic OG image route. The adapter gives the
full Next.js feature set on the free tier.

**No Three.js, GSAP or WebGL.** The hero's depth comes from four layered 2D
techniques — a Ken Burns photo crossfade, an SVG blueprint drawn in via
`pathLength`, a particle canvas, and scroll-tied parallax. This looks comparable
and costs a fraction of the bytes and main-thread time.

**Particles are desktop-only.** The canvas is the most expensive hero layer and is
skipped entirely below 768px, where the LCP budget is tightest. It also stops under
`prefers-reduced-motion`, reduced-data mode, and when the tab is hidden.

**Hand-rolled UI primitives in the shadcn idiom.** `shadcn init` rewrites
`globals.css` with its own neutral theme, which would have clobbered the gold and
navy design system. The components use the same patterns (Radix + CVA + `cn`) and
can be swapped for CLI-generated ones later.

**MDX compiled at build time, not runtime.** See "How content loading works" above.

### Accessibility

WCAG 2.1 AA. Contrast on the navy background: body text 8.3:1, muted text 6.2:1,
gold 9.2:1, white 19.3:1 — all clear of the 4.5:1 requirement, headings clear of
7:1.

`muted` is `rgba(255,255,255,0.55)` rather than the `0.45` in the original brief,
because 0.45 measures 4.51:1 — passing by 0.01, and failing once it sits on the
semi-transparent surface variants.

Every animation has a `prefers-reduced-motion` fallback that shows the static end
state. All interactive targets are at least 44px. Keyboard navigation is complete,
including a skip link and an arrow-key-operable before/after slider.

### Known issues

`npm audit` reports advisories in the dev toolchain (`brace-expansion`, `postcss`,
`sharp`/libvips), all reached through `eslint` and `next` themselves. They affect
build tooling, not the deployed worker. `npm audit fix --force` downgrades Next.js
and breaks the build, so they are left as-is pending upstream releases.

---

© ICE-PREMIUM LIMITED · RC 8682310
