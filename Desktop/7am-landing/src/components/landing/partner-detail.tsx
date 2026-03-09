"use client";

import Link from "next/link";
import { ArrowLeft, ExternalLink, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";
import type { PartnerEntry } from "@/data/partners";

const categoryColors: Record<string, string> = {
  wellness: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  food: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  mobility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  automotive: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

interface PartnerDetailProps {
  partner: PartnerEntry;
}

export function PartnerDetail({ partner }: PartnerDetailProps) {
  const t = useDictionary();
  const item = t.partners.items[partner.slug as keyof typeof t.partners.items];
  const colorCls = categoryColors[partner.category ?? ""] ?? "bg-white/5 text-gray-400 border-white/10";

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Reveal>
          <Link
            href="/partners"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.partners.backToPartners}
          </Link>
        </Reveal>

        {/* Header */}
        <Reveal delay={0.1}>
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {partner.name}
              </h1>
              {partner.category && (
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorCls}`}>
                  {partner.category}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {partner.location && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  {partner.location}
                </span>
              )}
              {partner.founded && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  {t.partners.founded} {partner.founded}
                </span>
              )}
            </div>
          </div>
        </Reveal>

        {/* Description */}
        {item && (
          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 mb-8">
              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                {item.description}
              </p>
            </div>
          </Reveal>
        )}

        {/* Highlights */}
        {item && item.highlights.length > 0 && (
          <Reveal delay={0.3}>
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 mb-8">
              <ul className="space-y-3">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}

        {/* External link */}
        {partner.url && (
          <Reveal delay={0.4}>
            <a
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-sm font-medium text-white hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300"
            >
              {t.partners.visitWebsite}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
