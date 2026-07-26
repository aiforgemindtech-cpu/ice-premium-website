import {
  Award,
  Building2,
  ClipboardCheck,
  HardHat,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

const VALUES = [
  {
    icon: ClipboardCheck,
    title: "We survey before we price",
    body: "A written scope built from an actual condition survey, not a walkthrough estimate that moves once work starts.",
  },
  {
    icon: Users,
    title: "One point of accountability",
    body: "Twelve trades under one contract. Interfaces between them are ours to resolve, not yours to arbitrate.",
  },
  {
    icon: ShieldCheck,
    title: "Written variations only",
    body: "Any change to cost or programme is agreed in writing before it is carried out — never added to the final invoice.",
  },
  {
    icon: Building2,
    title: "Built for occupied buildings",
    body: "Phased programmes, dust barriers and out-of-hours scheduling so your operation keeps running through the works.",
  },
  {
    icon: HardHat,
    title: "Documented handover",
    body: "You receive a record of what was installed and where, which makes every future repair faster and cheaper.",
  },
  {
    icon: Award,
    title: "Honest specification",
    body: "If a finish you like will be a maintenance problem in your environment, we tell you before it is ordered.",
  },
];

/** Section 4 — why choose us. */
export function WhyChooseUs() {
  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why ICE-Premium"
          title="The difference is in"
          accent="what happens before the work."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <Reveal as="li" key={value.title} delay={(i % 3) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-navy p-7">
                <value.icon className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-3 text-base text-body">{value.body}</p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-500 group-hover:w-full"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
