/**
 * Before/after pairs.
 *
 * AI-generated stock imagery — swap for real ICE-Premium project photos when
 * available. Each pair represents the kind of transformation a discipline
 * delivers; neither image is a photograph of a specific completed job.
 */
export type ComparisonPair = {
  slug: string;
  label: string;
  discipline: string;
  city: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  summary: string;
};

export const comparisons: ComparisonPair[] = [
  {
    slug: "living-room",
    label: "Living Room",
    discipline: "Renovation & Remodeling",
    city: "Abuja",
    before: "/images/before-after/living-room-before.jpg",
    after: "/images/before-after/living-room-after.jpg",
    beforeAlt:
      "Tired living room before renovation, with peeling paint and worn flooring",
    afterAlt:
      "The same living room after renovation, with fresh finishes and new flooring",
    summary:
      "Dated room stripped back and rebuilt with new finishes, a repaired ceiling line and a proper lighting scheme.",
  },
  {
    slug: "kitchen",
    label: "Kitchen Refit",
    discipline: "Carpentry & Woodworking",
    city: "Lagos",
    before: "/images/before-after/kitchen-before.jpg",
    after: "/images/before-after/kitchen-after.jpg",
    beforeAlt: "Worn kitchen before refit, with chipped units and dated tiling",
    afterAlt:
      "The same kitchen after refit, with bespoke units and a new worktop",
    summary:
      "Bespoke units measured to the actual room, replacing standard carcasses that never fitted the walls.",
  },
  {
    slug: "facade",
    label: "Facade Restoration",
    discipline: "Painting & Finishing",
    city: "Enugu",
    before: "/images/before-after/facade-before.jpg",
    after: "/images/before-after/facade-after.jpg",
    beforeAlt:
      "Weathered building facade before restoration, with blown render and staining",
    afterAlt:
      "The same facade after restoration, with sound render and a clean coating",
    summary:
      "Failed coating removed back to a sound substrate before a compatible system was applied.",
  },
];
