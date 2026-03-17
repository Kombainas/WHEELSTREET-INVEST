"use client";

interface Partner {
  name: string;
  slug: string;
  description?: string;
  location?: string;
  [key: string]: unknown;
}

export function PartnerDetail({ partner }: { partner: Partner }) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-medium">{partner.name}</h1>
        {partner.description && <p className="mt-4 text-black/60">{partner.description}</p>}
      </div>
    </section>
  );
}
