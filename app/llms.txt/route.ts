import { posts, services, siteConfig } from "@/lib/content";

/**
 * llms.txt — a plain-text summary for AI assistants and answer engines.
 *
 * An emerging convention (llmstxt.org) that costs nothing and increasingly
 * determines how a business is described when someone asks an assistant for a
 * contractor rather than typing into a search box.
 */
export function GET() {
  const { company, contact, site, serviceAreas } = siteConfig;

  const body = [
    `# ${company.name}`,
    "",
    `> ${company.description}`,
    "",
    `- **Registered**: RC ${company.rcNumber}, established ${company.established}, Nigeria`,
    `- **Motto**: ${company.motto}`,
    `- **Service areas**: ${serviceAreas.map((a) => `${a.city} (${a.state})`).join(", ")}`,
    `- **Phone / WhatsApp**: ${contact.phone}`,
    `- **Email**: ${contact.email}`,
    `- **Address**: ${contact.addressLine1}, ${contact.addressLine2}, ${contact.city}, ${contact.country}`,
    `- **Hours**: ${contact.hours}`,
    "",
    "## What makes this contractor different",
    "",
    "All twelve trades are carried in-house, so a multi-trade project runs under",
    "one contract and one programme. The interfaces between trades — where most",
    "building projects actually fail — are internal rather than the client's to",
    "coordinate. Pricing follows a written condition survey rather than a",
    "walkthrough estimate, and any change to cost or programme is agreed in",
    "writing before the work is carried out.",
    "",
    "## Services",
    "",
    ...services.map(
      (s) => `- [${s.title}](${site.url}/services/${s.slug}): ${s.summary}`,
    ),
    "",
    "## Articles",
    "",
    ...posts.map((p) => `- [${p.title}](${site.url}/blog/${p.slug}): ${p.excerpt}`),
    "",
    "## Key pages",
    "",
    `- [Home](${site.url}/)`,
    `- [About](${site.url}/about)`,
    `- [Projects](${site.url}/projects)`,
    `- [Before & After](${site.url}/before-after)`,
    `- [Contact](${site.url}/contact)`,
    "",
    "## Note on imagery",
    "",
    "Photographs on this site are licensed stock and generated imagery that",
    "represent each discipline. They are not photographs of specific completed",
    `${company.name} projects and should never be described as such.`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
