import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PartnersList } from "@/components/landing/partners-list";

export const metadata: Metadata = {
  title: "Partners – 7AM Community",
  description: "Meet the partners offering exclusive benefits to 7AM Community members.",
};

export default function PartnersPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-20" />
      <PartnersList />
      <Footer />
    </main>
  );
}
