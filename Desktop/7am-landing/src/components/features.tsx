"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

export function Features() {
  const t = useDictionary();

  return (
    <section id="features" className="bg-white">

      {/* ── Editorial section 1 — image LEFT, text RIGHT ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Image column */}
          <div className="relative overflow-hidden bg-black img-zoom" style={{ minHeight: "420px" }}>
            <Image
              src="/images/image00002.JPG"
              alt="7AM Community"
              fill
              className="object-cover object-center"
            />
          </div>

          {/* Text column */}
          <Reveal className="flex items-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div style={{ maxWidth: "460px" }}>
              <span className="section-label mb-6 inline-block">{t.features.label}</span>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.08,
                }}
              >
                {t.features.title}{" "}
                <em style={{ fontStyle: "italic" }}>{t.features.titleHighlight}</em>
              </h2>
              <p
                className="text-black/55 mt-6 leading-relaxed"
                style={{ fontSize: "0.9375rem", maxWidth: "380px" }}
              >
                {t.features.subtitle}
              </p>
              <Link
                href="#programs"
                className="inline-flex items-center gap-2 mt-10 text-[0.875rem] font-medium transition-all duration-200"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)", padding: "0.75rem 1.5rem" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#000";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#000";
                }}
              >
                {t.features.items[0].title}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Editorial section 2 — text LEFT, image RIGHT ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* Text column */}
          <Reveal
            className="flex items-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24 order-2 lg:order-1"
          >
            <div style={{ maxWidth: "460px" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.08,
                }}
              >
                {t.features.items[2].title}
              </h2>
              <p
                className="text-black/55 mt-6 leading-relaxed"
                style={{ fontSize: "0.9375rem", maxWidth: "380px" }}
              >
                {t.features.items[2].description}
              </p>
              <Link
                href="#programs"
                className="inline-flex items-center gap-2 mt-10 text-[0.875rem] font-medium transition-all duration-200"
                style={{ boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)", padding: "0.75rem 1.5rem" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#000";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#000";
                }}
              >
                {t.features.items[3].title}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          {/* Image column */}
          <div
            className="relative overflow-hidden order-1 lg:order-2 img-zoom"
            style={{ minHeight: "420px", background: "#000" }}
          >
            <Image
              src="/images/image00003.JPG"
              alt="7AM Morning routine"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* ── Editorial section 3 — image LEFT, text RIGHT ── */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* Image / stat column */}
          <div
            className="relative overflow-hidden flex items-center justify-center"
            style={{ minHeight: "360px", background: "#000" }}
          >
            <Image
              src="/images/image00004.JPG"
              alt="7AM lifestyle"
              fill
              className="object-cover object-center opacity-50"
            />
            <div className="relative text-center px-12">
              <p
                style={{
                  fontSize: "clamp(4rem, 10vw, 7rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.04em",
                  color: "#FFFFFF",
                  lineHeight: 1,
                }}
              >
                7:00
              </p>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 500,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  marginTop: "1rem",
                }}
              >
                AM
              </p>
            </div>
          </div>

          {/* Text column */}
          <Reveal className="flex items-center px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div style={{ maxWidth: "460px" }}>
              <h2
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.08,
                }}
              >
                {t.features.items[4].title}
              </h2>
              <p
                className="text-black/55 mt-6 leading-relaxed"
                style={{ fontSize: "0.9375rem", maxWidth: "380px" }}
              >
                {t.features.items[4].description}
              </p>
              <Link
                href="#pricing"
                className="inline-flex items-center gap-2 mt-10 text-[0.875rem] font-medium transition-all duration-200"
                style={{ background: "#000", color: "#fff", padding: "0.875rem 1.75rem" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#000";
                  (e.currentTarget as HTMLElement).style.boxShadow = "inset 0 0 0 2px #000";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#000";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {t.hero.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

    </section>
  );
}
