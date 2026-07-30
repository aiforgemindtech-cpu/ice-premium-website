import { FileCheck, Handshake, ShieldCheck, Timer } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";

/**
 * Shown in place of testimonials until real, attributable client quotes exist.
 *
 * A company founded in 2025 has not accumulated a wall of testimonials yet, and
 * inventing them is both dishonest and obvious to a reader. These are written
 * commitments instead — each one is a thing the client can hold ICE-Premium to,
 * which is more persuasive than an unverifiable quote.
 */
const COMMITMENTS = [
  {
    icon: FileCheck,
    title: "A price, not an estimate",
    body: "Every quotation follows a written condition survey. The figure you receive is the figure you pay, unless you ask for something different in writing.",
  },
  {
    icon: ShieldCheck,
    title: "No variation without your signature",
    body: "Nothing that changes cost or programme is carried out until you have agreed it in writing. Nothing lands on the final invoice as a surprise.",
  },
  {
    icon: Handshake,
    title: "One point of accountability",
    body: "Twelve trades under one contract. Where they meet is our problem to sequence and resolve, never yours to arbitrate between subcontractors.",
  },
  {
    icon: Timer,
    title: "Dates you can plan around",
    body: "A programme with real dates rather than a range, and out-of-hours phasing where the building has to stay in use throughout.",
  },
];

export function Commitments() {
  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our commitments"
          title="What we put"
          accent="in writing."
          align="center"
          description="ICE-Premium was established in 2025. Rather than publish testimonials we cannot yet attribute, here is what every client is entitled to hold us to."
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2">
          {COMMITMENTS.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 2) * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-navy p-8">
                <item.icon className="size-6 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-display text-lg font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-base text-body">{item.body}</p>
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
