"use client";

import Image from "next/image";
import Link from "next/link";
import { useDictionary } from "@/i18n/provider";

const GRID_ITEMS = [
  { number: "01", bg: "#000000", color: "#FFFFFF", price: "Nuo €29/mėn", image: "/images/image00005.JPG" },
  { number: "02", bg: "#F5F5F5", color: "#000000", price: "Nuo €79/mėn", image: "/images/image00006.JPG" },
  { number: "03", bg: "#E8E4DF", color: "#000000", price: "Nuo €199/mėn", image: "/images/image00007.JPG" },
  { number: "04", bg: "#1A1A1A", color: "#FFFFFF", price: "7AM Club", image: "/images/image00008.JPG" },
];

export function FeaturesGrid() {
  const t = useDictionary();
  const items = GRID_ITEMS.map((g, i) => ({
    ...g,
    name: t.features.items[i]?.title || "",
    desc: t.features.items[i]?.description || "",
  }));

  return (
    <section style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/8">
        {items.map((item, i) => (
          <Link
            key={i}
            href="#pricing"
            className="group flex flex-col bg-white hover:bg-[#F5F5F5] transition-colors duration-200"
          >
            {/* Image/color block */}
            <div
              className="relative w-full overflow-hidden"
              style={{ background: item.bg, aspectRatio: "4/5" }}
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Text */}
            <div className="p-5 flex-1 flex flex-col justify-between" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
              <p style={{ fontSize: "0.9375rem", fontWeight: 500 }}>{item.name}</p>
              <p style={{ fontSize: "0.8125rem", color: "rgba(0,0,0,0.45)", marginTop: "0.25rem" }}>
                {item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
