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
    <section id="programs" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <Reveal>
            <span className="section-label">{t.programs.label}</span>
            <h2
              className="font-light tracking-tight leading-[1.1] mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {t.programs.title}{" "}
              <span className="font-semibold">{t.programs.titleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-muted-foreground mt-4 leading-relaxed">{t.programs.subtitle}</p>
          </Reveal>
        </div>

        {/* Pricing cards — bordered grid */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-black/8"
          staggerDelay={0.1}
        >
          {programs.map((program) => (
            <StaggerItem key={program.name} className="h-full">
              <div
                className={`border-r border-b border-black/8 h-full flex flex-col p-8 transition-colors duration-200 ${
                  program.popular
                    ? "bg-foreground text-background"
                    : "bg-background hover:bg-secondary"
                }`}
              >
                {/* Plan label */}
                <div className="mb-8">
                  {program.popular && (
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase border border-background/30 px-2 py-1 mb-4 inline-block text-background/80">
                      {t.programs.mostPopular}
                    </span>
                  )}
                  <h3 className="text-xl font-semibold mt-1">{program.name}</h3>
                  <p className={`text-sm mt-1 ${program.popular ? "text-background/70" : "text-muted-foreground"}`}>
                    {program.description}
                  </p>
                </div>

                {/* Price */}
                <div className={`mb-8 pb-8 border-b ${program.popular ? "border-background/15" : "border-black/8"}`}>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-light tracking-tight">€{program.price}</span>
                    <span className={`text-sm ${program.popular ? "text-background/60" : "text-muted-foreground"}`}>
                      /{program.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-10 flex-1">
                  {program.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${program.popular ? "text-background/70" : "text-foreground/60"}`} />
                      <span className={program.popular ? "text-background/80" : "text-muted-foreground"}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="#"
                  className={`w-full text-center py-3 text-sm font-medium tracking-wide transition-all duration-200 block ${
                    program.popular
                      ? "bg-background text-foreground hover:bg-background/90"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-background"
                  }`}
                >
                  {t.programs.getStarted}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Reveal delay={0.4} className="mt-8">
          <p className="text-sm text-muted-foreground text-center">
            {t.programs.trialNote}{" "}
            <span className="text-foreground font-medium">{t.programs.cancelAnytime}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
