import { AnimatedStats } from "@/components/home/animated-stats";
import { BeforeAfterFeature } from "@/components/home/before-after-feature";
import { FaqSection } from "@/components/home/faq-section";
import { FinalCta } from "@/components/home/final-cta";
import { LatestBlog } from "@/components/home/latest-blog";
import { Marquee } from "@/components/home/marquee";
import { Overview } from "@/components/home/overview";
import { ProcessTimeline } from "@/components/home/process-timeline";
import { ProjectShowcase } from "@/components/home/project-showcase";
import { ServiceAreas } from "@/components/home/service-areas";
import { ServicesGrid } from "@/components/home/services-grid";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { Hero } from "@/components/hero/hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Overview />
      <ServicesGrid />
      <WhyChooseUs />
      <ProcessTimeline />
      <ProjectShowcase />
      <BeforeAfterFeature />
      <AnimatedStats />
      <ServiceAreas />
      <TestimonialsSection />
      <LatestBlog />
      <FaqSection />
      <FinalCta />
    </>
  );
}
