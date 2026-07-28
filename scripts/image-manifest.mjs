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
    people: true,
    photoQuery: "african engineer construction site blueprint",
    photoFallbacks: ["black engineer construction site","african architect site"],
    ...HERO_SIZE,
    scene: "plan",
    prompt:
      "A civil engineer in a hard hat studying rolled architectural blueprints spread across a table on an active construction site, steel frame and scaffolding behind, early morning light.",
    alt: "Engineer studying architectural drawings on an active construction site",
  },
  {
    path: "hero/hero-02",
    people: true,
    photoQuery: "african electrician electrical panel",
    photoFallbacks: ["black electrician wiring","african technician electrical"],
    ...HERO_SIZE,
    scene: "circuit",
    prompt:
      "An electrician wiring a distribution board inside a building under construction, cable ends fanned out, head torch and insulated tools, concentrating closely on the terminations.",
    alt: "Electrician terminating cables inside a distribution board",
  },
  {
    path: "hero/hero-03",
    people: true,
    photoQuery: "african construction worker roof",
    photoFallbacks: ["black construction worker roofing","african builder roof"],
    ...HERO_SIZE,
    scene: "truss",
    prompt:
      "A roofer kneeling on a low-pitch roof rolling out waterproofing membrane, mid-motion, torch and seam roller beside them, bright overcast sky.",
    alt: "Roofer rolling out waterproofing membrane across a flat roof",
  },
  {
    path: "hero/hero-04",
    people: true,
    photoQuery: "african carpenter woodworking",
    photoFallbacks: ["black carpenter workshop","african woodworker"],
    ...HERO_SIZE,
    scene: "timber",
    prompt:
      "A carpenter planing a length of hardwood at a workshop bench, fine sawdust hanging in a shaft of window light, hand tools and offcuts around the bench.",
    alt: "Carpenter planing hardwood at a workshop bench",
  },
  {
    path: "hero/hero-05",
    people: true,
    photoQuery: "african welder metal work",
    photoFallbacks: ["black welder workshop","african metal worker"],
    ...HERO_SIZE,
    scene: "steel",
    prompt:
      "A metal fabricator MIG-welding a steel balustrade section in a fabrication shop, full welding helmet and gloves, bright arc and sparks, dark workshop interior.",
    alt: "Fabricator welding a steel balustrade section in a workshop",
  },
  {
    // People-free by design. Searches for African masons and decorators
    // returned South Asian brickfield workers, which would be wrong on a
    // Nigerian contractor's site, so this slot shows finished work instead.
    path: "hero/hero-06",
    ...HERO_SIZE,
    scene: "room",
    prompt:
      "The interior of a newly completed building, polished tiled floor, open stair with a steel and timber balustrade, tall windows throwing long light across the space, no people.",
    alt: "Newly completed building interior with a polished floor and open stair",
  },
  {
    path: "hero/hero-07",
    people: true,
    photoQuery: "african construction workers team",
    photoFallbacks: ["black construction workers","african builders site"],
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
      "A room part-way through renovation, new stud partition framed out, dust sheeting over the floor, tools resting against the wall, no people.",
    alt: "Room mid-renovation with a newly framed stud partition and dust sheeting",
  },
  {
    path: "services/electrical-installations",
    ...SERVICE_SIZE,
    scene: "circuit",
    prompt:
      "A newly installed consumer unit with neat cable dressing and labelled breakers, cover off, close documentary framing, no people.",
    alt: "Newly installed consumer unit with neat cable dressing and labelled breakers",
  },
  {
    path: "services/plumbing-services",
    ...SERVICE_SIZE,
    scene: "pipes",
    prompt:
      "Copper pipework and isolation valves neatly run across a plant room wall, no people.",
    alt: "Copper pipework and isolation valves run across a plant room wall",
  },
  {
    path: "services/painting-finishing",
    ...SERVICE_SIZE,
    scene: "paint",
    prompt:
      "A freshly painted room with crisp cut-in lines at the ceiling, masked skirting and dust sheets, roller and tray on the floor, no people.",
    alt: "Freshly painted room with crisp cut-in lines, masked skirting and dust sheets",
  },
  {
    path: "services/roofing-waterproofing",
    ...SERVICE_SIZE,
    scene: "truss",
    prompt:
      "Close detail of interlocking roof tiles along a batten line with felt exposed below, clear sky, no people.",
    alt: "Interlocking roof tiles set along a batten line with felt exposed below",
  },
  {
    path: "services/ceiling-installation",
    ...SERVICE_SIZE,
    scene: "room",
    prompt:
      "A suspended grid ceiling part-installed, T-bar frame visible with services in the void above, no people.",
    alt: "Suspended grid ceiling part-installed, with services visible in the void above",
  },
  {
    path: "services/ceiling-design",
    ...SERVICE_SIZE,
    scene: "plan",
    prompt:
      "A finished coffered ceiling with a recessed perimeter and concealed cove lighting in a contemporary reception, warm glow, no people.",
    alt: "Finished coffered ceiling with concealed cove lighting",
  },
  {
    path: "services/tiling-flooring",
    ...SERVICE_SIZE,
    scene: "tiles",
    prompt:
      "An empty room with a completed large-format porcelain tiled floor, crisp grout lines running to the skirting, daylight raking across the surface, entirely empty of people.",
    alt: "Large-format porcelain floor tiles being set with levelling clips and spacers",
  },
  {
    path: "services/carpentry-woodworking",
    ...SERVICE_SIZE,
    scene: "timber",
    prompt:
      "A bespoke cabinet carcass dry-fitted on a workshop bench with clamps holding the joint, shavings on the bench, no people.",
    alt: "Bespoke cabinet carcass dry-fitted on a workshop bench with clamps in place",
  },
  {
    path: "services/steel-metal-fabrication",
    ...SERVICE_SIZE,
    scene: "steel",
    prompt:
      "A finished powder-coated steel balustrade and gate frame on trestles in a fabrication workshop, no people.",
    alt: "Finished powder-coated steel balustrade and gate frame on workshop trestles",
  },
  {
    path: "services/facility-maintenance",
    ...SERVICE_SIZE,
    scene: "pipes",
    prompt:
      "A tidy building plant room with pumps, pipework and service tags, tools laid out, no people.",
    alt: "Building plant room with pumps, pipework and service tags",
  },
  {
    path: "services/interior-design",
    ...SERVICE_SIZE,
    scene: "room",
    prompt:
      "A calm finished contemporary living space with layered lighting, warm timber and stone finishes, late afternoon light, no people.",
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
      "Close detail of a roof parapet upstand and flashing junction prepared for waterproofing, no people.",
    alt: "Roof parapet upstand and flashing junction prepared for waterproofing",
  },
  {
    path: "blog/what-a-condition-survey-actually-finds",
    ...BLOG_SIZE,
    scene: "plan",
    prompt:
      "A damp meter and survey notes resting on a windowsill in an empty room with visible damp staining on the wall, no people.",
    alt: "Damp meter and survey notes on a windowsill beside visible damp staining",
  },
  {
    path: "blog/planned-maintenance-versus-emergency-callouts",
    ...BLOG_SIZE,
    scene: "pipes",
    prompt:
      "A pump set in a plant room with a maintenance schedule clipboard hanging beside it, no people.",
    alt: "Plant room pump set with a maintenance schedule clipboard alongside",
  },
  {
    path: "blog/why-tiles-crack-and-how-to-prevent-it",
    ...BLOG_SIZE,
    scene: "tiles",
    prompt:
      "A cracked floor tile lifted to expose the screed and movement joint beneath, chisel resting alongside, no people.",
    alt: "Cracked floor tile lifted to expose the screed and movement joint beneath",
  },
  {
    path: "blog/designing-ceilings-in-rooms-without-height",
    ...BLOG_SIZE,
    scene: "room",
    prompt:
      "A room with a dropped perimeter bulkhead and higher central ceiling with concealed lighting, no people.",
    alt: "Room with a dropped perimeter bulkhead and a higher central ceiling",
  },
  {
    path: "blog/single-contractor-versus-managing-trades-yourself",
    ...BLOG_SIZE,
    scene: "frame",
    prompt:
      "A site table with a printed programme, drawings and a hard hat resting on it in a part-finished room, no people.",
    alt: "Site table with a printed programme, drawings and a hard hat",
  },

  // ── About ───────────────────────────────────────────────────────────────
  {
    path: "about/team-photo",
    people: true,
    photoQuery: "african construction workers group",
    photoFallbacks: ["black construction team","african workers portrait"],
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
