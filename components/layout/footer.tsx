import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { LogoLockup } from "@/components/brand/logo-mark";
import { SocialLinks } from "@/components/layout/social-links";
import { services, siteConfig, whatsappLink } from "@/lib/content";

export function Footer() {
  const { company, contact, footerNav } = siteConfig;

  return (
    <footer className="border-t border-white/10 bg-navy-surface/40">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoLockup showMotto />
            <p className="mt-5 max-w-sm text-base text-body">
              {company.description}
            </p>
            <p className="mono-label mt-6 text-muted">{company.motto}</p>
            <SocialLinks className="mt-6" />
          </div>

          <div className="lg:col-span-3">
            <h2 className="mono-label">Services</h2>
            <ul className="mt-3 flex flex-col">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex min-h-11 items-center text-base text-body transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="inline-flex min-h-11 items-center text-base font-medium text-gold transition-colors hover:text-gold-light"
                >
                  All 12 services →
                </Link>
              </li>
            </ul>
          </div>

          {footerNav.map((group) => (
            <div key={group.heading} className="lg:col-span-2">
              <h2 className="mono-label">{group.heading}</h2>
              <ul className="mt-3 flex flex-col">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex min-h-11 items-center text-base text-body transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-3">
            <h2 className="mono-label">Get in touch</h2>
            <ul className="mt-5 flex flex-col gap-4 text-base text-body">
              <li className="flex gap-3">
                <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`tel:${contact.phoneHref}`}
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MessageCircle
                  className="mt-1 size-4 shrink-0 text-gold"
                  aria-hidden="true"
                />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-gold"
                >
                  WhatsApp {contact.whatsappDisplay}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex min-h-11 items-center break-all transition-colors hover:text-gold"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <address className="not-italic">
                  {contact.addressLine1}
                  <br />
                  {contact.addressLine2}
                  <br />
                  {contact.city}, {contact.country}
                </address>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-1 size-4 shrink-0 text-gold" aria-hidden="true" />
                <span>{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            © {new Date().getFullYear()} {company.name} · RC {company.rcNumber}
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted">
            {siteConfig.serviceAreas.map((a) => a.city).join(" · ")}
          </p>
        </div>
      </div>
    </footer>
  );
}
