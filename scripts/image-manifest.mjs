/**
 * Single source of truth for every image the site uses.
 *
 * Two generators read this file and write to the same paths:
 *   - generate-brand-images.mjs  → designed brand graphics (no API key needed)
 *   - generate-ai-images.mjs     → AI photography (needs GEMINI_API_KEY)
 *
 * So the site is never broken waiting on a key: the brand graphics hold the
 * slots, and running the AI generator overwrites them in place with no
 * rewiring anywhere.
 *
 * `alt` lives here too, so the description of an image sits beside the brief
 * that produced it rather than drifting in a component somewhere.
 */

/** Prefixed onto every AI generation prompt to keep one visual identity. */
export const STYLE_PREFIX =
  "Documentary-style editorial photography, natural on-site lighting, shallow depth of field, " +
  "warm-neutral colour grade with subtle navy-and-gold cinematic tone, shot on a full-frame camera " +
  "at 35mm-50mm, candid and unposed, high detail, no text, no watermark, no logos, " +
  "photorealistic — not illustration, not 3D render. ";

/** Appended to enforce the casting brief consistently across the whole set. */
export const CASTING =
  " Nigerian and West African engineering and construction professionals, actively working, " +
  "genuine unposed expressions, appropriate safety gear.";

export const HERO_SIZE = { w: 2400, h: 1350 };
export const SERVICE_SIZE = { w: 1920, h: 1080 };
export const CARD_SIZE = { w: 1600, h: 1200 };
export const BLOG_SIZE = { w: 1600, h: 900 };

export const images = [
  // ── Hero slideshow ──────────────────────────────────────────────────────
  {
    path: "hero/hero-01",
    ...HERO_SIZE,
    scene: "plan",
    prompt:
      "A civil engineer in a hard hat studying rolled architectural blueprints spread across a table on an active construction site, steel frame and scaffolding behind, early morning light.",
    alt: "Engineer studying architectural drawings on an active construction site",
  },
  {
    path: "hero/hero-02",
    ...HERO_SIZE,
    scene: "circuit",
    prompt:
      "An electrician wiring a distribution board inside a building under construction, cable ends fanned out, head torch and insulated tools, concentrating closely on the terminations.",
    alt: "Electrician terminating cables inside a distribution board",
  },
  {
    path: "hero/hero-03",
    ...HERO_SIZE,
    scene: "truss",
    prompt:
      "A roofer kneeling on a low-pitch roof rolling out waterproofing membrane, mid-motion, torch and seam roller beside them, bright overcast sky.",
    alt: "Roofer rolling out waterproofing membrane across a flat roof",
  },
  {
    path: "hero/hero-04",
    ...HERO_SIZE,
    scene: "timber",
    prompt:
      "A carpenter planing a length of hardwood at a workshop bench, fine sawdust hanging in a shaft of window light, hand tools and offcuts around the bench.",
    alt: "Carpenter planing hardwood at a workshop bench",
  },
  {
    path: "hero/hero-05",
    ...HERO_SIZE,
    scene: "steel",
    prompt:
      "A metal fabricator MIG-welding a steel balustrade section in a fabrication shop, full welding helmet and gloves, bright arc and sparks, dark workshop interior.",
    alt: "Fabricator welding a steel balustrade section in a workshop",
  },
  {
    path: "hero/hero-06",
    ...HERO_SIZE,
    scene: "room",
    prompt:
      "An interior designer laying out tile, paint and timber samples on a trestle table in a half-renovated room, bare plaster walls, tall window light.",
    alt: "Interior designer comparing material samples in a half-renovated room",
  },
  {
    path: "hero/hero-07",
    ...HERO_SIZE,
    scene: "frame",
    prompt:
      "Four tradespeople from different disciplines standing together on a construction site reviewing a drawing on a tablet, hard hats and hi-vis, mid-conversation.",
    alt: "Four tradespeople reviewing a drawing together on site",
  },
  {
    path: "hero/hero-08",
    ...HERO_SIZE,
    scene: "skyline",
    prompt:
      "The exterior of a newly completed contemporary low-rise commercial building at golden hour, clean render and glazing, landscaping in front, warm low sun.",
    alt: "Newly completed contemporary commercial building at golden hour",
  },

  // ── Service detail heroes ───────────────────────────────────────────────
  {
    path: "services/renovation-remodeling",
    ...SERVICE_SIZE,
    scene: "frame",
    prompt:
      "A room mid-renovation with a stud partition part-built, dust sheeting, and a builder setting a timber stud with a spirit level.",
    alt: "Builder setting a timber stud partition during a renovation",
  },
  {
    path: "services/electrical-installations",
    ...SERVICE_SIZE,
    scene: "circuit",
    prompt:
      "Close view of an electrician testing circuits at a newly installed consumer unit with a multifunction tester, neat cable dressing.",
    alt: "Electrician testing circuits at a newly installed consumer unit",
  },
  {
    path: "services/plumbing-services",
    ...SERVICE_SIZE,
    scene: "pipes",
    prompt:
      "A plumber press-fitting copper pipework in a plant room, pipe runs and isolation valves visible, tools laid out on a cloth.",
    alt: "Plumber press-fitting copper pipework in a plant room",
  },
  {
    path: "services/painting-finishing",
    ...SERVICE_SIZE,
    scene: "paint",
    prompt:
      "A decorator cutting in a clean edge along a ceiling line with a brush, masked skirting and dust sheets, soft daylight.",
    alt: "Decorator cutting in a clean edge along a ceiling line",
  },
  {
    path: "services/roofing-waterproofing",
    ...SERVICE_SIZE,
    scene: "truss",
    prompt:
      "Roofers fitting interlocking roof tiles along a batten line on a pitched roof, felt and battens exposed below, clear sky.",
    alt: "Roofers fitting interlocking tiles along a batten line",
  },
  {
    path: "services/ceiling-installation",
    ...SERVICE_SIZE,
    scene: "room",
    prompt:
      "A ceiling fixer installing a suspended grid ceiling, laying a tile into the T-bar frame from a platform, services visible in the void above.",
    alt: "Ceiling fixer laying a tile into a suspended grid ceiling",
  },
  {
    path: "services/ceiling-design",
    ...SERVICE_SIZE,
    scene: "plan",
    prompt:
      "A finished coffered ceiling with a recessed perimeter and concealed cove lighting in a contemporary reception space, warm glow.",
    alt: "Finished coffered ceiling with concealed cove lighting",
  },
  {
    path: "services/tiling-flooring",
    ...SERVICE_SIZE,
    scene: "tiles",
    prompt:
      "A tiler bedding a large-format porcelain tile onto a notched adhesive bed, levelling clips and spacers in use, kneeling on a screeded floor.",
    alt: "Tiler bedding a large-format porcelain tile onto notched adhesive",
  },
  {
    path: "services/carpentry-woodworking",
    ...SERVICE_SIZE,
    scene: "timber",
    prompt:
      "A joiner dry-fitting a bespoke cabinet carcass in a workshop, clamps holding the joint, shavings on the bench.",
    alt: "Joiner dry-fitting a bespoke cabinet carcass in a workshop",
  },
  {
    path: "services/steel-metal-fabrication",
    ...SERVICE_SIZE,
    scene: "steel",
    prompt:
      "A fabricator grinding a weld smooth on a steel gate frame in a workshop, sparks arcing, gate laid flat on trestles.",
    alt: "Fabricator grinding a weld smooth on a steel gate frame",
  },
  {
    path: "services/facility-maintenance",
    ...SERVICE_SIZE,
    scene: "pipes",
    prompt:
      "A maintenance engineer checking readings against a clipboard in a building plant room, pumps and pipework behind, service tags visible.",
    alt: "Maintenance engineer recording readings in a building plant room",
  },
  {
    path: "services/interior-design",
    ...SERVICE_SIZE,
    scene: "room",
    prompt:
      "A calm finished contemporary living space with layered lighting, warm timber and stone finishes, styled but lived-in, late afternoon light.",
    alt: "Finished contemporary living space with layered lighting",
  },

  // ── Project showcase ────────────────────────────────────────────────────
  {
    path: "projects/cbd-office-refit",
    ...CARD_SIZE,
    scene: "room",
    prompt:
      "A completed open-plan office fit-out, acoustic ceiling raft, glazed meeting room, desks in place, empty and clean at end of handover.",
    alt: "Completed open-plan office fit-out at handover",
  },
  {
    path: "projects/lekki-residence-rewire",
    ...CARD_SIZE,
    scene: "circuit",
    prompt:
      "A renovated residential interior after a full rewire, new sockets and switch plates, freshly decorated walls, warm evening lamp light.",
    alt: "Renovated residential interior following a full rewire",
  },
  {
    path: "projects/enugu-retail-fitout",
    ...CARD_SIZE,
    scene: "plan",
    prompt:
      "A finished retail interior with a designed ceiling and track lighting scheme, display shelving, polished floor.",
    alt: "Finished retail interior with a designed ceiling and lighting scheme",
  },
  {
    path: "projects/asaba-roof-replacement",
    ...CARD_SIZE,
    scene: "truss",
    prompt:
      "A building with a newly completed roof covering seen from ground level, clean ridge and verge lines, new rainwater goods, bright sky.",
    alt: "Building with newly completed roof covering and rainwater goods",
  },
  {
    path: "projects/ph-facility-maintenance",
    ...CARD_SIZE,
    scene: "frame",
    prompt:
      "The exterior of a well-maintained commercial facility, clean render, tidy service yard, mature landscaping, overcast even light.",
    alt: "Exterior of a well-maintained commercial facility",
  },
  {
    path: "projects/abuja-steel-balustrade",
    ...CARD_SIZE,
    scene: "steel",
    prompt:
      "A finished powder-coated steel gate and railing installation at a property entrance, crisp welds and even spacing, driveway behind.",
    alt: "Finished powder-coated steel gate and railing at a property entrance",
  },

  // ── Before / after pairs ────────────────────────────────────────────────
  {
    path: "before-after/living-room-before",
    ...CARD_SIZE,
    scene: "brick",
    prompt:
      "A tired living room before renovation: stained and peeling paint, dated cornice, worn flooring, bare pendant fitting, dull flat daylight.",
    alt: "Tired living room before renovation, with peeling paint and worn flooring",
  },
  {
    path: "before-after/living-room-after",
    ...CARD_SIZE,
    scene: "room",
    prompt:
      "The same living room after renovation: fresh walls, new flooring, clean cornice and skirting, layered lighting, same camera angle and framing.",
    alt: "The same living room after renovation, with fresh finishes and new flooring",
  },
  {
    path: "before-after/kitchen-before",
    ...CARD_SIZE,
    scene: "brick",
    prompt:
      "A worn kitchen before refit: chipped units, dated tiling, exposed pipework, discoloured worktop, flat overhead light.",
    alt: "Worn kitchen before refit, with chipped units and dated tiling",
  },
  {
    path: "before-after/kitchen-after",
    ...CARD_SIZE,
    scene: "timber",
    prompt:
      "The same kitchen after refit: bespoke units, new worktop and splashback, under-cabinet lighting, same camera angle and framing.",
    alt: "The same kitchen after refit, with bespoke units and new worktop",
  },
  {
    path: "before-after/facade-before",
    ...CARD_SIZE,
    scene: "brick",
    prompt:
      "A weathered building facade before restoration: blown render, staining and algae streaks, faded paint, flat grey daylight.",
    alt: "Weathered building facade before restoration, with blown render and staining",
  },
  {
    path: "before-after/facade-after",
    ...CARD_SIZE,
    scene: "frame",
    prompt:
      "The same facade after restoration: sound render, clean uniform coating, repaired detailing, same camera angle and framing.",
    alt: "The same facade after restoration, with sound render and a clean coating",
  },

  // ── Blog covers ─────────────────────────────────────────────────────────
  {
    path: "blog/why-your-roof-keeps-leaking-after-repairs",
    ...BLOG_SIZE,
    scene: "truss",
    prompt:
      "Close view of a roof junction being prepared for waterproofing, flashing and upstand detail at a parapet, hands working the detail.",
    alt: "Roof junction being prepared at a parapet flashing detail",
  },
  {
    path: "blog/what-a-condition-survey-actually-finds",
    ...BLOG_SIZE,
    scene: "plan",
    prompt:
      "A surveyor using a damp meter against a wall while making notes on a clipboard in an empty room, torch and moisture readings.",
    alt: "Surveyor taking a damp reading and recording notes in an empty room",
  },
  {
    path: "blog/planned-maintenance-versus-emergency-callouts",
    ...BLOG_SIZE,
    scene: "pipes",
    prompt:
      "A maintenance technician servicing a pump set in a plant room, service schedule on a tablet, tools laid out neatly.",
    alt: "Technician servicing a pump set against a maintenance schedule",
  },
  {
    path: "blog/why-tiles-crack-and-how-to-prevent-it",
    ...BLOG_SIZE,
    scene: "tiles",
    prompt:
      "A cracked floor tile lifted to expose the screed and a movement joint beneath, chisel and dust, close documentary framing.",
    alt: "Cracked floor tile lifted to expose the screed beneath",
  },
  {
    path: "blog/designing-ceilings-in-rooms-without-height",
    ...BLOG_SIZE,
    scene: "room",
    prompt:
      "A room with a dropped perimeter bulkhead and a higher central ceiling with concealed lighting, showing how height is preserved centrally.",
    alt: "Room with a dropped perimeter bulkhead and higher central ceiling",
  },
  {
    path: "blog/single-contractor-versus-managing-trades-yourself",
    ...BLOG_SIZE,
    scene: "frame",
    prompt:
      "A site manager coordinating two tradespeople over a programme printout on a site table, part-finished room behind.",
    alt: "Site manager coordinating tradespeople over a printed programme",
  },

  // ── About ───────────────────────────────────────────────────────────────
  {
    path: "about/team-photo",
    ...CARD_SIZE,
    scene: "frame",
    prompt:
      "A group of five construction and engineering professionals from different trades standing together on site, relaxed and genuine, hard hats and hi-vis, end of the working day light.",
    alt: "The ICE-Premium team of five trades professionals together on site",
  },

  // ── Open Graph fallback ─────────────────────────────────────────────────
  {
    path: "general/og-fallback",
    w: 1200,
    h: 630,
    scene: "skyline",
    prompt:
      "A wide establishing view of a construction site at golden hour with a tower crane silhouetted against the sky, no people in the foreground.",
    alt: "Construction site at golden hour with a tower crane",
  },
];

/** Lookup by path, used by the site to resolve alt text. */
export const altFor = (path) =>
  images.find((i) => i.path === path)?.alt || "";
