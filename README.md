# ICE-PREMIUM LIMITED — Website

Marketing site for ICE-PREMIUM LIMITED (RC 8682310), an engineering, construction
and maintenance company operating in Abuja, Lagos, Enugu, Asaba and Port Harcourt.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Framer Motion and
Lenis. Deploys to Cloudflare Workers via the `@opennextjs/cloudflare` adapter.

---

## ⚠️ Swap-before-launch checklist

**The site is fully functional but is not ready to be shown to the public until
these are done.** Everything below is deliberately, visibly a placeholder.

### 1. Contact details — done

All real and live, driven from **`content/site.config.json`** alone:

| Field | Value |
| --- | --- |
| Phone / WhatsApp | 0912 751 5135 |
| Email | info@icepremiumltd.com |
| Address | 382 Ransom Kuti Close, Katampe Extension, Abuja |
| Domain | icepremiumltd.com |

Two things still carry placeholders, and both hide themselves rather than
showing a broken link: **social profile URLs** and **site.twitterHandle**. Any
social URL still containing `REPLACE-ME` is stripped at config-parse time, so it
never reaches the footer or the JSON-LD `sameAs` array. Fill them in and they
appear automatically.

Confirm **opening hours** — currently assumed as Mon–Sat 8:00–18:00.

### 2. Photography

Every image in `/public/images` is a **designed brand graphic, not a
photograph** — a skyline and crane for the hero, a circuit schematic for
electrical, a truss for roofing, a perspective floor grid for tiling, and so on.
They are drawn in the company palette by `scripts/generate-brand-images.mjs`.

This is deliberate. An illustration cannot be mistaken for one of ICE-Premium's
own project photos; a piece of unrelated stock photography of someone else's
building very easily can. Until the real photography is recovered, graphics keep
the site looking intentional without implying work that isn't yours.

Replace the files, keeping the same filenames and roughly the same aspect ratios:

| Folder | Count | What it needs |
| --- | --- | --- |
| `hero/` | 8 | Wide landscape shots of trades at work. These crossfade behind the headline |
| `services/` | 12 | One per discipline, matched to that specific trade |
| `projects/` | 18 | 3 per project (main + 2 detail) |
| `blog/` | 6 | One per article |
| `before-after/` | 8 | 4 matched pairs, same angle and framing |
| `general/` | 2 | Company overview shot, and an OG fallback |

Once you have real photography, delete `scripts/generate-brand-images.mjs` and
the `images` npm script — they exist only to produce the stand-ins.

Regenerate at any time with `npm run images` (output is deterministic, so
re-running produces identical files and no git churn).

#### Want real photographs sooner?

The fastest route to genuine, high-resolution construction photography is a
**free Unsplash API key** — about two minutes to obtain, no card required, and
the Unsplash licence permits commercial use with no attribution obligation.

1. Register an app at
   [unsplash.com/developers](https://unsplash.com/developers)
2. Put the access key in `.env.local` as `UNSPLASH_ACCESS_KEY`
3. Say the word and the image pipeline can be pointed at it

Two free sources were evaluated and rejected:

- **Openverse** delivers images capped around 1024px — too small for a
  full-bleed hero — and returned a single relevant public-domain result for
  "construction worker".
- **Wikimedia Commons** has true high-resolution originals but almost nothing
  relevant; queries yielded between zero and three usable images each, in
  mismatched styles, mostly under CC BY-SA (which carries attribution and
  share-alike obligations).

Keyword-fetching also carries real brand risk: a test search for
"Lagos Nigeria building" returned an image titled *"Nigerian scam"*. Nothing is
worth putting on a client's site without a human looking at it first.

### 3. Testimonials

`content/testimonials.json` contains **sample copy, not real client quotes.**
While any entry has `"placeholder": true`, a visible amber notice appears above
the testimonials on both the home page and `/testimonials`.

Replace each quote with a real, attributable testimonial (with the client's
written permission), then set that entry's `placeholder` to `false`. The notice
disappears automatically once none are left. If you have no testimonials yet,
delete the entries — an empty section is more honest than a fabricated one.

### 4. Verify the email domain in Resend

**The contact form works and delivers today**, but to the Resend account owner's
address (`icepremiumlimited@gmail.com`), not to `info@icepremiumltd.com`.

That is a Resend restriction, not a bug: until a domain is verified, the test
sender `onboarding@resend.dev` may only deliver to the account owner. Sending
anywhere else returns `validation_error` — the enquiry is still accepted and the
user still sees success, but the email never arrives. Delivery is therefore
pointed at the address that actually works.

To route enquiries to `info@icepremiumltd.com`:

1. Add and verify `icepremiumltd.com` at
   [resend.com/domains](https://resend.com/domains) (add the DNS records it
   gives you — if the domain is on Cloudflare, that is a two-minute job)
2. Set `CONTACT_FROM_EMAIL=noreply@icepremiumltd.com`
3. Set `CONTACT_TO_EMAIL=info@icepremiumltd.com`
4. Update both as Cloudflare secrets (`npx wrangler secret put …`)

Until then, leave `CONTACT_TO_EMAIL` as the Gmail address so enquiries are not
silently lost.

### 5. Legal pages

`/privacy` and `/terms` are good-faith general templates, **not legal advice**,
and both display a notice saying so. Have a qualified lawyer review them against
the Nigeria Data Protection Act and your actual practices, then remove the
`PlaceholderNotice` block from `app/privacy/page.tsx` and `app/terms/page.tsx`.

---

## About the imagery

**No photograph on this site is a photograph of an ICE-Premium project.** The
client's original project photography was lost, so every image slot is filled by
a stand-in that represents a discipline generically.

There are two generators, both writing to the same paths in `/public/images`:

Imagery comes from two sources, split by whether the shot contains a person:

| Command | Fills | Source | Needs a key |
| --- | --- | --- | --- |
| `npm run images:photos` | The 7 slots showing people | Real photographs from Pexels | `PEXELS_API_KEY` (free) |
| `npm run images:gen` | The 33 people-free slots | Pollinations.ai (FLUX) | **None** |
| `npm run images` | Everything, as designed brand graphics | Local, offline | None |

**Why the split.** Text-to-image models are reliable on buildings, interiors,
materials and site views, and unreliable on people. A test generation of an
electrician produced a figure with four hands and an "electrical panel" made of
texture mush. So every shot with a person in it is a real photograph, and
generation is used only where it cannot get anatomy wrong.

Every people slot is cast with African professionals, matching the company and
its clients. Each candidate set was reviewed by eye before selection; frames
rejected along the way included COVID-era masks (which date the site), solar
farm shots (not our trades), and the South Asian brickfield workers that
masonry queries kept returning.

`hero-06` is deliberately a finished interior rather than a tradesperson: no
search reliably returned African masons or decorators, and a wrong-continent
face on a Nigerian contractor's site is worse than no face at all.

Photographer credits are recorded in `public/images/PHOTO-CREDITS.txt`. The
Pexels licence does not require attribution, but crediting people whose work
you are using is decent practice.

> **A note on Gemini**, in case it comes up: image generation is not on its free
> tier. A free key returns HTTP 429 with `limit: 0` for every image model — no
> allowance at all rather than an exhausted one, so retrying never clears it.
> `npm run images:ai` exists and works, but needs billing enabled on the Google
> Cloud project. Pollinations needs no key and was used instead.

The brand graphics ship by default so the site is never broken waiting on a key.
Running the AI generator overwrites them in place — same filenames, same aspect
ratios — so no component, MDX file or JSON entry needs touching.

**The rule that matters:** never let copy, captions, alt text or a sales
conversation describe any of these images as a specific completed ICE-Premium
job. They show what the work looks like, not what *we did at 14 Adeola Odeku*.
Alt text throughout is written to describe the activity ("Roofer rolling out
waterproofing membrane"), never to claim a particular project. If someone asks
"which job is this?", the honest answer must always be available — and it is
"none, these are stand-ins until our own photographs are back".

Every image-consuming component carries a comment saying the same thing, so the
next person to edit one sees it before they write a caption.

Replace `/public/images` with the client's real photography when it is
recovered, then delete both generator scripts and their npm scripts.

---

## Publishing blog posts (and editing the site) without code

The owner edits the site at **https://icepremiumltd.com/admin** — a browser
editor covering blog posts, projects, testimonials, FAQs and contact details.

It is [Decap CMS](https://decapcms.org): git-based, so every save becomes a
commit to this repo that triggers a rebuild. No database, no monthly fee, and
every change is version-controlled and reversible.

### One-time setup (about three minutes)

The editor needs permission to commit on the owner's behalf. GitHub will not
issue that to a static page, so the site hosts its own OAuth handler at
`/api/cms/auth`. Until it is configured that route returns 503 and sign-in is
blocked — which is why it is safe to leave live in the meantime.

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
2. Fill in:
   - **Application name**: `ICE-Premium CMS`
   - **Homepage URL**: `https://icepremiumltd.com`
   - **Authorization callback URL**: `https://icepremiumltd.com/api/cms/callback`
3. Register, then **Generate a new client secret**
4. Add both to Cloudflare:

   ```bash
   npx wrangler secret put GITHUB_OAUTH_CLIENT_ID
   ```

   ```bash
   npx wrangler secret put GITHUB_OAUTH_CLIENT_SECRET
   ```

5. Redeploy with `npm run deploy`

Anyone with write access to the repository can then sign in at `/admin`.

### Writing a post

Open `/admin`, choose **Blog posts → New Blog post**, fill in the fields and
press **Publish**. The post appears at `/blog/your-slug` once the rebuild
finishes, and the three most recent surface on the home page automatically.
Cover images uploaded through the editor are saved to `/public/images/blog`.

`/admin` is excluded from `robots.txt`, so search engines never index it.

---

## Editing content — the file-based workflow

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

### Rate limiting

Already configured and verified in production: 5 contact submissions per IP per
10 minutes, returning 429 after that.

It runs on a Durable Object (, called from ) rather
than the two more obvious options, both of which were tried first:

- **In-memory counters** do not survive across isolates and would silently do
  nothing in production.
- **Cloudflare's native  binding** binds correctly but never denied
  a request on this account — confirmed by dropping it to 2 requests per 10
  seconds and still getting six 200s.

The Durable Object holds real per-IP state and fails open, so a limiter fault
can never block a genuine enquiry.

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
