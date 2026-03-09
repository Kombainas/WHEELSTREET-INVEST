"use client";

import { useEffect, useState, useMemo } from "react";
import { DiscountCard } from "./discount-card";
import { Loader2, Tag } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

interface Discount {
  id: number;
  title: string;
  description: string | null;
  discount_value: string;
  terms: string | null;
  partner: {
    name: string;
    category: string;
    logo_url: string | null;
    location: string | null;
  };
}

export function DiscountsList() {
  const t = useDictionary();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const CATEGORY_LABELS: Record<string, string> = {
    all: t.member.discounts.all,
    restaurant: t.member.discounts.food,
    cafe: t.member.discounts.cafe,
    gym: t.member.discounts.gym,
    wellness: t.member.discounts.wellness,
    shop: t.member.discounts.shop,
    other: t.member.discounts.other,
  };

  function load() {
    setLoading(true);
    setError(false);
    fetch("/api/member/discounts")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json();
      })
      .then(setDiscounts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  const categories = useMemo(() => {
    const cats = new Set(discounts.map((d) => d.partner.category));
    return ["all", ...Array.from(cats)];
  }, [discounts]);

  const filtered =
    activeCategory === "all"
      ? discounts
      : discounts.filter((d) => d.partner.category === activeCategory);

  if (loading) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-6 rounded-2xl flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl text-center">
        <Tag className="w-10 h-10 text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-300 mb-1">
          {t.member.error.title}
        </h3>
        <button
          onClick={load}
          className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {t.member.error.tryAgain}
        </button>
      </div>
    );
  }

  if (discounts.length === 0) {
    return (
      <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl text-center">
        <Tag className="w-10 h-10 text-gray-600 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-300 mb-1">
          {t.member.discounts.noDiscounts}
        </h3>
        <p className="text-gray-500 text-sm">
          {t.member.discounts.noDiscountsDesc}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">
        {t.member.discounts.title} ({discounts.length})
      </h2>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
            }`}
          >
            {CATEGORY_LABELS[cat] || cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white/5 backdrop-blur border border-white/10 p-8 rounded-2xl text-center">
          <Tag className="w-8 h-8 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">{t.member.discounts.noMatch}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((d) => (
            <DiscountCard key={d.id} discount={d} />
          ))}
        </div>
      )}
    </div>
  );
}
