"use client";

import { Quote } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";

const avatarInitials = ["SC", "MJ", "ER", "DP", "LT", "AK"];

function TestimonialCard({
  t,
}: {
  t: { name: string; role: string; content: string; avatar: string };
}) {
  return (
    <div
      className="w-[320px] shrink-0 flex flex-col p-7 group hover:bg-white transition-colors duration-200"
      style={{ border: "1px solid rgba(0,0,0,0.1)", background: "#FAFAFA" }}
    >
      <Quote className="w-5 h-5 mb-5" style={{ color: "rgba(0,0,0,0.15)" }} />
      <p className="text-[0.875rem] leading-relaxed flex-1 mb-6 text-black/65">
        &ldquo;{t.content}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
        <div
          className="w-8 h-8 flex items-center justify-center shrink-0 text-[0.6875rem] font-medium"
          style={{ background: "#000000", color: "#FFFFFF" }}
        >
          {t.avatar}
        </div>
        <div>
          <p className="text-[0.875rem] font-medium leading-tight">{t.name}</p>
          <p className="text-[0.75rem] text-black/45 mt-0.5">{t.role}</p>
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

  const firstRow  = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3, 6);

  return (
    <section id="testimonials" className="py-24 md:py-32 overflow-hidden" style={{ background: "#F5F5F5" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 mb-16 md:mb-20">
          <Reveal>
            <span className="section-label mb-5 inline-block">{t.socialProof.label}</span>
            <h2
              style={{
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                lineHeight: 1.08,
              }}
            >
              {t.socialProof.title}{" "}
              <em style={{ fontStyle: "italic" }}>{t.socialProof.titleHighlight}</em>{" "}
              {t.socialProof.titleEnd}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex lg:items-end">
            <p className="text-[0.9375rem] text-black/55 leading-relaxed max-w-md">
              {t.socialProof.subtitle}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Full-width marquee rows */}
      <div className="relative space-y-4">
        <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem]">
          {firstRow.map((item) => (
            <div key={item.name} className="px-2">
              <TestimonialCard t={item} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:50s] [--gap:1rem]">
          {secondRow.map((item) => (
            <div key={item.name} className="px-2">
              <TestimonialCard t={item} />
            </div>
          ))}
        </Marquee>
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F5F5F5]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F5F5F5]" />
      </div>
    </section>
  );
}
