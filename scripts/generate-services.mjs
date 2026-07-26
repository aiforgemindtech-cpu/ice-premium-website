// One-off content generator for the 12 service MDX files.
// Safe to re-run: it overwrites content/services/*.mdx from the data below.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "content", "services");
mkdirSync(OUT, { recursive: true });

const services = [
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    order: 1,
    icon: "Hammer",
    summary:
      "Structural and cosmetic renovation of existing buildings — from single-room refreshes to full floor strip-outs and rebuilds.",
    intro:
      "Renovation is the discipline that touches every other one. A single project can involve taking out partitions, rerouting services, replacing a ceiling, retiling a floor and repainting throughout — and each of those trades has to arrive in the right order or the work gets done twice.",
    body: [
      {
        h: "What the work actually involves",
        p: "We begin with a condition survey of the existing building, because what is behind the wall matters more than what is on it. That survey tells us which walls are load-bearing, where the existing services run, and what is likely to be found once the strip-out starts. Only then do we produce a scope and a programme.\n\nFrom there the work runs in a deliberate sequence: strip-out, structural alterations, first-fix services, plastering and making good, second-fix services, then finishes. Skipping ahead in that order is the most common cause of rework on a renovation.",
      },
      {
        h: "Working around occupation",
        p: "Most of our renovation clients cannot vacate the building. We plan for that from the survey onward — zoning the works, sealing active areas with dust barriers, scheduling noisy activities outside core hours, and keeping critical systems on temporary supplies while permanent ones are replaced.",
      },
      {
        h: "Where costs usually move",
        p: "Renovation budgets move for one of two reasons: the client changes the scope, or the building reveals something the survey could not see. We control the first with written variations agreed before work proceeds. We reduce the second by surveying properly rather than pricing off a walkthrough.",
      },
    ],
    benefits: [
      ["Single point of accountability", "One contract covering every trade on the project, so sequencing problems are ours to solve rather than yours to coordinate."],
      ["Survey-led scoping", "We price what we have surveyed, not what we have assumed, which keeps variations to genuine unforeseeables."],
      ["Phased delivery", "Programmes built around an occupied building, with zoning and out-of-hours working where the operation requires it."],
      ["Written variations", "Any change to cost or programme is agreed in writing before it is carried out, never invoiced afterwards."],
      ["Trade sequencing in-house", "First-fix and second-fix stages are coordinated internally, which removes the gaps where separate contractors wait on each other."],
      ["Documented handover", "You receive a record of what was installed and where, which makes future maintenance faster and cheaper."],
    ],
    specs: [
      ["Project types", "Residential · Commercial · Retail · Mixed-use"],
      ["Typical duration", "Days to several weeks, scope dependent"],
      ["Survey", "Condition survey before scope is issued"],
      ["Pricing model", "Fixed written proposal against surveyed scope"],
      ["Occupied working", "Supported — phased and out-of-hours"],
      ["Trades coordinated", "All 12 in-house disciplines"],
      ["Handover", "As-built record and defect contact"],
    ],
    process: [
      ["Survey", "We inspect the existing structure and services and record what is actually there, including what is likely to be hidden."],
      ["Scope & proposal", "You receive a written scope, a fixed price against it, and a programme with dates."],
      ["Delivery", "Works run in trade sequence with zoning and dust control where the building stays occupied."],
      ["Handover", "Final inspection with you, snag resolution, and an as-built record for your files."],
    ],
    faqs: [
      ["Can you renovate while we keep working in the building?", "Yes. Zoned programmes, dust barriers and out-of-hours scheduling for noisy work are standard. Tell us your operational constraints at survey stage."],
      ["Do you handle structural alterations?", "Yes, where they are within scope and appropriately designed. Load-bearing alterations are identified at survey and engineered before any removal begins."],
      ["What if you find something unexpected behind a wall?", "We stop, document it, and issue a written variation with cost and programme impact for your approval before continuing."],
    ],
    related: ["ceiling-installation", "tiling-flooring", "painting-finishing"],
  },
  {
    slug: "electrical-installations",
    title: "Electrical Installations",
    order: 2,
    icon: "Zap",
    summary:
      "New installations, rewires, consumer unit upgrades and circuit testing — designed, installed and certified.",
    intro:
      "Electrical work is unforgiving of shortcuts. An installation that looks finished can still be unsafe, and the difference is usually invisible until something fails. We design circuits properly, install them in the right containment, and test and certify what we have done.",
    body: [
      {
        h: "Design before installation",
        p: "Before any cable is pulled, we establish the load. What is the property actually running — HVAC, pumps, heavy appliances, workshop equipment? That determines circuit separation, cable sizing and protective device selection. Undersized circuits and shared loads are the root of most nuisance tripping and overheating.",
      },
      {
        h: "Rewires and existing installations",
        p: "On an older property, the first job is understanding what is already there. We trace and map existing circuits and produce an as-found schedule before proposing a scope. That map often shows which routes can be safely reused, which reduces the chasing and making-good considerably.",
      },
      {
        h: "Testing and certification",
        p: "Every circuit we install is tested and recorded — continuity, insulation resistance, earth fault loop impedance, RCD operation. You receive the schedule of test results as part of handover. It is the document that proves the installation was safe on the day it was energised, and it is what any future electrician will want to see.",
      },
    ],
    benefits: [
      ["Load-calculated design", "Circuits sized to actual demand rather than assumption, which prevents nuisance tripping and overheating."],
      ["Individual circuit protection", "RCBO-per-circuit arrangements so a fault on one circuit does not take out the whole property."],
      ["Full test certification", "A documented schedule of test results at handover, not a verbal assurance that it is fine."],
      ["Circuit mapping on rewires", "Existing installations are traced and recorded before scope is fixed, which reduces surprises and making-good."],
      ["Surge protection", "Whole-property surge protective devices specified where the supply and connected equipment justify them."],
      ["Coordinated with other trades", "First and second fix sequenced with ceilings, plastering and finishes so nothing is opened up twice."],
    ],
    specs: [
      ["Scope", "New installs · Rewires · Consumer units · Remedials"],
      ["Protection", "RCBO per circuit where design permits"],
      ["Containment", "Fire-rated conduit and trunking"],
      ["Testing", "Continuity · Insulation · Loop impedance · RCD"],
      ["Documentation", "Schedule of test results issued at handover"],
      ["Surge protection", "SPD specified where justified"],
      ["Dedicated circuits", "HVAC · Pumps · High-demand appliances"],
    ],
    process: [
      ["Load assessment", "We establish what the property runs now and what it is likely to run, and size the installation to that."],
      ["Design & proposal", "Circuit schedule, protective device selection and a fixed written price."],
      ["First & second fix", "Containment and cabling, then accessories and terminations once building works allow."],
      ["Test & certify", "Full testing with results recorded and issued to you as part of handover."],
    ],
    faqs: [
      ["Do I need a full rewire or can circuits be replaced individually?", "It depends what the existing installation looks like once traced. We map it first and tell you honestly — a partial replacement is often sufficient and we will say so rather than selling a full rewire."],
      ["Will you provide certification?", "Yes. A schedule of test results for every circuit is part of handover on all installation work."],
      ["Can you work with power on in part of the building?", "Yes. Temporary supplies to critical systems and phased isolation are standard on occupied properties."],
    ],
    related: ["plumbing", "facility-maintenance", "renovation-remodeling"],
  },
  {
    slug: "plumbing",
    title: "Plumbing",
    order: 3,
    icon: "Droplets",
    summary:
      "Hot and cold water systems, waste and soil, sanitaryware installation, and leak diagnosis and repair.",
    intro:
      "Plumbing faults are expensive because of what water does to everything around it. Most of the cost of a leak is not the pipe — it is the ceiling, the flooring and the decoration underneath. Which is why we care about pipe support, joint quality and pressure testing more than about how fast a job can be finished.",
    body: [
      {
        h: "Systems, not fittings",
        p: "A plumbing installation is a system under pressure. Flow rate, pipe sizing, gradient on waste runs and adequate support all determine whether it performs. Undersized pipework starves outlets when several are used at once; inadequate gradient on a waste run causes recurring blockages that no amount of rodding will permanently fix.",
      },
      {
        h: "Leak diagnosis",
        p: "Finding a leak is a diagnostic exercise, not a demolition one. Water travels along joists and behind finishes before it appears, so the visible damp is rarely above the fault. We isolate and pressure-test sections to narrow the location before opening anything up — which usually means one small access opening rather than a series of exploratory holes.",
      },
      {
        h: "Pressure testing before concealment",
        p: "Every concealed run we install is pressure tested and held before it is boxed in, screeded over or plastered. It is a short step that prevents the worst category of plumbing failure: a joint that fails behind a finished surface.",
      },
    ],
    benefits: [
      ["Correctly sized pipework", "Systems sized for simultaneous demand so outlets do not starve when several are in use."],
      ["Pressure tested before concealment", "Concealed runs are tested and held before being boxed in, screeded or plastered over."],
      ["Diagnostic leak tracing", "Isolation and pressure testing to locate a fault before opening up, rather than exploratory demolition."],
      ["Proper gradient on waste runs", "Falls set correctly so waste clears, which prevents the recurring blockages that rodding never permanently fixes."],
      ["Adequate pipe support", "Clipping and support at correct centres to prevent movement, noise and stress on joints."],
      ["Coordinated with tiling and finishes", "First fix set out against the final tiling and sanitaryware layout so nothing lands in the wrong place."],
    ],
    specs: [
      ["Scope", "Hot & cold supply · Waste & soil · Sanitaryware"],
      ["Testing", "Pressure test and hold before concealment"],
      ["Leak tracing", "Sectional isolation and pressure diagnosis"],
      ["Waste gradient", "Falls set to prevent standing waste"],
      ["Support", "Clipped at correct centres throughout"],
      ["Coordination", "Set out against final tiling and sanitaryware"],
      ["Remedials", "Blockages · Leaks · Low pressure · Noise"],
    ],
    process: [
      ["Survey & diagnosis", "We establish the existing system, demand and any faults before proposing a scope."],
      ["Design & proposal", "Pipe sizing, routing and a fixed written price against the surveyed scope."],
      ["First fix & test", "Supply and waste runs installed, then pressure tested and held before concealment."],
      ["Second fix & commission", "Sanitaryware and outlets fitted, system commissioned and checked under load."],
    ],
    faqs: [
      ["Can you find a leak without tearing out the ceiling?", "Usually, yes. We isolate and pressure test sections to narrow the location first, so access is typically one small opening rather than several."],
      ["Why do my taps lose pressure when the shower runs?", "Almost always undersized pipework or a shared branch that cannot meet simultaneous demand. It is a sizing problem, and it is fixable."],
      ["Do you test concealed pipework before it is covered?", "Always. Every concealed run is pressure tested and held before it is boxed in or covered."],
    ],
    related: ["tiling-flooring", "facility-maintenance", "renovation-remodeling"],
  },
  {
    slug: "painting-finishing",
    title: "Painting & Finishing",
    order: 4,
    icon: "Paintbrush",
    summary:
      "Surface preparation, decorative painting and specialist finishes — where the preparation is most of the work.",
    intro:
      "The visible part of a paint job is the last ten percent of the effort. Everything that determines whether a finish lasts — filling, sanding, sealing, priming — happens before any topcoat goes on. A finish that fails early almost always failed at preparation, not application.",
    body: [
      {
        h: "Preparation is the job",
        p: "We fill, sand, and seal before priming, and we prime before finishing. On previously painted surfaces this includes identifying what is already on the wall, because applying an incompatible system over an existing one causes flaking that no amount of topcoat will fix.\n\nOn new plaster we allow proper drying time and use a mist coat. Painting plaster before it has dried traps moisture and the finish fails within months.",
      },
      {
        h: "Protection and containment",
        p: "Occupied buildings need the surrounding space protected properly — floors covered, fittings masked, adjacent areas sealed. Overspray and splatter are far more expensive to remedy than to prevent, and on a commercial property they can put a room out of use for longer than the painting itself.",
      },
      {
        h: "Specialist finishes",
        p: "Beyond standard emulsion and eggshell we handle textured and decorative finishes, feature walls, and protective coatings for high-traffic or high-moisture areas. The specification is driven by the environment — a corridor in a commercial building and a guest bedroom need genuinely different products.",
      },
    ],
    benefits: [
      ["Preparation-led approach", "Filling, sanding, sealing and priming carried out properly, because that is what determines whether a finish lasts."],
      ["System compatibility checked", "Existing coatings identified before overpainting, which prevents the flaking caused by incompatible systems."],
      ["Environment-appropriate specification", "Products selected for traffic, moisture and wear rather than a single finish used everywhere."],
      ["Thorough protection", "Floors, fittings and adjacent areas properly covered and sealed before work starts."],
      ["Correct drying intervals", "New plaster given time to dry and mist-coated, so moisture is not sealed in behind the finish."],
      ["Clean edges and lines", "Cutting-in done by hand where it shows, which is the detail that separates a finished room from a painted one."],
    ],
    specs: [
      ["Surfaces", "Plaster · Masonry · Timber · Metal · Board"],
      ["Preparation", "Fill · Sand · Seal · Prime"],
      ["New plaster", "Dried and mist-coated before finishing"],
      ["Finishes", "Emulsion · Eggshell · Satin · Gloss · Textured"],
      ["Protection", "Floors, fittings and adjacent areas masked"],
      ["High-traffic areas", "Durable and washable systems specified"],
      ["Coverage", "Full opacity, not a single thin coat"],
    ],
    process: [
      ["Survey", "We assess the substrate and identify existing coatings before specifying anything."],
      ["Preparation", "Filling, sanding, sealing and priming — the stage that determines the result."],
      ["Application", "Finish coats applied to full opacity with hand cutting-in where edges show."],
      ["Inspection", "Walked with you in good light, with touch-ups completed before we leave."],
    ],
    faqs: [
      ["Why did my last paint job flake within a year?", "Most commonly an incompatible system applied over an existing coating, or new plaster painted before it dried. Both are preparation failures, not product failures."],
      ["How long should new plaster dry before painting?", "It depends on thickness and conditions, but it must be genuinely dry throughout and mist-coated first. We assess it rather than working to a fixed number of days."],
      ["Can you paint an occupied office?", "Yes, with proper containment and out-of-hours scheduling where the smell or disruption would affect operations."],
    ],
    related: ["ceiling-design", "interior-design", "renovation-remodeling"],
  },
  {
    slug: "roofing-waterproofing",
    title: "Roofing & Waterproofing",
    order: 5,
    icon: "Umbrella",
    summary:
      "Roof covering, structural repair, membrane waterproofing and rainwater goods — diagnosed at the junction, not just the surface.",
    intro:
      "Most persistent roof leaks are not covering failures. They are junction failures — at parapets, upstands, penetrations and abutments — which is why repeatedly patching the sheet or the tile never resolves them. We diagnose where water is actually entering before proposing a repair.",
    body: [
      {
        h: "Diagnosis before re-covering",
        p: "A leak that has been patched several times without success is telling you the diagnosis was wrong, not that the patch was poor. Water tracks: it can enter at a parapet and appear metres away. Before we price a re-cover we establish the entry point, because re-covering a roof that leaks at the upstand simply produces a new roof that leaks at the upstand.",
      },
      {
        h: "The structure under the covering",
        p: "When we strip a covering we inspect the structure beneath it. Prolonged ingress decays timber purlins and noggins, and laying a new covering over a compromised structure is both unsafe and short-lived. Structural repairs are identified at strip-out and confirmed with you in writing before the new covering goes on.",
      },
      {
        h: "Rainwater goods",
        p: "Gutters, downpipes and their outfalls are part of the waterproofing system, not an accessory to it. Undersized or blocked rainwater goods cause overflow that saturates walls and undermines everything above. We size and install them as part of the roof scope rather than treating them separately.",
      },
    ],
    benefits: [
      ["Entry-point diagnosis", "We establish where water actually enters before pricing, so the repair addresses the fault rather than the symptom."],
      ["Junction detailing", "Proper upstands, membranes and flashings at parapets and abutments — where most persistent leaks originate."],
      ["Structural inspection at strip-out", "Decayed purlins and noggins identified and replaced rather than covered over."],
      ["Rainwater goods sized properly", "Gutters and downpipes treated as part of the waterproofing system, not an afterthought."],
      ["Written variations for hidden damage", "Structural decay found at strip-out is documented and agreed with you before work continues."],
      ["Full-system approach", "Covering, junctions, penetrations and drainage addressed together, which is the only way a roof stays dry."],
    ],
    specs: [
      ["Coverings", "Long-span aluminium · Sheet · Tile"],
      ["Waterproofing", "Membrane systems to junctions and flat areas"],
      ["Structure", "Purlin and noggin inspection and replacement"],
      ["Junctions", "Parapets · Upstands · Abutments · Penetrations"],
      ["Rainwater goods", "Gutters · Downpipes · Outfall connections"],
      ["Diagnosis", "Entry-point tracing before scope is fixed"],
      ["Remedials", "Persistent leaks previously patched unsuccessfully"],
    ],
    process: [
      ["Leak diagnosis", "We trace the actual entry point rather than pricing from where the damp appears internally."],
      ["Scope & proposal", "A written scope covering covering, junctions and drainage, with a fixed price."],
      ["Strip & inspect", "Existing covering removed and the structure beneath inspected and repaired as needed."],
      ["Re-cover & test", "New covering, junction detailing and rainwater goods installed and checked."],
    ],
    faqs: [
      ["My roof has been patched three times and still leaks. Why?", "Because the diagnosis was wrong each time. Water usually enters at a junction and travels before it appears. The patch was applied where the damp showed, not where the water got in."],
      ["Do I need a full re-cover?", "Not always. If the covering is sound and the fault is at a junction, the junction is the repair. We will tell you which it is after diagnosis."],
      ["Will you check the roof structure?", "Yes — whenever a covering is stripped, the structure beneath is inspected before anything new goes on."],
    ],
    related: ["ceiling-installation", "facility-maintenance", "renovation-remodeling"],
  },
  {
    slug: "ceiling-installation",
    title: "Ceiling Installation",
    order: 6,
    icon: "Layers",
    summary:
      "Suspended grids, plasterboard ceilings and access provision — set level, supported properly and coordinated with services.",
    intro:
      "A ceiling is the surface everyone sees and nobody thinks about until it sags, cracks at the joints, or has to be cut open to reach a valve. Getting it right is a matter of setting out, support centres and planning access before the boards go up.",
    body: [
      {
        h: "Setting out and level",
        p: "Ceilings are read against the horizontal lines around them — window heads, door frames, shadow gaps. A ceiling that is level but set out to the wrong datum still looks wrong. We establish the datum from the features the eye will compare it against, then set the whole ceiling to that.",
      },
      {
        h: "Support and fixing centres",
        p: "Sagging between joists and cracking along board joints both come from inadequate support. Hangers, channels and noggins at correct centres, boards staggered and fixed at proper spacing, and joints taped and filled properly — these are the unglamorous details that determine whether a ceiling still looks flat in five years.",
      },
      {
        h: "Coordinating services and access",
        p: "The void above a ceiling carries lighting, cabling, pipework and sometimes ductwork. All of it needs to be in place and tested before boarding, and anything requiring future access — valves, junction boxes, dampers — needs an access panel designed in. Cutting one in afterwards is always uglier than planning one in.",
      },
    ],
    benefits: [
      ["Datum-referenced setting out", "Level established against the openings and features the ceiling will be visually compared to."],
      ["Correct support centres", "Hangers, channels and noggins spaced to prevent the sagging and joint cracking that shows up years later."],
      ["Services coordinated first", "Lighting, cabling and pipework installed and tested before boarding, so nothing is opened up again."],
      ["Access designed in", "Panels planned at valves and junctions rather than cut in later when something needs reaching."],
      ["Properly finished joints", "Taped, filled and sanded so joints do not telegraph through the decoration."],
      ["Grid and plasterboard both", "Suspended systems and monolithic plasterboard ceilings, specified to suit the space and the services above."],
    ],
    specs: [
      ["Systems", "Suspended grid · Plasterboard · Bulkheads"],
      ["Setting out", "Datum referenced to openings and features"],
      ["Support", "Hangers and channels at design centres"],
      ["Services", "Coordinated and tested before boarding"],
      ["Access", "Panels planned at valves and junctions"],
      ["Joints", "Taped, filled and sanded flat"],
      ["Integration", "Lighting and diffusers set out with the grid"],
    ],
    process: [
      ["Survey & set out", "Datum established and the grid or framing laid out against the room's existing lines."],
      ["Services coordination", "Lighting, cabling and pipework completed and tested in the void before boarding."],
      ["Install", "Framing and boards fixed at correct centres, with access panels formed as planned."],
      ["Finish", "Joints taped, filled and sanded ready for decoration."],
    ],
    faqs: [
      ["Why does my ceiling crack along the same lines?", "Those are board joints, and cracking along them means inadequate support or joints that were not properly taped and filled. It is a fixing and finishing issue."],
      ["Can you install a ceiling before the electrics are done?", "We would not recommend it. Anything in the void should be installed and tested before boarding, otherwise the ceiling comes back down."],
      ["Do I need access panels?", "Wherever there is something above the ceiling that will need reaching — valves, junction boxes, dampers. Planning them in looks far better than cutting them in later."],
    ],
    related: ["ceiling-design", "electrical-installations", "painting-finishing"],
  },
  {
    slug: "ceiling-design",
    title: "Ceiling Design",
    order: 7,
    icon: "Sparkles",
    summary:
      "Coffers, bulkheads, floating rafts and integrated lighting — the ceiling treated as a designed surface rather than a lid.",
    intro:
      "Ceiling design is where a room gains or loses its sense of proportion. Dropped perimeters, floating rafts, coffers and integrated lighting all change how high a space feels — sometimes in the opposite direction to what you would expect.",
    body: [
      {
        h: "Height is perceived, not measured",
        p: "A common mistake is dropping a full ceiling in a room that cannot afford the height. The better approach in a low room is usually to leave the centre high and drop only the perimeter, or to float a raft below an open ceiling. Both read as taller than a uniform drop at the same finished height.\n\nIn a room with generous height, the opposite applies — a coffer or a dropped feature can bring an oversized volume back to a human scale.",
      },
      {
        h: "Lighting is part of the design",
        p: "Integrated lighting has to be designed with the ceiling, not added to it. Cove and perimeter lighting needs a shadow gap deep enough to hide the fitting and a surface smooth enough to take grazing light without showing every imperfection. A cove that is too shallow shows the lamp; a surface finished to standard tolerance shows every ripple when lit from the side.",
      },
      {
        h: "Drawing before building",
        p: "We set out ceiling designs on a reflected ceiling plan before any framing goes up — coordinating the design with lighting positions, diffusers, sprinkler heads and detectors. Those functional items have to land somewhere, and a design drawn without them ends up with a detector in the middle of a feature panel.",
      },
    ],
    benefits: [
      ["Proportion-led design", "Treatments chosen for how they make the room feel, not applied uniformly regardless of available height."],
      ["Reflected ceiling plans", "Designs set out on drawing first, coordinating features with lighting, diffusers and detectors."],
      ["Lighting integrated, not added", "Coves and shadow gaps detailed deep enough to conceal fittings and deliver even light."],
      ["Finish appropriate to lighting", "Surfaces that will take grazing light are finished to a higher tolerance, so the light does not reveal every ripple."],
      ["Functional items coordinated", "Detectors, sprinklers and diffusers placed deliberately rather than landing in the middle of a feature."],
      ["Buildable detailing", "Designs developed with the installation in mind, so what is drawn is what actually gets built."],
    ],
    specs: [
      ["Treatments", "Coffers · Bulkheads · Floating rafts · Perimeter drops"],
      ["Lighting", "Cove · Perimeter · Recessed · Feature"],
      ["Documentation", "Reflected ceiling plan before installation"],
      ["Coordination", "Detectors · Sprinklers · Diffusers · Speakers"],
      ["Low rooms", "Perimeter drops and rafts to preserve perceived height"],
      ["High rooms", "Coffers and features to bring scale down"],
      ["Finish", "Higher tolerance where grazing light applies"],
    ],
    process: [
      ["Design consultation", "We assess the room's proportions and how the ceiling should respond to them."],
      ["Reflected ceiling plan", "The design is drawn and coordinated with all lighting and functional ceiling items."],
      ["Construction", "Framing and boarding built to the drawing, with lighting details formed as designed."],
      ["Finish & commission", "Surfaces finished to the required tolerance and the lighting scheme set and checked."],
    ],
    faqs: [
      ["My room is low — can I still have a designed ceiling?", "Yes, and often it will make the room feel taller. Dropping only the perimeter, or floating a raft, reads as more height than a uniform drop at the same level."],
      ["Why does my cove lighting show the fittings?", "The shadow gap is too shallow for the fitting used. It is a detailing dimension, and it has to be set at design stage rather than adjusted afterwards."],
      ["Do you produce drawings?", "Yes. Every ceiling design is set out on a reflected ceiling plan and coordinated before anything is built."],
    ],
    related: ["ceiling-installation", "interior-design", "electrical-installations"],
  },
  {
    slug: "tiling-flooring",
    title: "Tiling & Flooring",
    order: 8,
    icon: "Grid3x3",
    summary:
      "Floor and wall tiling, vinyl, laminate and engineered timber — where the substrate determines the result.",
    intro:
      "Tiles crack, grout fails and floors lift for one reason far more often than any other: the substrate underneath was not right. Movement, unevenness and moisture all transmit straight through to the finish, so substrate preparation is where the real work happens.",
    body: [
      {
        h: "The substrate decides everything",
        p: "A tile is a rigid finish over whatever it is bonded to. If the substrate flexes, the tile or the grout cracks — always. So before anything is laid we assess the floor for movement, level and moisture, and address what we find: levelling compound for tolerance, decoupling where movement is expected, and a moisture barrier where the reading demands it.",
      },
      {
        h: "Setting out",
        p: "Setting out determines whether a tiled room looks considered or accidental. We plan the layout so that cuts fall where they are least visible and full tiles land at the focal points, and we set the datum against the room's dominant lines. A room set out from the wrong corner ends with a sliver cut in the most visible position.",
      },
      {
        h: "Timber, vinyl and laminate",
        p: "Sheet and plank finishes have their own requirements — acclimatisation before laying, expansion gaps at perimeters, and appropriate underlay. Laid tight to the walls without an expansion allowance, a timber or laminate floor will buckle when it moves, and no amount of weight on top will stop it.",
      },
    ],
    benefits: [
      ["Substrate assessed first", "Movement, level and moisture checked and addressed before anything is laid over them."],
      ["Decoupling where needed", "Movement-absorbing layers specified where the substrate will move, which is what prevents cracked tiles and grout."],
      ["Considered setting out", "Layouts planned so cuts fall where they are least visible and full tiles land at focal points."],
      ["Moisture barriers", "Specified on the basis of actual readings rather than assumption."],
      ["Correct expansion allowance", "Perimeter gaps and acclimatisation on timber and laminate, so floors do not buckle when they move."],
      ["Coordinated with plumbing", "Wet-area first fix set out against the final tile layout so outlets land on the intended lines."],
    ],
    specs: [
      ["Finishes", "Porcelain · Ceramic · Natural stone · Vinyl · Laminate · Engineered timber"],
      ["Substrate", "Assessed for movement, level and moisture"],
      ["Levelling", "Compound applied to required tolerance"],
      ["Decoupling", "Specified where substrate movement is expected"],
      ["Setting out", "Planned layout with cuts placed deliberately"],
      ["Timber & laminate", "Acclimatised, with perimeter expansion gaps"],
      ["Wet areas", "Tanking and moisture barriers as required"],
    ],
    process: [
      ["Substrate survey", "The existing floor or wall is checked for movement, level and moisture before any specification."],
      ["Preparation", "Levelling, decoupling and moisture protection applied as the survey requires."],
      ["Setting out", "Layout planned and datum established so cuts fall where they are least visible."],
      ["Lay & finish", "Finish laid, grouted or trimmed, with expansion allowances maintained at perimeters."],
    ],
    faqs: [
      ["Why do my tiles keep cracking?", "Almost always substrate movement transmitting through a rigid finish. The fix is decoupling or stabilising the substrate — relaying the same tiles on the same floor will produce the same result."],
      ["My laminate floor has buckled. What happened?", "It was almost certainly laid without adequate perimeter expansion gaps, or before it had acclimatised. Both prevent the floor from moving as it needs to."],
      ["Do you tile wet rooms?", "Yes, with appropriate tanking and moisture barriers specified against actual readings rather than assumed."],
    ],
    related: ["plumbing", "renovation-remodeling", "interior-design"],
  },
  {
    slug: "carpentry-woodworking",
    title: "Carpentry & Woodworking",
    order: 9,
    icon: "Ruler",
    summary:
      "First and second fix carpentry, bespoke joinery and fitted furniture — measured on site, made to fit.",
    intro:
      "Buildings are not square. Walls bow, floors fall, and openings are rarely true. Good carpentry is largely the craft of making things that look perfectly straight inside a building that is not, which is why site measurement matters more than catalogue dimensions.",
    body: [
      {
        h: "Site measurement before fabrication",
        p: "We survey the actual opening or recess before anything is made, recording it at several points rather than one. A recess that measures 2,400mm at the top and 2,388mm at the bottom needs a unit made to fit that reality, with the discrepancy absorbed in a scribe rather than left as a visible taper.",
      },
      {
        h: "First fix and second fix",
        p: "First fix carpentry — studwork, noggins, floor structure, door linings — is structural and hidden, and its accuracy determines how well every finish after it sits. Second fix — doors, architraves, skirtings, ironmongery — is what people see and touch, and it is where fitting tolerances become visible.",
      },
      {
        h: "Bespoke joinery",
        p: "Fitted furniture, wardrobes, shelving and display units are made to suit the specific space rather than adapted from standard carcasses. That means using the full height and depth available, working around service runs and awkward returns, and finishing to match the room's other timber elements.",
      },
    ],
    benefits: [
      ["Measured on site", "Openings and recesses surveyed at multiple points, so units are made to fit what is actually there."],
      ["Discrepancies scribed out", "Out-of-square absorbed in scribes and trims rather than left visible as a taper."],
      ["First fix accuracy", "Studwork, linings and floor structure set true, because every finish afterwards depends on them."],
      ["Bespoke, not adapted", "Fitted furniture made to the space rather than standard carcasses packed out to fill it."],
      ["Full use of available space", "Designs that use the real height and depth, working around service runs and returns."],
      ["Consistent finishing", "Timber elements finished to match the room's existing joinery."],
    ],
    specs: [
      ["First fix", "Studwork · Noggins · Floor structure · Door linings"],
      ["Second fix", "Doors · Architraves · Skirtings · Ironmongery"],
      ["Bespoke", "Wardrobes · Shelving · Display units · Fitted furniture"],
      ["Measurement", "Site survey at multiple points before fabrication"],
      ["Materials", "Hardwood · Softwood · Veneered board · MDF"],
      ["Fabrication", "Workshop made, site fitted and scribed"],
      ["Finishing", "Matched to existing timber elements in the room"],
    ],
    process: [
      ["Site survey", "Openings and recesses measured at several points to record what is actually there."],
      ["Design & drawing", "Units drawn to the surveyed dimensions with scribes and tolerances allowed for."],
      ["Fabrication", "Made in the workshop to the drawing, under controlled conditions."],
      ["Fit & finish", "Installed on site, scribed to the building, and finished to match surrounding joinery."],
    ],
    faqs: [
      ["Why does off-the-shelf furniture never fit properly?", "Because it is made to a nominal dimension and your walls are not. Bespoke units are measured to the actual opening and scribed to absorb the difference."],
      ["Can you match existing joinery?", "In most cases yes — we match profile and finish to what is already in the room so new work does not read as an addition."],
      ["Do you make items off site?", "Yes. Fabrication happens in the workshop under controlled conditions, then units are fitted and scribed on site."],
    ],
    related: ["interior-design", "steel-metal-fabrication", "renovation-remodeling"],
  },
  {
    slug: "steel-metal-fabrication",
    title: "Steel & Metal Fabrication",
    order: 10,
    icon: "Factory",
    summary:
      "Staircases, balustrades, gates, railings and structural steelwork — surveyed, drawn, fabricated and installed.",
    intro:
      "Fabricated steelwork is unforgiving because it is made before it arrives. A staircase that is ten millimetres out cannot be adjusted on site the way timber can. That places the whole burden on accurate survey and proper shop drawings.",
    body: [
      {
        h: "Survey and shop drawings",
        p: "We survey the opening or location before anything is cut, and produce shop drawings from that survey rather than from the architect's nominal dimensions. Openings are commonly out of square, and a stair fabricated to the drawn dimension will not sit true in an opening that does not match it.\n\nThe survey also lets us decide where any discrepancy will be absorbed — usually in a trimmer or a packing detail at the head, where it is invisible, rather than along the length of the stringer where it would show.",
      },
      {
        h: "Fabrication and finish",
        p: "Welding, grinding and finishing happen in the workshop where they can be controlled. Powder coating gives a far more durable and even finish than site-applied paint, which is why we finish before delivery wherever the item can be transported and installed without damaging the coating.",
      },
      {
        h: "Guarding and safety",
        p: "Balustrades and guarding are safety elements, not decorative ones. Infill spacing, height and fixing strength all matter, and we detail them to appropriate guarding standards rather than to what looks about right.",
      },
    ],
    benefits: [
      ["Surveyed before fabrication", "Actual site dimensions recorded, because a fabricated item cannot be trimmed to fit the way timber can."],
      ["Shop drawings produced", "Everything drawn from survey dimensions and approved before any steel is cut."],
      ["Discrepancies planned out", "Out-of-square absorbed at concealed details rather than along visible lines."],
      ["Workshop finishing", "Powder coating applied under controlled conditions for a more durable and even finish than site paint."],
      ["Guarding detailed properly", "Infill spacing, height and fixing strength detailed to appropriate standards."],
      ["Mixed-material detailing", "Hardwood handrails and timber elements integrated with steelwork cleanly."],
    ],
    specs: [
      ["Products", "Staircases · Balustrades · Gates · Railings · Structural steel"],
      ["Survey", "Site dimensions recorded before fabrication"],
      ["Documentation", "Shop drawings approved before cutting"],
      ["Finish", "Powder coated in workshop where transportable"],
      ["Guarding", "Height, infill spacing and fixings to standard"],
      ["Materials", "Mild steel · Stainless · Aluminium"],
      ["Integration", "Hardwood handrails and timber infill"],
    ],
    process: [
      ["Site survey", "The opening or location is measured accurately, including any out-of-square."],
      ["Shop drawings", "Fabrication drawings produced from the survey and approved by you before cutting."],
      ["Fabrication & finish", "Made and powder coated in the workshop under controlled conditions."],
      ["Install", "Delivered and installed to the surveyed line, with concealed packing where needed."],
    ],
    faqs: [
      ["My stairwell is out of square. Is that a problem?", "It is common and it is manageable — provided it is surveyed before fabrication. We set the stair to a true line and absorb the discrepancy in a concealed detail."],
      ["Why powder coat rather than paint on site?", "Powder coating is applied and cured under controlled conditions, which gives a far more durable and even finish than site-applied paint can achieve."],
      ["Do you produce drawings before fabricating?", "Always. Shop drawings are produced from our site survey and approved by you before any steel is cut."],
    ],
    related: ["carpentry-woodworking", "renovation-remodeling", "facility-maintenance"],
  },
  {
    slug: "facility-maintenance",
    title: "Facility Maintenance",
    order: 11,
    icon: "Wrench",
    summary:
      "Planned preventative and reactive maintenance — moving a property from emergency callouts to a forecastable schedule.",
    intro:
      "Most maintenance spending is reactive, and reactive work is the most expensive kind. A planned regime costs less over a year than the same faults handled as emergencies, and it starts with knowing what assets the building actually has.",
    body: [
      {
        h: "The asset register comes first",
        p: "Many properties we take on have no asset register and no maintenance history. Nobody knows how old the distribution board is, when the pumps were last serviced, or what the roof covering is. Without that, every failure is a surprise and every repair is priced as an emergency.\n\nWe start with a condition survey and build the register from scratch — what is installed, where, its condition, and its likely remaining life.",
      },
      {
        h: "Planned versus reactive",
        p: "Once the register exists, the highest-risk and highest-consequence assets go onto a planned schedule. Planned interventions catch faults while they are still small — a failing seal rather than a flooded floor, a worn contactor rather than a dead distribution board.\n\nReactive capability does not disappear; it simply stops being the whole strategy. Things still fail unexpectedly, and we respond when they do.",
      },
      {
        h: "Budget forecasting",
        p: "The practical benefit clients notice most is that maintenance becomes forecastable. With a register and a schedule, we can tell you what next year's maintenance is likely to cost and which assets are approaching replacement — which turns maintenance from an unpredictable drain into a planned line item.",
      },
    ],
    benefits: [
      ["Asset register built from survey", "A documented record of what is installed, where, and in what condition — often for the first time."],
      ["Planned preventative schedule", "High-risk assets serviced on a schedule, which catches faults while they are still cheap."],
      ["Reactive response retained", "Unexpected failures still covered — planned maintenance reduces them rather than eliminating them."],
      ["Forecastable budgets", "An annual maintenance forecast, so spending becomes a planned line rather than a series of emergencies."],
      ["Multi-trade coverage", "Electrical, plumbing, roofing, carpentry and finishes all covered under one contract."],
      ["Maintenance history recorded", "Every intervention logged, so future diagnosis starts from evidence rather than guesswork."],
    ],
    specs: [
      ["Contract types", "Planned · Reactive · Combined"],
      ["Starting point", "Condition survey and asset register"],
      ["Inspections", "Quarterly electrical and plumbing as standard"],
      ["Coverage", "All 12 in-house disciplines"],
      ["Reporting", "Intervention log and condition updates"],
      ["Budgeting", "Annual forecast with replacement planning"],
      ["Property types", "Commercial · Residential · Mixed-use"],
    ],
    process: [
      ["Condition survey", "We inspect and document every relevant asset and its current condition."],
      ["Asset register", "A complete register is built, with condition ratings and expected remaining life."],
      ["Schedule & contract", "High-risk assets placed on a planned schedule, with reactive response agreed alongside."],
      ["Deliver & report", "Planned works carried out and logged, with condition updates and annual budget forecasting."],
    ],
    faqs: [
      ["We have no records of what is installed. Is that a problem?", "It is extremely common, and it is where we start. The condition survey builds the asset register from scratch."],
      ["Is planned maintenance actually cheaper?", "Over a year, generally yes — because planned interventions catch faults while they are small, and emergency callouts carry a premium that scheduled work does not."],
      ["Do you still handle emergencies?", "Yes. Planned maintenance reduces unexpected failures; it does not eliminate them. Reactive response is part of the contract."],
    ],
    related: ["electrical-installations", "plumbing", "roofing-waterproofing"],
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    order: 12,
    icon: "Armchair",
    summary:
      "Spatial planning, material selection and lighting design — with the team that will actually build it.",
    intro:
      "The gap between a design and a built interior is where most projects lose their quality. Designs that were never tested against buildability get value-engineered on site by whoever is holding the tools. We design and build, so what is drawn is what gets made.",
    body: [
      {
        h: "Spatial planning first",
        p: "Before material boards and colour palettes comes the question of how the space works: circulation, sightlines, where light falls at different times of day, and what the room has to do. A beautifully specified room with a poor layout is still a poor room.\n\nWe plan in 2D layouts and work through the practical constraints — service positions, structural elements, door swings — before any finish is selected.",
      },
      {
        h: "Materials chosen for the environment",
        p: "Specification has to account for wear, traffic, moisture and maintenance, not just appearance. A finish that photographs well and fails in eighteen months in a commercial corridor is a specification error. We select for the actual conditions, and we tell you where a preferred finish is going to be a maintenance problem.",
      },
      {
        h: "Lighting as a design layer",
        p: "Lighting does more to change how an interior feels than almost any other element, and it is routinely reduced to a grid of downlights. We work in layers — ambient, task and accent — and coordinate the scheme with the ceiling design and electrical first fix so the fittings land where the design intends.",
      },
      {
        h: "Designed and built by one team",
        p: "Because we carry all twelve trades in-house, the design is developed by people who know what it will take to build. Details are resolved on drawings rather than improvised on site, and there is no gap between the designer's intent and the contractor's interpretation.",
      },
    ],
    benefits: [
      ["Design and build under one contract", "No gap between design intent and site interpretation, because the same team does both."],
      ["Spatial planning before specification", "Circulation, sightlines and daylight resolved before finishes are chosen."],
      ["Buildable detailing", "Details resolved on drawings by people who know how they will be constructed."],
      ["Environment-appropriate materials", "Finishes specified for traffic, moisture and maintenance, not only appearance."],
      ["Layered lighting design", "Ambient, task and accent lighting coordinated with the ceiling and electrical first fix."],
      ["Honest specification advice", "We tell you when a preferred finish will be a maintenance problem, before it is ordered."],
    ],
    specs: [
      ["Services", "Spatial planning · Material specification · Lighting design · Joinery design"],
      ["Documentation", "2D layouts · Reflected ceiling plans · Finish schedules"],
      ["Delivery", "Design and build under a single contract"],
      ["Lighting", "Layered ambient, task and accent schemes"],
      ["Materials", "Specified for wear, moisture and maintenance"],
      ["Coordination", "Integrated with all 12 in-house trades"],
      ["Project types", "Residential · Commercial · Retail · Hospitality"],
    ],
    process: [
      ["Brief & survey", "We establish how the space needs to work and record the existing conditions and constraints."],
      ["Concept & layout", "Spatial planning and concept development, resolved in 2D before finishes are selected."],
      ["Specification", "Materials, finishes and lighting specified for the actual environment and documented in schedules."],
      ["Build & install", "The design is constructed by the same team that developed it, with details already resolved."],
    ],
    faqs: [
      ["Do you design as well as build?", "Yes, and under one contract. That is the point — it removes the gap where design intent normally gets lost on site."],
      ["Can you work to a design someone else produced?", "Yes. We will review it for buildability first and flag anything that will cause problems during construction."],
      ["How early should lighting be considered?", "At concept stage. Lighting has to be coordinated with the ceiling design and electrical first fix, and retrofitting a proper scheme is far more disruptive than designing one in."],
    ],
    related: ["ceiling-design", "carpentry-woodworking", "painting-finishing"],
  },
];

const yamlList = (items, indent = "  ") =>
  items.map((v) => `${indent}- ${v}`).join("\n");

const esc = (s) => String(s).replace(/"/g, '\\"');

for (const s of services) {
  const fm = [
    "---",
    `title: "${esc(s.title)}"`,
    `slug: "${s.slug}"`,
    `order: ${s.order}`,
    `icon: "${s.icon}"`,
    `summary: "${esc(s.summary)}"`,
    `heroImage: "/images/services/${s.slug}.jpg"`,
    "benefits:",
    s.benefits
      .map(([t, d]) => `  - title: "${esc(t)}"\n    description: "${esc(d)}"`)
      .join("\n"),
    "specs:",
    s.specs.map(([l, v]) => `  - label: "${esc(l)}"\n    value: "${esc(v)}"`).join("\n"),
    "process:",
    s.process
      .map(([t, d], i) => `  - step: "0${i + 1}"\n    title: "${esc(t)}"\n    description: "${esc(d)}"`)
      .join("\n"),
    "faqs:",
    s.faqs
      .map(([q, a]) => `  - question: "${esc(q)}"\n    answer: "${esc(a)}"`)
      .join("\n"),
    "related:",
    yamlList(s.related.map((r) => `"${r}"`)),
    "---",
    "",
  ].join("\n");

  const body =
    `${s.intro}\n\n` +
    s.body.map((b) => `## ${b.h}\n\n${b.p}`).join("\n\n") +
    "\n";

  writeFileSync(join(OUT, `${s.slug}.mdx`), fm + "\n" + body, "utf8");
  console.log("wrote", `${s.slug}.mdx`);
}
