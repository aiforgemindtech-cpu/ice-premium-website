import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How ICE-PREMIUM LIMITED collects, uses and stores the personal information you provide through this website.",
  alternates: { canonical: "/privacy" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Privacy Policy", href: "/privacy" },
];

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Legal"
        title="Privacy"
        accent="Policy"
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page max-w-3xl">
          <PlaceholderNotice className="mb-10">
            This policy is a good-faith general template, not legal advice. Have
            it reviewed against the Nigeria Data Protection Act and your actual
            data handling before launch.
          </PlaceholderNotice>

          <div className="prose-ice">
            <p>
              This policy explains what personal information{" "}
              {siteConfig.company.name} (RC {siteConfig.company.rcNumber})
              collects through this website, why we collect it, and what we do
              with it.
            </p>

            <h2>What we collect</h2>
            <p>
              We collect only what you choose to send us. When you submit the
              contact form, that is your name, email address, an optional phone
              number, the service and location you selected, and the message you
              wrote.
            </p>
            <p>
              We do not use advertising cookies, tracking pixels, or third-party
              analytics scripts that profile you across sites. Aggregate traffic
              statistics are collected server-side by our hosting provider and
              are not tied to individual identities.
            </p>

            <h2>Why we collect it</h2>
            <p>
              Solely to respond to your enquiry and, if you engage us, to
              deliver the work. We do not sell your information, and we do not
              share it with third parties for marketing.
            </p>

            <h2>How it is handled</h2>
            <p>
              Contact form submissions are delivered to our email inbox through
              a transactional email provider. They are stored in that inbox for
              as long as needed to handle your enquiry and any resulting work,
              plus any period required for our business records.
            </p>

            <h2>Your rights</h2>
            <p>
              You can ask us what information we hold about you, ask us to
              correct it, or ask us to delete it. Contact us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>{" "}
              and we will respond.
            </p>

            <h2>Third parties</h2>
            <p>
              This site is hosted on Cloudflare and uses a transactional email
              provider to deliver contact form submissions. Both process data on
              our behalf under their own terms.
            </p>

            <h2>Changes</h2>
            <p>
              If this policy changes materially we will update this page. Check
              back if it matters to you.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              , or by post to {siteConfig.contact.addressLine1},{" "}
              {siteConfig.contact.addressLine2}, {siteConfig.contact.city},{" "}
              {siteConfig.contact.country}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
