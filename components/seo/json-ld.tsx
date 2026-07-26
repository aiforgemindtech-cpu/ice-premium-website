import { siteConfig } from "@/lib/content";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from first-party config, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${siteConfig.contact.addressLine1}, ${siteConfig.contact.addressLine2}`,
  addressLocality: siteConfig.contact.city,
  addressCountry: siteConfig.contact.country,
};

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "GeneralContractor",
        name: siteConfig.company.name,
        legalName: siteConfig.company.name,
        url: siteConfig.site.url,
        description: siteConfig.company.description,
        foundingDate: siteConfig.company.established,
        identifier: `RC ${siteConfig.company.rcNumber}`,
        slogan: siteConfig.company.motto,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: postalAddress,
        areaServed: siteConfig.serviceAreas.map((area) => ({
          "@type": "City",
          name: area.city,
        })),
        sameAs: Object.values(siteConfig.socials).filter(Boolean),
      }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.company.name,
        url: `${siteConfig.site.url}/contact`,
        telephone: siteConfig.contact.phone,
        email: siteConfig.contact.email,
        address: postalAddress,
        openingHours: siteConfig.contact.hours,
        areaServed: siteConfig.serviceAreas.map((area) => area.city).join(", "),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: `${siteConfig.site.url}${item.href}`,
        })),
      }}
    />
  );
}

export function BlogPostingJsonLd({
  title,
  description,
  date,
  slug,
  image,
}: {
  title: string;
  description: string;
  date: string;
  slug: string;
  image: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: title,
        description,
        datePublished: date,
        dateModified: date,
        image: `${siteConfig.site.url}${image}`,
        mainEntityOfPage: `${siteConfig.site.url}/blog/${slug}`,
        author: { "@type": "Organization", name: siteConfig.company.name },
        publisher: { "@type": "Organization", name: siteConfig.company.name },
      }}
    />
  );
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}
