import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PartnerDetail } from "@/components/landing/partner-detail";
import { partners, getPartnerBySlug } from "@/data/partners";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return partners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) return {};
  return {
    title: `${partner.name} – 7AM Community Partners`,
    description: `Learn about ${partner.name}, a 7AM Community partner${partner.location ? ` based in ${partner.location}` : ""}.`,
    openGraph: {
      title: `${partner.name} – 7AM Community Partners`,
      description: `Learn about ${partner.name}, a 7AM Community partner.`,
    },
  };
}

export default async function PartnerPage({ params }: Props) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-20" />
      <PartnerDetail partner={partner} />
      <Footer />
    </main>
  );
}
