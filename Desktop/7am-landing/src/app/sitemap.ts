import type { MetadataRoute } from "next";
import { partners } from "@/data/partners";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://7am.lt";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/partners`, changeFrequency: "weekly", priority: 0.9 },
    ...partners.map((p) => ({
      url: `${BASE}/partners/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
