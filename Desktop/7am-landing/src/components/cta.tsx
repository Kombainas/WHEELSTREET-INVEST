"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

export function CTA() {
  const t = useDictionary();

  return (
    <section className="relative py-24 md:py-32 overflow-hidden" style={{ background: "#000000", color: "#FFFFFF" }}>
      <Image
        src="/images/image00012.JPG"
        alt=""
        fill
        className="object-cover object-center opacity-20"
      />
      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Left heading */}
          <Reveal>
            <h2
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.06,
                color: "#FFFFFF",
              }}
            >
              {t.cta.title}{" "}
              <em style={{ fontStyle: "italic" }}>{t.cta.titleHighlight}</em>
            </h2>
          </Reveal>

          {/* Right — text + button */}
          <Reveal delay={0.12} className="flex flex-col gap-8">
            <p style={{ fontSize: "0.9375rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "420px" }}>
              {t.cta.subtitle}
            </p>

            <div>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2.5 text-[0.875rem] font-medium tracking-[0.02em] transition-all duration-200"
                style={{ background: "#FFFFFF", color: "#000000", padding: "0.8125rem 1.75rem" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 2px #FFFFFF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.color = "#000000";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {t.cta.button}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap gap-6 text-[0.8125rem] pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
            >
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
