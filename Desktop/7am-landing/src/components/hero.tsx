"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

export function Hero() {
  const t = useDictionary();

  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100svh", minHeight: "600px" }}
    >
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/image00001.JPG"
          alt="7AM Community"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Dark gradient overlay — top for nav, bottom for text */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.0) 30%), linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.0) 70%)",
          }}
        />
      </div>

      {/* Text overlay — bottom-left, kismas.com style */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16 md:pb-24">
          <StaggerContainer className="flex flex-col items-start max-w-2xl">

            {/* H1 */}
            <StaggerItem>
              <h1
                style={{
                  fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.0,
                  color: "#FFFFFF",
                }}
              >
                {t.hero.title}{" "}
                <em style={{ fontStyle: "italic" }}>{t.hero.titleHighlight}</em>
              </h1>
            </StaggerItem>

            {/* Subtitle */}
            <StaggerItem className="mt-5">
              <p
                style={{
                  fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.65,
                  maxWidth: "440px",
                }}
              >
                {t.hero.subtitle}
              </p>
            </StaggerItem>

            {/* CTAs */}
            <StaggerItem className="flex flex-wrap items-center gap-4 mt-8">
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2.5 text-[0.875rem] font-medium tracking-[0.02em] transition-all duration-200"
                style={{
                  background: "#FFFFFF",
                  color: "#000000",
                  padding: "0.875rem 1.875rem",
                }}
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
                {t.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                }}
                className="hover:text-white transition-colors"
              >
                {t.hero.learnMore}
              </Link>
            </StaggerItem>

          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
