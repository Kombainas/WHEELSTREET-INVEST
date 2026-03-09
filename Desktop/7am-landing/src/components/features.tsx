"use client";

import { Clock, Brain, Target, Users, TrendingUp, Shield } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

const featureIcons = [Clock, Brain, Target, Users, TrendingUp, Shield];

export function Features() {
  const t = useDictionary();

  const features = featureIcons.map((Icon, i) => ({
    Icon,
    title: t.features.items[i].title,
    description: t.features.items[i].description,
  }));

  return (
    <section id="features" className="py-24 md:py-32 bg-background">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 md:mb-20">
          <Reveal>
            <span className="section-label">{t.features.label}</span>
            <h2
              className="font-light tracking-tight leading-[1.1] mt-4 text-foreground"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {t.features.title}{" "}
              <span className="font-semibold">{t.features.titleHighlight}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-end">
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t.features.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Feature grid — 3 cols, thin bordered cards */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-black/8"
          staggerDelay={0.06}
        >
          {features.map(({ Icon, title, description }) => (
            <StaggerItem key={title}>
              <div className="editorial-card border-r border-b border-black/8 h-full min-h-[220px] group">
                <div className="w-10 h-10 border border-black/12 flex items-center justify-center mb-5
                                group-hover:bg-foreground group-hover:border-foreground transition-colors duration-200">
                  <Icon className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-200" />
                </div>
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
