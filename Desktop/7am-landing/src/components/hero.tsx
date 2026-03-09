"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

export function Hero() {
  const t = useDictionary();

  const stats = [
    { value: "15 000+", label: t.hero.statMembers },
    { value: "95%",     label: t.hero.statSuccess },
    { value: "50+",     label: t.hero.statCountries },
  ];

  return (
    <section className="relative min-h-screen flex flex-col pt-[70px] overflow-hidden bg-background">

      {/* ── Main grid ── */}
      <div className="flex-1 max-w-[1400px] mx-auto px-6 lg:px-12 w-full
                      grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 items-center
                      py-16 md:py-24">

        {/* Left — editorial copy */}
        <StaggerContainer className="flex flex-col items-start text-left order-2 lg:order-1 pt-10 lg:pt-0">

          {/* Eyebrow */}
          <StaggerItem>
            <span className="section-label mb-6 inline-block">{t.hero.badge}</span>
          </StaggerItem>

          {/* Main heading — large, thin weight */}
          <StaggerItem>
            <h1
              className="font-light leading-[1.06] tracking-[-0.025em] text-foreground"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              {t.hero.title}{" "}
              <em className="not-italic font-semibold">{t.hero.titleHighlight}</em>
            </h1>
          </StaggerItem>

          {/* Subtitle */}
          <StaggerItem className="mt-7">
            <p className="text-muted-foreground leading-relaxed max-w-lg"
               style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)" }}>
              {t.hero.subtitle}
            </p>
          </StaggerItem>

          {/* CTAs */}
          <StaggerItem className="flex flex-wrap items-center gap-4 mt-10">
            <Link href="#pricing" className="btn-primary">
              {t.hero.cta}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
            >
              {t.hero.learnMore}
            </Link>
          </StaggerItem>

          {/* Stats row */}
          <StaggerItem className="mt-14 pt-10 border-t border-black/8 w-full">
            <div className="flex flex-wrap gap-10">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-semibold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 tracking-wide uppercase">{s.label}</p>
                </div>
              ))}
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Right — runner image */}
        <Reveal className="order-1 lg:order-2 flex items-center justify-center">
          <div className="relative w-full max-w-[480px] lg:max-w-none mx-auto">
            <Image
              src="/assets/logos/7am-runner.png"
              alt="7AM Runner"
              width={600}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </Reveal>
      </div>

      {/* Bottom thin border */}
      <div className="divider" />
    </section>
  );
}
