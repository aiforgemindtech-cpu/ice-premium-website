import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";

/** Section 13 — closing CTA on a glass panel. */
export function FinalCta() {
  return (
    <section className="section border-t border-white/10">
      <div className="container-page">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-14 lg:py-20">
            {/* Particle-suggesting backdrop, rendered in CSS so it costs nothing. */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(212,175,55,0.16),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(212,175,55,0.12),transparent_45%)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:34px_34px]"
            />

            <div className="relative mx-auto max-w-3xl">
              <p className="mono-label mb-5">Start here</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl">
                Tell us what you are building.{" "}
                <span className="text-gold">We will survey it properly.</span>
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-body">
                The initial consultation and site survey cost you nothing and
                carry no obligation. You will get a written scope and a fixed
                price against it — not an estimate that moves later.
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <a href={`tel:${siteConfig.contact.phoneHref}`}>
                    {siteConfig.contact.phone}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
