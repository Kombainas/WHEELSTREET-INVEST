import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { PartnersTable } from "@/components/admin/partners-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";

export default async function PartnersPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{t.admin.partners.title}</h1>
            <p className="text-gray-500 mt-1">
              {t.admin.partners.subtitle}
            </p>
          </div>
          <Link href="/admin/partners/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t.admin.partners.addPartner}
            </Button>
          </Link>
        </div>
        <PartnersTable />
      </main>
    </>
  );
}
