import { z } from "zod";

import generated from "@/content/.generated/content.json";
import faqsJson from "@/content/faqs.json";
import projectsJson from "@/content/projects.json";
import siteConfigJson from "@/content/site.config.json";
import testimonialsJson from "@/content/testimonials.json";

const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const siteConfigSchema = z.object({
  company: z.object({
    name: z.string(),
    shortName: z.string(),
    motto: z.string(),
    rcNumber: z.string(),
    established: z.string(),
    industry: z.string(),
    tagline: z.string(),
    description: z.string(),
  }),
  contact: z.object({
    phone: z.string(),
    phoneHref: z.string(),
    whatsapp: z.string(),
    whatsappDisplay: z.string(),
    whatsappMessage: z.string(),
    email: z.string(),
    addressLine1: z.string(),
    addressLine2: z.string(),
    city: z.string(),
    country: z.string(),
    hours: z.string(),
  }),
  socials: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    x: z.string().optional(),
  }),
  site: z.object({
    url: z.string(),
    locale: z.string(),
    twitterHandle: z.string(),
  }),
  serviceAreas: z.array(
    z.object({
      city: z.string(),
      state: z.string(),
      x: z.number(),
      y: z.number(),
      primary: z.boolean(),
    }),
  ),
  nav: z.array(linkSchema),
  footerNav: z.array(
    z.object({ heading: z.string(), links: z.array(linkSchema) }),
  ),
  stats: z.array(
    z.object({
      value: z.number(),
      suffix: z.string(),
      label: z.string(),
      raw: z.boolean().optional(),
    }),
  ),
  trustedBy: z.array(z.string()),
});

const serviceSchema = z.object({
  title: z.string(),
  slug: z.string(),
  order: z.number(),
  icon: z.string(),
  summary: z.string(),
  heroImage: z.string(),
  benefits: z.array(z.object({ title: z.string(), description: z.string() })),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  process: z.array(
    z.object({ step: z.string(), title: z.string(), description: z.string() }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  related: z.array(z.string()),
  html: z.string(),
});

const postSchema = z.object({
  title: z.string(),
  slug: z.string(),
  category: z.string(),
  date: z.string(),
  excerpt: z.string(),
  readingTime: z.number(),
  image: z.string(),
  html: z.string(),
});

const projectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  discipline: z.string(),
  city: z.string(),
  year: z.string(),
  summary: z.string(),
  scope: z.array(z.string()),
  challenge: z.string(),
  solution: z.string(),
  outcome: z.string(),
  featured: z.boolean(),
  size: z.enum(["large", "small"]),
  image: z.string(),
  gallery: z.array(z.string()),
});

const testimonialSchema = z.object({
  id: z.string(),
  placeholder: z.boolean(),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  city: z.string(),
  service: z.string(),
  rating: z.number().min(1).max(5),
});

const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type Service = z.infer<typeof serviceSchema>;
export type Post = z.infer<typeof postSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Faq = z.infer<typeof faqSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(siteConfigJson);
export const services: Service[] = z
  .array(serviceSchema)
  .parse(generated.services);
export const posts: Post[] = z.array(postSchema).parse(generated.posts);
export const projects: Project[] = z
  .array(projectSchema)
  .parse(projectsJson);
export const testimonials: Testimonial[] = z
  .array(testimonialSchema)
  .parse(testimonialsJson.items);
export const faqs: Faq[] = z.array(faqSchema).parse(faqsJson);

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug);

export const getPost = (slug: string): Post | undefined =>
  posts.find((p) => p.slug === slug);

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getRelatedServices = (service: Service): Service[] =>
  service.related
    .map((slug) => getService(slug))
    .filter((s): s is Service => Boolean(s));

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** True while any testimonial is still sample copy, which drives a visible notice in the UI. */
export const hasPlaceholderTestimonials: boolean = testimonials.some(
  (t) => t.placeholder,
);

export const whatsappLink = (message?: string): string =>
  `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(
    message ?? siteConfig.contact.whatsappMessage,
  )}`;

export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
