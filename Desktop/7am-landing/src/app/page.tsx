import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Programs } from "@/components/programs";
import { SocialProof } from "@/components/social-proof";
import { CTA } from "@/components/cta";
import { PartnersPreview } from "@/components/landing/partners-preview";
import { Footer } from "@/components/footer";
import { MarqueeTicker } from "@/components/marquee-ticker";
import { FeaturesGrid } from "@/components/features-grid";
import { JournalSection } from "@/components/journal-section";

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

export default function Home() {
  return (
    <main className="bg-white">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <MarqueeTicker />
      <Features />
      <FeaturesGrid />
      <MarqueeTicker invert />
      <Programs />
      <SocialProof />
      <PartnersPreview />
      <JournalSection />
      <CTA />
      <Footer />
    </main>
  );
}
