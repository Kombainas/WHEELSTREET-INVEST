"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { partners } from "@/data/partners";
import { Reveal } from "@/components/motion/reveal";

const SHOW_PARTNERS = process.env.NEXT_PUBLIC_SHOW_PARTNERS === "true";

export function PartnersPreview() {
  const t = useDictionary();

  if (!SHOW_PARTNERS || partners.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-secondary border-t border-black/8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <Reveal>
            <span className="section-label">{t.partners.label}</span>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight mt-2">
              {t.partners.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/partners"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors shrink-0"
            >
              {t.partners.viewAll}
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* Partner logos — bordered grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-black/8">
          {partners.map((p) => (
            <Link
              key={p.slug}
              href={`/partners/${p.slug}`}
              className="border-r border-b border-black/8 flex items-center justify-center px-6 py-8
                         group hover:bg-background transition-colors duration-200 img-zoom"
            >
              {p.logo ? (
                <Image
                  src={p.logo}
                  alt={p.name}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300"
                />
              ) : (
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {p.name}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
