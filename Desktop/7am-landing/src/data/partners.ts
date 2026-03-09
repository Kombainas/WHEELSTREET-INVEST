export type PartnerEntry = {
  slug: string;
  name: string;
  category?: string;
  url?: string;
  logo?: string;
  founded?: string;
  location?: string;
};

/**
 * Static partner list used on landing page and /partners pages.
 * Translated content (descriptions, highlights) lives in i18n locales.
 */
export const partners: PartnerEntry[] = [
  {
    slug: "vanduo-vytautas",
    name: "Vanduo Vytautas",
    category: "wellness",
    url: "https://www.vytautas.lt",
    founded: "1924",
    location: "Birštonas",
  },
  {
    slug: "habits",
    name: "Habits",
    category: "food",
    url: "https://www.habits.lt",
    founded: "2023",
    location: "Kaunas / Vilnius",
  },
  {
    slug: "wheelstreet",
    name: "Wheelstreet.lt",
    category: "mobility",
    url: "https://wheelstreet.lt",
    founded: "2020",
    location: "Vilnius",
  },
  {
    slug: "carvertical",
    name: "carVertical",
    category: "automotive",
    url: "https://www.carvertical.com",
    founded: "2017",
    location: "Vilnius",
  },
];

export function getPartnerBySlug(slug: string): PartnerEntry | null {
  return partners.find((p) => p.slug === slug) ?? null;
}
