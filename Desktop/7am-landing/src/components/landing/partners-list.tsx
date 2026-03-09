"use client";

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/reveal";
import { useDictionary } from "@/i18n/provider";
import { partners } from "@/data/partners";

const categoryColors: Record<string, string> = {
  wellness: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  food: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  mobility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  automotive: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export function PartnersList() {
  const t = useDictionary();

  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              {t.partners.title}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              {t.partners.subtitle}
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {partners.map((partner) => {
            const item = t.partners.items[partner.slug as keyof typeof t.partners.items];
            const colorCls = categoryColors[partner.category ?? ""] ?? "bg-white/5 text-gray-400 border-white/10";

            return (
              <StaggerItem key={partner.slug}>
                <Link
                  href={`/partners/${partner.slug}`}
                  className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {partner.name}
                      </h2>
                      {partner.location && (
                        <div className="flex items-center gap-1.5 mt-1.5 text-sm text-gray-500">
                          <MapPin className="h-3.5 w-3.5" />
                          {partner.location}
                        </div>
                      )}
                    </div>
                    {partner.category && (
                      <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${colorCls}`}>
                        {partner.category}
                      </span>
                    )}
                  </div>

                  {item && (
                    <p className="text-sm sm:text-base text-gray-400 line-clamp-3 mb-5">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center text-sm font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    {t.partners.learnMore}
                    <ArrowRight className="ml-1.5 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
