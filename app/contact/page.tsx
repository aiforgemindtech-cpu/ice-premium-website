import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { FaqSection } from "@/components/home/faq-section";
import { PageHero } from "@/components/shared/page-hero";
import { Reveal } from "@/components/shared/reveal";
import { SocialLinks } from "@/components/layout/social-links";
import { BreadcrumbJsonLd, LocalBusinessJsonLd } from "@/components/seo/json-ld";
import { siteConfig, whatsappLink } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a free consultation and site survey from ICE-PREMIUM LIMITED. Engineering, construction and maintenance across Abuja, Lagos, Enugu, Asaba and Port Harcourt.",
  alternates: { canonical: "/contact" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
];

export default function ContactPage() {
  const { contact } = siteConfig;

  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <LocalBusinessJsonLd />

      <PageHero
        eyebrow="Get in touch"
        title="Tell us what you"
        accent="are building."
        description="The initial consultation and site survey cost you nothing and carry no obligation. Send the form below, or call us directly."
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="text-2xl sm:text-3xl">Send an enquiry</h2>
            <p className="mt-4 text-lg text-body">
              The more detail you give us, the more useful our first response
              will be.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="rounded-2xl border border-white/10 bg-navy-surface/50 p-8">
              <h2 className="mono-label">Direct contact</h2>
              <ul className="mt-6 flex flex-col gap-6">
                <li className="flex gap-4">
                  <Phone className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.phoneHref}`}
                      className="mt-1 block text-lg text-ink transition-colors hover:text-gold"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MessageCircle
                    className="mt-1 size-5 shrink-0 text-gold"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      WhatsApp
                    </p>
                    <a
                      href={whatsappLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 block text-lg text-ink transition-colors hover:text-gold"
                    >
                      {contact.whatsappDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block break-all text-lg text-ink transition-colors hover:text-gold"
                    >
                      {contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <MapPin className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      Office
                    </p>
                    <address className="mt-1 not-italic text-base text-body">
                      {contact.addressLine1}
                      <br />
                      {contact.addressLine2}
                      <br />
                      {contact.city}, {contact.country}
                    </address>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock className="mt-1 size-5 shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted">
                      Hours
                    </p>
                    <p className="mt-1 text-base text-body">{contact.hours}</p>
                  </div>
                </li>
              </ul>

              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-3 rounded-full border border-gold/40 bg-gold/10 px-6 py-4 font-semibold text-gold transition-colors hover:bg-gold/20"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-5" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Z" />
                </svg>
                Chat on WhatsApp
              </a>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mono-label">Follow</p>
                <SocialLinks className="mt-4" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection />
    </>
  );
}
