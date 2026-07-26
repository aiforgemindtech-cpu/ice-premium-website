import { FaqAccordion } from "@/components/shared/faq-accordion";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqJsonLd } from "@/components/seo/json-ld";
import { faqs } from "@/lib/content";

/** Section 12 — FAQs. */
export function FaqSection() {
  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      <FaqJsonLd items={faqs} />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Questions"
            title="Answers to what"
            accent="clients ask first."
            description="If your question is not here, ask us directly — we would rather answer it before you commit to anything."
          />
        </div>
        <Reveal delay={0.15} className="lg:col-span-7">
          <FaqAccordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
