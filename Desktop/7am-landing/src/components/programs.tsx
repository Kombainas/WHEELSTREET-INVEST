"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

const PRICES = [29, 79, 199];

export function Programs() {
  const t = useDictionary();

  const programs = t.programs.plans.map((plan, i) => ({
    name: plan.name,
    description: plan.description,
    price: PRICES[i],
    period: t.programs.month,
    popular: i === 1,
    features: plan.features,
  }));

  return (
    <section id="programs" className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-xl mb-16 md:mb-20">
          <Reveal>
            <span className="section-label mb-5 inline-block">{t.programs.label}</span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.08,
              }}
            >
              {t.programs.title}{" "}
              <em style={{ fontStyle: "italic" }}>{t.programs.titleHighlight}</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[0.9375rem] text-black/60 mt-4 leading-relaxed">
              {t.programs.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Cards — gap-px grid, popular card inverted black */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10"
          staggerDelay={0.1}
        >
          {programs.map((program) => (
            <StaggerItem key={program.name} className="h-full">
              <div
                className="h-full flex flex-col p-8 md:p-10 transition-colors duration-200"
                style={{
                  background: program.popular ? "#000000" : "#FFFFFF",
                  color: program.popular ? "#FFFFFF" : "#000000",
                }}
              >
                {/* Label */}
                <div className="mb-8">
                  {program.popular && (
                    <span
                      className="inline-block text-[0.625rem] font-medium tracking-[0.15em] uppercase mb-4 px-2 py-1"
                      style={{ border: "1px solid rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.7)" }}
                    >
                      {t.programs.mostPopular}
                    </span>
                  )}
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 500, letterSpacing: "-0.01em" }}>
                    {program.name}
                  </h3>
                  <p
                    style={{ fontSize: "0.875rem", marginTop: "0.25rem" }}
                    className={program.popular ? "text-white/60" : "text-black/50"}
                  >
                    {program.description}
                  </p>
                </div>

                {/* Price */}
                <div
                  className="mb-8 pb-8"
                  style={{ borderBottom: program.popular ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-baseline gap-1">
                    <span style={{ fontSize: "clamp(2.5rem, 4vw, 3rem)", fontWeight: 300, letterSpacing: "-0.02em" }}>
                      €{program.price}
                    </span>
                    <span
                      style={{ fontSize: "0.875rem" }}
                      className={program.popular ? "text-white/50" : "text-black/40"}
                    >
                      /{program.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3.5 flex-1 mb-10">
                  {program.features.map((f) => (
                    <li key={f} className="flex items-start gap-3" style={{ fontSize: "0.875rem" }}>
                      <Check
                        className="w-4 h-4 shrink-0 mt-0.5"
                        style={{ color: program.popular ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)" }}
                      />
                      <span className={program.popular ? "text-white/75" : "text-black/60"}>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#"
                  className="w-full text-center py-3.5 text-[0.875rem] font-medium tracking-[0.02em] transition-all duration-200 block"
                  style={
                    program.popular
                      ? { background: "#FFFFFF", color: "#000000" }
                      : { boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2)", color: "#000000" }
                  }
                  onMouseEnter={(e) => {
                    if (!program.popular) {
                      (e.currentTarget as HTMLElement).style.background = "#000000";
                      (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!program.popular) {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                      (e.currentTarget as HTMLElement).style.color = "#000000";
                    }
                  }}
                >
                  {t.programs.getStarted}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.4} className="mt-8 text-center">
          <p className="text-[0.8125rem] text-black/40">
            {t.programs.trialNote}{" "}
            <span className="text-black font-medium">{t.programs.cancelAnytime}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
