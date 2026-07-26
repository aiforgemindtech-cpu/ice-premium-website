"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
          <span className="relative grid size-10 place-items-center rounded-lg border border-gold/40 bg-gradient-to-br from-gold/20 to-transparent">
            <span className="font-display text-sm font-bold text-gold">ICE</span>
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-base font-bold tracking-tight text-ink">
              {siteConfig.company.name}
            </span>
            <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">
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
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-4 -bottom-0.5 h-px bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
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
          <motion.div
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
