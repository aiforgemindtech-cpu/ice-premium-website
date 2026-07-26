// One-off content generator for the 6 blog MDX files.
// Safe to re-run: it overwrites content/blog/*.mdx from the data below.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "content", "blog");
mkdirSync(OUT, { recursive: true });

const posts = [
  {
    slug: "why-your-roof-keeps-leaking-after-repairs",
    title: "Why your roof keeps leaking after it has been repaired three times",
    category: "Roofing",
    date: "2025-11-04",
    excerpt:
      "A leak that survives repeated patching is not a stubborn leak. It is a misdiagnosed one — and the entry point is almost never where the damp appears.",
    body: `If a roof has been patched three times and still lets water in, the patches were not the problem. The diagnosis was.

## Water travels before it appears

Water entering a roof rarely drops straight down. It runs along the underside of a sheet, tracks down a purlin, follows a joist, and emerges through the ceiling at whatever point gravity and capillary action finally release it. That point can be several metres from where it got in.

This is why patching where the ceiling stain appears so often fails. The stain marks the exit, not the entrance.

## Junctions fail more often than coverings

In our experience the majority of persistent leaks originate at a junction rather than in the field of the roof covering:

- **Parapet upstands**, where the covering meets a raised wall and the flashing has no proper upstand behind it
- **Abutments**, where a lower roof meets a higher wall
- **Penetrations** — vents, pipes, fixings — where the seal has degraded
- **Rainwater goods**, where an undersized or blocked gutter overflows behind the fascia

A sheet or a tile in open field is doing a simple job and generally does it well. A junction is where two systems meet, and that is where detailing fails.

## What proper diagnosis looks like

Before pricing a repair, the entry point needs establishing. That means inspecting the junctions rather than the field, checking the rainwater goods under load, and where necessary testing sections of the roof under controlled water to isolate the source.

It is slower than climbing up with a tube of sealant. It is also the difference between a repair and another patch.

## The cost of getting it wrong

Re-covering a roof that leaks at the parapet produces a new roof that leaks at the parapet. The client pays for a full covering replacement and still has water coming in — and now believes the new covering is defective.

That outcome is avoidable, and it is avoided at diagnosis stage.

## What to ask a contractor

If someone is quoting to fix a recurring leak, ask them where the water is entering and how they established it. If the answer describes the location of the internal damp rather than an inspected entry point on the roof, the repair is likely to be another patch.`,
  },
  {
    slug: "what-a-condition-survey-actually-finds",
    title: "What a condition survey actually finds — and why we will not price without one",
    category: "Process",
    date: "2025-11-18",
    excerpt:
      "Pricing a renovation from a walkthrough is guesswork dressed as a quote. Here is what a proper survey uncovers, and why it protects your budget rather than inflating it.",
    body: `Clients occasionally ask why we survey before quoting when another contractor was willing to price from a twenty-minute walkthrough. The honest answer is that the walkthrough price is not really a price. It is an estimate that will move once work starts.

## What a walkthrough can see

Standing in a room, you can see finishes, approximate dimensions, and obvious defects. That is genuinely useful, and it is enough to establish whether a project is viable in principle.

What it cannot tell you is what is behind, above and below those finishes — which is where the cost lives on a renovation.

## What a survey adds

A condition survey records the things that determine scope:

- **Which walls are load-bearing**, which changes the entire approach to any removal
- **Where existing services run**, so first-fix routing can be planned rather than discovered
- **The condition of concealed structure** — joists, purlins, lintels — where accessible
- **Moisture readings** in floors and walls, which determine whether barriers and tanking are needed
- **What existing coatings are present**, which determines whether new finishes will bond or flake
- **Substrate movement and level**, which determines whether tiles will crack

None of these are visible on a walkthrough. All of them change the price.

## The economics of surveying

Surveying takes time, and time is cost. But the alternative is a quote based on assumption, followed by a series of variations once the assumptions prove wrong. The client who chose the cheaper walkthrough quote frequently ends up paying more — and paying it as a sequence of unwelcome surprises rather than as a known figure agreed upfront.

## What a survey does not eliminate

It is worth being straightforward about the limit here. A survey reduces unforeseeables; it does not abolish them. Some things genuinely cannot be seen until a wall comes down.

The difference is one of category. After a proper survey, a variation means the building concealed something. After a walkthrough quote, a variation often just means nobody looked.

## How we handle what a survey cannot see

Anything discovered once work starts is documented, priced, and issued as a written variation for your approval before we proceed. Not after the work is done, and not on the final invoice.

That is the whole point of surveying first: it makes the surprises rare, and it makes the remaining ones visible before they cost you anything.`,
  },
  {
    slug: "planned-maintenance-versus-emergency-callouts",
    title: "Planned maintenance versus emergency callouts: the real cost comparison",
    category: "Maintenance",
    date: "2025-12-02",
    excerpt:
      "Reactive maintenance feels cheaper because you only pay when something breaks. Across a year, it usually is not — and here is where the difference comes from.",
    body: `The argument for reactive maintenance is intuitive: why pay for inspections when nothing is wrong? You only spend when something actually fails.

The reason it does not hold up is that failures are not equally expensive at every stage.

## Faults get more expensive as they develop

A worn pump seal that is caught on inspection is a seal replacement. The same seal left to fail is a seal replacement plus a flooded plant room, damaged finishes, and possibly a day of disrupted operation.

The component cost is identical. Everything around it is not.

This pattern repeats across building services: a failing contactor versus a burnt-out distribution board; a blocked gutter versus a saturated wall; a slipped tile versus a decayed purlin.

## Emergency work carries a premium

Reactive work is priced differently to planned work, and reasonably so. It means responding at short notice, often outside normal hours, frequently without knowing what the fault is until arrival, and usually without the right part on the van.

Planned work is scheduled, diagnosed in advance, and carried out with the correct materials already on site.

## The hidden cost: no records

The most expensive consequence of a purely reactive regime is not any single callout. It is that nobody knows what is installed.

Without an asset register, every diagnosis starts from zero. The engineer spends the first hour establishing what the system even is. Nobody knows how old the equipment is or when it was last serviced, so nobody can tell whether a fault is an anomaly or the third symptom of something failing.

## What changes with a register

Once a building has a documented asset register with condition ratings:

- Diagnosis starts from evidence rather than investigation
- High-consequence assets can be prioritised for planned attention
- Replacement can be forecast rather than suffered
- Next year's maintenance becomes a budgetable figure

That last point is the one facility managers tend to value most. It turns maintenance from an unpredictable drain into a planned line item.

## Being honest about the limits

Planned maintenance does not eliminate failures. Things still break unexpectedly, and any credible contract retains reactive capability alongside the schedule.

What it does is reduce how often failure is the first sign of a problem — and reduce how much each failure costs when it does happen.`,
  },
  {
    slug: "why-tiles-crack-and-how-to-prevent-it",
    title: "Why tiles crack, and why relaying them changes nothing",
    category: "Flooring",
    date: "2025-12-16",
    excerpt:
      "Cracked tiles and failing grout are almost never a tile problem. They are a substrate problem, and replacing the tiles without addressing it just resets the clock.",
    body: `A tiled floor that cracks within a year or two is a common and thoroughly frustrating failure. It is also one of the most predictable, because the cause is nearly always the same.

## A tile is a rigid finish

Ceramic and porcelain tiles do not flex. Neither does cement-based grout, in any meaningful sense. Bonded to a substrate, they will faithfully transmit whatever that substrate does.

If the floor beneath moves — even slightly, even seasonally — the movement has to go somewhere. It goes into the weakest element, which is either the grout line or the tile itself.

## Where the movement comes from

Several things produce it:

- **Timber floor decks** that deflect underfoot or move with humidity
- **Screeds laid too thin** or over insufficiently compacted fill
- **Structural movement** at junctions between different construction types
- **Thermal movement**, particularly in areas with underfloor heating or large glazed elevations
- **Inadequate curing time** before tiling, so the substrate is still shrinking when the tiles go down

## Why relaying does not fix it

If a floor cracked because the substrate moves, laying new tiles on the same substrate produces the same result. The client pays twice and gets the same failure, usually within a similar timeframe.

This is why we assess the substrate before quoting any tiling work. If it moves, the fix is not better tiles or better adhesive.

## What actually addresses it

Depending on what the assessment finds:

- **Stabilising or replacing the substrate**, where it is inadequate
- **Decoupling membranes**, which absorb substrate movement so it is not transmitted to the tile
- **Movement joints** at the perimeter and at appropriate intervals across large areas
- **Levelling compound** to bring the surface within tolerance before laying
- **Allowing proper curing time**, which cannot be shortened by wishing

## The moisture question

Separately from movement, moisture in a substrate will break the adhesive bond over time. Where a floor is new, at ground level, or has any history of damp, it should be tested rather than assumed. A moisture barrier specified on the basis of an actual reading is cheap; one omitted on the basis of assumption is expensive.

## The short version

If your tiles cracked, ask what the floor underneath is doing before agreeing to have them replaced. The answer determines whether you are buying a repair or a repeat.`,
  },
  {
    slug: "designing-ceilings-in-rooms-without-height",
    title: "Designing ceilings in rooms that have no height to spare",
    category: "Design",
    date: "2026-01-13",
    excerpt:
      "The instinct in a low room is to leave the ceiling alone. Often the opposite works better — provided you drop the right parts of it.",
    body: `Low floor-to-ceiling height is one of the most common constraints we design around, particularly in retail units and older residential conversions. The default assumption is that a low room cannot take any ceiling treatment at all.

That assumption is usually wrong, because perceived height and measured height are different things.

## Perceived height is about contrast

A room reads as tall or low partly by absolute dimension, but substantially by comparison — against the openings, against adjacent spaces, and against variation within the ceiling itself.

A uniform ceiling gives the eye a single reference. A ceiling with variation gives it two, and the eye reads the highest point as the height of the room.

## Drop the perimeter, keep the centre

The most reliable move in a low room is to drop only the perimeter, leaving the central field at full height. The dropped edge conceals services, carries perimeter lighting, and creates a defined border — and because the centre stays high, the room reads taller than an equivalent full drop.

Counterintuitively, this often reads taller than leaving the ceiling entirely flat, because the contrast draws attention to the higher central plane.

## Float a raft

Where services genuinely have to run across the room rather than around it, a floating raft — a suspended panel with a visible gap to the structure above — achieves something similar. The gap tells the eye there is space above the raft, so the ceiling does not read as the top of the room.

## Leave it open and paint it out

In some spaces, particularly retail and hospitality, the best answer is not to install a ceiling at all. Exposing the structure and services and painting everything a single dark colour makes the services visually recede, and the room gains the full structural height.

This works well when the services are reasonably tidy and the lighting can be handled on track or suspended fittings. It works badly when the void is a tangle, because paint does not organise anything.

## What to avoid

The failure mode in a low room is a uniform full-width drop to accommodate downlights. It costs the room its height, gives nothing back visually, and is usually driven by lighting convenience rather than design intent.

If downlights are the only reason for the drop, the lighting scheme is worth revisiting first.

## Draw it before building it

All of these approaches depend on coordination — with lighting, detectors, sprinklers and diffusers, all of which have to land somewhere. That coordination happens on a reflected ceiling plan, before framing starts. A feature panel with a smoke detector in the middle of it is a coordination failure, not a design one.`,
  },
  {
    slug: "single-contractor-versus-managing-trades-yourself",
    title: "One contractor or five? What actually goes wrong when you manage trades yourself",
    category: "Process",
    date: "2026-02-10",
    excerpt:
      "Hiring each trade directly looks cheaper on paper. The cost shows up in sequencing, in the gaps between trades, and in who is responsible when something does not line up.",
    body: `On a multi-trade project, engaging each trade directly is often cheaper on the quotes. Whether it is cheaper on the outturn depends almost entirely on sequencing.

## Trades depend on each other

A renovation has a required order. First-fix electrics and plumbing go in before the ceiling closes. Plastering follows first fix. Second fix follows decoration in some areas and precedes it in others. Tiling needs the substrate ready and the wet-area first fix set out to the final layout.

Get the order wrong and work gets undone. The tiler who arrives before the plumber has set out the outlet positions will either wait or tile to the wrong lines.

## The gap problem

When each trade is engaged separately, each one is optimising their own schedule. The electrician finishes first fix and moves to another job. The ceiling contractor is booked for the following week. The electrician's second fix cannot be scheduled until the ceiling is done, but by then they are committed elsewhere.

None of them has done anything wrong. The programme still slips, and the person absorbing that is the client.

## Who owns the interface

The more consequential issue is responsibility at the boundaries. If a tiled wet area leaks, is that the tiler's tanking or the plumber's joint? If a ceiling cracks around a light fitting, is that the ceiling installer's support or the electrician's cutting?

With separate contracts, each party can reasonably point at the other, and the client is left arbitrating a technical dispute they are not equipped to judge — and paying for whichever remedy they end up believing.

Under a single contract, that interface is internal. It is our problem to resolve, not yours to adjudicate.

## When managing trades yourself does make sense

To be fair about it, there are cases where direct engagement works well:

- **Single-trade work** with no meaningful interfaces — a repaint, a boiler replacement
- **Projects with a long, flexible programme**, where sequencing gaps cost time but not money
- **Clients with genuine construction experience** who can sequence the programme themselves

The case weakens as the number of trades and interfaces rises.

## What to compare

If you are weighing the two approaches, do not compare the sum of the trade quotes against the main contract price. Compare it against the sum of the quotes plus the programme risk, plus your own time coordinating it, plus the cost of resolving any interface dispute.

That is the actual comparison, and it looks different from the one on the spreadsheet.`,
  },
];

const esc = (s) => String(s).replace(/"/g, '\\"');

const readingTime = (text) =>
  Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 200));

for (const p of posts) {
  const fm = [
    "---",
    `title: "${esc(p.title)}"`,
    `slug: "${p.slug}"`,
    `category: "${p.category}"`,
    `date: "${p.date}"`,
    `excerpt: "${esc(p.excerpt)}"`,
    `readingTime: ${readingTime(p.body)}`,
    `image: "/images/blog/${p.slug}.jpg"`,
    "---",
    "",
  ].join("\n");

  writeFileSync(join(OUT, `${p.slug}.mdx`), fm + "\n" + p.body + "\n", "utf8");
  console.log("wrote", `${p.slug}.mdx`);
}
