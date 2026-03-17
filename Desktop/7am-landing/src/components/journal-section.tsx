"use client";

import Image from "next/image";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const STORIES = [
  {
    bg: "#000000",
    label: "BENDRUOMENĖ",
    title: "Kaip 7AM pakeitė mano rytus ir visą gyvenimą",
    author: "Tomas K.",
    color: "#FFFFFF",
    image: "/images/image00009.JPG",
  },
  {
    bg: "#E8E4DF",
    label: "SVEIKATA",
    title: "Mokslas apie ryto rutinas: kodėl 7AM veikia",
    author: "Dr. Lina M.",
    color: "#000000",
    image: "/images/image00010.JPG",
  },
  {
    bg: "#F5F5F5",
    label: "PRODUKTYVUMAS",
    title: "Nuo 0 iki 15 000 narių: 7AM bendruomenės istorija",
    author: "7AM Komanda",
    color: "#000000",
    image: "/images/image00011.JPG",
  },
];

export function JournalSection() {
  return (
    <section className="py-16 md:py-20 bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Reveal>
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 500, letterSpacing: "-0.01em" }}>
              Bendruomenė
            </h2>
          </Reveal>
          <div className="flex items-center gap-2">
            <button
              className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#F5F5F5]"
              style={{ border: "1px solid rgba(0,0,0,0.12)" }}
              aria-label="Previous"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              className="w-10 h-10 flex items-center justify-center transition-colors hover:bg-[#F5F5F5]"
              style={{ border: "1px solid rgba(0,0,0,0.12)" }}
              aria-label="Next"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/8">
          {STORIES.map((story, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group cursor-pointer img-zoom bg-white hover:bg-[#F5F5F5] transition-colors duration-200">
                {/* Image block */}
                <div
                  className="relative w-full overflow-hidden flex items-end p-6"
                  style={{ background: story.bg, aspectRatio: "4/3" }}
                >
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className="relative z-10"
                    style={{
                      fontSize: "0.625rem",
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "#FFFFFF",
                      opacity: 0.85,
                      textShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  >
                    {story.label}
                  </span>
                </div>
                {/* Text */}
                <div className="p-5" style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      lineHeight: 1.35,
                    }}
                  >
                    {story.title}
                  </h3>
                  <p
                    className="mt-2"
                    style={{ fontSize: "0.8125rem", color: "rgba(0,0,0,0.4)" }}
                  >
                    {story.author}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
