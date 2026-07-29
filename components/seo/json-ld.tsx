import { services, siteConfig } from "@/lib/content";

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

/**
 * Root graph. Emitting Organization, WebSite and the service catalogue as one
 * connected @graph (rather than separate islands) is what lets Google resolve
 * them into a single entity, which is the difference between a knowledge panel
 * and three unrelated blobs.
 */
export function OrganizationJsonLd() {
  const orgId = `${siteConfig.site.url}/#organization`;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["GeneralContractor", "LocalBusiness"],
            "@id": orgId,
            name: siteConfig.company.name,
            legalName: siteConfig.company.name,
            url: siteConfig.site.url,
            description: siteConfig.company.description,
            foundingDate: siteConfig.company.established,
            identifier: `RC ${siteConfig.company.rcNumber}`,
            slogan: siteConfig.company.motto,
            telephone: siteConfig.contact.phoneHref,
            email: siteConfig.contact.email,
            address: postalAddress,
            image: `${siteConfig.site.url}/api/og`,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.site.url}/logo-mark.svg`,
            },
            priceRange: "$$",
            currenciesAccepted: "NGN",
            openingHoursSpecification: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "08:00",
              closes: "18:00",
            },
            areaServed: siteConfig.serviceAreas.map((area) => ({
              "@type": "City",
              name: area.city,
              containedInPlace: {
                "@type": "AdministrativeArea",
                name: area.state,
              },
            })),
            knowsAbout: services.map((service) => service.title),
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Engineering, construction and maintenance services",
              itemListElement: services.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: service.title,
                  description: service.summary,
                  url: `${siteConfig.site.url}/services/${service.slug}`,
                  serviceType: service.title,
                  provider: { "@id": orgId },
                  areaServed: siteConfig.serviceAreas.map((a) => a.city),
                },
              })),
            },
            sameAs: Object.values(siteConfig.socials).filter(Boolean),
          },
          {
            "@type": "WebSite",
            "@id": `${siteConfig.site.url}/#website`,
            url: siteConfig.site.url,
            name: siteConfig.company.name,
            description: siteConfig.company.description,
            publisher: { "@id": orgId },
            inLanguage: "en-NG",
          },
        ],
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

/**
 * Per-service schema, linked back to the organization by @id.
 *
 * This is what makes a "plumbing in Abuja" style query resolvable: the service
 * page declares the service type, who provides it, and where — rather than
 * leaving Google to infer all three from prose.
 */
export function ServiceJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        serviceType: name,
        url: `${siteConfig.site.url}/services/${slug}`,
        provider: {
          "@type": "GeneralContractor",
          "@id": `${siteConfig.site.url}/#organization`,
          name: siteConfig.company.name,
          telephone: siteConfig.contact.phoneHref,
          address: postalAddress,
        },
        areaServed: siteConfig.serviceAreas.map((area) => ({
          "@type": "City",
          name: area.city,
        })),
        availableChannel: {
          "@type": "ServiceChannel",
          serviceUrl: `${siteConfig.site.url}/contact`,
          servicePhone: siteConfig.contact.phoneHref,
        },
      }}
    />
  );
}
