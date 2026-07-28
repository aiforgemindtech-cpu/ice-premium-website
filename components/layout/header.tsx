"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-all duration-500",
        scrolled
          ? "border-b border-white/10 bg-navy/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-3"
          aria-label={`${siteConfig.company.name} home`}
        >
          <LogoMark className="size-10 shrink-0 text-ink transition-opacity group-hover:opacity-90" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-ink">
              ICE PREMIUM
              <span className="ml-1.5 align-middle rounded-sm bg-gold px-1.5 py-0.5 font-mono text-[0.5rem] font-medium uppercase tracking-[0.2em] text-navy">
                Limited
              </span>
            </span>
            <span className="mt-1.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
              RC {siteConfig.company.rcNumber}
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex h-11 items-center rounded-full px-4 text-sm transition-colors",
                      active ? "text-gold" : "text-body hover:text-ink",
                    )}
                  >
                    {item.label}
                    {/* Plain span rather than a `layoutId` shared-element
                        animation: that is a layout animation, which would pull
                        Framer's `domMax` feature bundle into the first load for
                        a sliding underline nobody asked for. */}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link href="/contact">Start Your Project</Link>
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-ink transition-colors hover:border-gold/60 lg:hidden"
          >
            {open ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-navy/98 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="container-page py-6">
              <ul className="flex flex-col">
                {siteConfig.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex h-14 items-center border-b border-white/5 font-display text-lg text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="mt-6 w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Start Your Project
                </Link>
              </Button>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
