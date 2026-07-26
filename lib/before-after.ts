/**
 * Before/after pairs.
 *
 * PLACEHOLDER IMAGERY — these are generated graphics, not photographs of real
 * ICE-Premium work. Replace the files in /public/images/before-after with real
 * paired project photography before launch.
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
    slug: "office-reception",
    label: "Office Reception",
    discipline: "Renovation & Remodeling",
    city: "Abuja",
    before: "/images/before-after/office-reception-before.jpg",
    after: "/images/before-after/office-reception-after.jpg",
    beforeAlt: "Office reception area before renovation works",
    afterAlt: "The same office reception after renovation and refinishing",
    summary:
      "Dated reception stripped back and rebuilt with a new ceiling, lighting scheme and full redecoration.",
  },
  {
    slug: "kitchen-refit",
    label: "Kitchen Refit",
    discipline: "Carpentry & Woodworking",
    city: "Lagos",
    before: "/images/before-after/kitchen-refit-before.jpg",
    after: "/images/before-after/kitchen-refit-after.jpg",
    beforeAlt: "Kitchen before refit, with original units in place",
    afterAlt: "The same kitchen after new bespoke joinery and finishes",
    summary:
      "Bespoke units measured to the actual room, replacing standard carcasses that never fitted the walls.",
  },
  {
    slug: "facade-restoration",
    label: "Facade Restoration",
    discipline: "Painting & Finishing",
    city: "Enugu",
    before: "/images/before-after/facade-restoration-before.jpg",
    after: "/images/before-after/facade-restoration-after.jpg",
    beforeAlt: "Building facade before restoration, showing weathered finish",
    afterAlt: "The same facade after preparation and refinishing",
    summary:
      "Failed coating removed back to a sound substrate before a compatible system was applied.",
  },
  {
    slug: "bathroom-renovation",
    label: "Bathroom Renovation",
    discipline: "Tiling & Flooring",
    city: "Port Harcourt",
    before: "/images/before-after/bathroom-renovation-before.jpg",
    after: "/images/before-after/bathroom-renovation-after.jpg",
    beforeAlt: "Bathroom before renovation with original tiling",
    afterAlt: "The same bathroom after tanking, retiling and new sanitaryware",
    summary:
      "Substrate tanked and levelled before retiling, addressing the movement that cracked the original floor.",
  },
];
