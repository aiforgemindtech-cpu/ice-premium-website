import siteConfigJson from "@/content/site.config.json";

/**
 * Site configuration for client components.
 *
 * Deliberately separate from lib/content.ts, which validates everything with
 * zod at module load. That validation belongs in the build — but because three
 * client components imported it for a phone number, zod and the whole content
 * bundle were being shipped to every visitor and the schemas re-run in their
 * browser. Confirmed by finding zod in the client chunks.
 *
 * The JSON is validated by lib/content.ts during the server render of every
 * page, so a malformed config still fails the build. This module just reads
 * the same file without paying for validation twice.
 */

export type SiteConfig = {
  company: {
    name: string;
    shortName: string;
    motto: string;
    rcNumber: string;
    established: string;
    industry: string;
    tagline: string;
    description: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    whatsapp: string;
    whatsappDisplay: string;
    whatsappMessage: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    hours: string;
  };
  socials: Partial<Record<"facebook" | "instagram" | "linkedin" | "x", string>>;
  site: { url: string; locale: string; twitterHandle: string };
  serviceAreas: { city: string; state: string; x: number; y: number; primary: boolean }[];
  nav: { label: string; href: string }[];
  footerNav: { heading: string; links: { label: string; href: string }[] }[];
  stats: { value: number; suffix: string; label: string; raw?: boolean }[];
  trustedBy: string[];
};

const raw = siteConfigJson as unknown as SiteConfig;

export const siteConfig: SiteConfig = {
  ...raw,
  // Unfilled placeholder URLs are dropped here as well as in the validated
  // path, so a client component can never render a link to REPLACE-ME.
  socials: Object.fromEntries(
    Object.entries(raw.socials ?? {}).filter(
      ([, url]) => typeof url === "string" && url && !url.includes("REPLACE-ME"),
    ),
  ) as SiteConfig["socials"],
};

export const whatsappLink = (message?: string): string =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    message ?? siteConfig.contact.whatsappMessage,
  )}`;
