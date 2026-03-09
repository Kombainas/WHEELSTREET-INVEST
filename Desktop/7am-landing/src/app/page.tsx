import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Programs } from "@/components/programs";
import { SocialProof } from "@/components/social-proof";
import { CTA } from "@/components/cta";
import { PartnersPreview } from "@/components/landing/partners-preview";
import { Footer } from "@/components/footer";
import { MarqueeTicker } from "@/components/marquee-ticker";

export const metadata: Metadata = {
  title: "7AM Community – Transform Your Mornings",
  description:
    "Join thousands who start their day at 7AM. Build unstoppable habits, access exclusive partner discounts, and unlock your full potential.",
  openGraph: {
    title: "7AM Community – Transform Your Mornings",
    description:
      "Join thousands who start their day at 7AM. Build unstoppable habits and unlock your full potential.",
  },
};

function PoweredBy() {
  return (
    <div className="py-12 flex items-center justify-center border-t border-black/8">
      <Image
        src="/assets/logos/powered by vytautas.png"
        alt="Powered by Vytautas"
        width={200}
        height={60}
        className="h-10 w-auto object-contain opacity-50"
      />
    </div>
  );
}

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background">
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Features />
      <MarqueeTicker invert />
      <Programs />
      <SocialProof />
      <PartnersPreview />
      <CTA />
      <PoweredBy />
      <Footer />
    </main>
  );
}
