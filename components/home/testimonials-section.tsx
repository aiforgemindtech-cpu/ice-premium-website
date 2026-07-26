import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { SectionHeading } from "@/components/shared/section-heading";
import { hasPlaceholderTestimonials, testimonials } from "@/lib/content";

export function TestimonialsSection() {
  return (
    <section className="section border-t border-white/10 bg-navy-surface/20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Client feedback"
          title="What clients say"
          accent="about working with us."
          align="center"
        />

        {hasPlaceholderTestimonials && (
          <PlaceholderNotice className="mx-auto mt-8 max-w-2xl">
            The quotes below are sample copy demonstrating this layout — they are
            not real client testimonials. Replace them in{" "}
            <code className="text-gold">content/testimonials.json</code> before
            launch.
          </PlaceholderNotice>
        )}

        <div className="mt-12">
          <TestimonialsCarousel items={testimonials} />
        </div>
      </div>
    </section>
  );
}
