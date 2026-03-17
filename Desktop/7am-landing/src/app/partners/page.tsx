import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { AnnouncementBar } from "@/components/announcement-bar";
import { Footer } from "@/components/footer";
import { PartnersList } from "@/components/landing/partners-list";

export const metadata: Metadata = {
  title: "Partners – 7AM Community",
  description: "Meet the partners offering exclusive benefits to 7AM Community members.",
};

export default function PartnersPage() {
  return (
    <main className="bg-white">
      <AnnouncementBar />
      <Navbar />
      {/* offset: 44px announcement bar + 52px navbar */}
      <div style={{ paddingTop: "calc(44px + 52px)" }} />
      <PartnersList />
      <Footer />
    </main>
  );
}
