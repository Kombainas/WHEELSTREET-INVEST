"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

export function CTA() {
  const t = useDictionary();

  return (
    <section className="bg-foreground text-background py-24 md:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — heading */}
          <Reveal>
            <h2
              className="font-light tracking-tight leading-[1.08] text-background"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}
            >
              {t.cta.title}{" "}
              <em className="not-italic font-semibold">{t.cta.titleHighlight}</em>
            </h2>
          </Reveal>

          {/* Right — text + CTA */}
          <Reveal delay={0.15} className="flex flex-col gap-8">
            <p className="text-background/70 leading-relaxed max-w-md">
              {t.cta.subtitle}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 bg-background text-foreground px-7 py-3.5 text-sm font-medium tracking-wide
                           transition-all duration-200 hover:bg-background/90"
              >
                {t.cta.button}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-6 text-sm text-background/50 border-t border-background/10 pt-6">
              <span>✓ {t.cta.noCard}</span>
              <span>✓ {t.cta.trial}</span>
              <span>✓ {t.cta.cancel}</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
