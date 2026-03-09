"use client";

import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

const avatarInitials = ["SC", "MJ", "ER", "DP", "LT", "AK"];

function TestimonialCard({
  testimonial,
}: {
  testimonial: { name: string; role: string; content: string; avatar: string };
}) {
  return (
    <div className="w-[340px] editorial-card group h-full flex flex-col shrink-0 border border-black/8">
      <Quote className="w-6 h-6 text-foreground/20 mb-4" />
      <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-6">
        &ldquo;{testimonial.content}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-4 border-t border-black/6">
        <div className="w-9 h-9 bg-foreground text-background flex items-center justify-center text-xs font-medium shrink-0">
          {testimonial.avatar}
        </div>
        <div>
          <p className="text-sm font-medium">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function SocialProof() {
  const t = useDictionary();

  const testimonials = t.socialProof.testimonials.map((item, i) => ({
    name: item.name,
    role: item.role,
    content: item.content,
    avatar: avatarInitials[i],
  }));

  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3, 6);

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-secondary overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 md:mb-20">
          <Reveal>
            <span className="section-label">{t.socialProof.label}</span>
            <h2
              className="font-light tracking-tight leading-[1.1] mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {t.socialProof.title}{" "}
              <span className="font-semibold">{t.socialProof.titleHighlight}</span>{" "}
              {t.socialProof.titleEnd}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex items-end">
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t.socialProof.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Full-width marquee rows */}
      <div className="relative space-y-4">
        <Marquee pauseOnHover className="[--duration:55s] [--gap:1rem]">
          {firstRow.map((t) => (
            <div key={t.name} className="px-2">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:55s] [--gap:1rem]">
          {secondRow.map((t) => (
            <div key={t.name} className="px-2">
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </Marquee>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-secondary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-secondary to-transparent" />
      </div>
    </section>
  );
}
