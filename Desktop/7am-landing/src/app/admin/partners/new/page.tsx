import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { PartnerForm } from "@/components/admin/partner-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";

export default async function NewPartnerPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/admin/login");

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
          {t.admin.newPartner.backToPartners}
        </Link>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.admin.newPartner.title}</h1>
          <p className="text-gray-500 mt-1">
            {t.admin.newPartner.subtitle}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <PartnerForm />
        </div>
      </main>
    </>
  );
}
