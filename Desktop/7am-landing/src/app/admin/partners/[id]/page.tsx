import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/admin-nav";
import { PartnerForm } from "@/components/admin/partner-form";
import { DiscountsTable } from "@/components/admin/discounts-table";
import { PartnerDeleteButton } from "@/components/admin/partner-delete-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyPartner = any;

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: partner }: { data: AnyPartner } = await supabase
    .from("partners")
    .select("*, discounts(*)")
    .eq("id", parseInt(id))
    .single();

  if (!partner) notFound();

  const discounts = Array.isArray(partner.discounts) ? partner.discounts : [];

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/admin/partners"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t.admin.partnerDetail.backToPartners}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl border">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                {partner.name}
              </h1>
              <PartnerForm
                partnerId={partner.id}
                defaultValues={{
                  name: partner.name,
                  category: partner.category,
                  description: partner.description || "",
                  website: partner.website || "",
                  location: partner.location || "",
                }}
              />
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {t.admin.partnerDetail.dangerZone}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {t.admin.partnerDetail.dangerDesc}
              </p>
              <PartnerDeleteButton partnerId={partner.id} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <DiscountsTable partnerId={partner.id} discounts={discounts} />
          </div>
        </div>
      </main>
    </>
  );
}
