import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { PlaceholderNotice } from "@/components/shared/placeholder-notice";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms on which ICE-PREMIUM LIMITED provides this website and the basis on which quotations and works are carried out.",
  alternates: { canonical: "/terms" },
};

const BREADCRUMBS = [
  { name: "Home", href: "/" },
  { name: "Terms of Service", href: "/terms" },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={BREADCRUMBS} />
      <PageHero
        eyebrow="Legal"
        title="Terms of"
        accent="Service"
        breadcrumbs={BREADCRUMBS}
      />

      <section className="section">
        <div className="container-page max-w-3xl">
          <PlaceholderNotice className="mb-10">
            These terms are a good-faith general template, not legal advice. Have
            them reviewed by a qualified lawyer — particularly the liability and
            warranty sections — before launch.
          </PlaceholderNotice>

          <div className="prose-ice">
            <p>
              These terms govern your use of this website, operated by{" "}
              {siteConfig.company.name} (RC {siteConfig.company.rcNumber}).
            </p>

            <h2>Website content</h2>
            <p>
              We aim to keep the information on this site accurate and current,
              but it is provided for general information. Nothing on this site
              is a contractual offer, a quotation, or professional advice for
              your specific situation.
            </p>
            <p>
              Imagery on this site currently includes placeholder graphics
              standing in for project photography. Where an image is a
              placeholder it is labelled as such and does not depict work
              carried out by {siteConfig.company.name}.
            </p>

            <h2>Quotations and works</h2>
            <p>
              Any figure discussed before a site survey is indicative only. A
              binding price is issued in writing after a condition survey, and
              is set against the scope described in that written proposal.
            </p>
            <p>
              Changes to that scope — whether requested by you or arising from
              conditions the survey could not reasonably identify — are issued
              as written variations, with cost and programme impact, for your
              approval before the affected work proceeds.
            </p>

            <h2>Intellectual property</h2>
            <p>
              The content, design and code of this website belong to{" "}
              {siteConfig.company.name} unless otherwise stated. You may view
              and share it, but not reproduce it commercially without our
              permission.
            </p>

            <h2>Liability</h2>
            <p>
              We do not exclude liability where it would be unlawful to do so.
              Subject to that, we are not liable for loss arising from reliance
              on general information published on this website, as distinct from
              advice given to you directly in respect of your project.
            </p>

            <h2>External links</h2>
            <p>
              Where this site links to third-party sites, we do not control them
              and are not responsible for their content or practices.
            </p>

            <h2>Governing law</h2>
            <p>
              These terms are governed by the laws of the Federal Republic of
              Nigeria.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms can be sent to{" "}
              <a href={`mailto:${siteConfig.contact.email}`}>
                {siteConfig.contact.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
