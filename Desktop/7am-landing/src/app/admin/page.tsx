import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminNav } from "@/components/admin/admin-nav";
import { MembersTable } from "@/components/admin/members-table";
import { StatsCards } from "@/components/admin/stats-cards";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t.admin.dashboard.title}</h1>
          <p className="text-gray-500 mt-1">
            {t.admin.dashboard.subtitle}
          </p>
        </div>
        <div className="mb-8">
          <StatsCards />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">{t.admin.dashboard.members}</h2>
          <MembersTable />
        </div>
      </main>
    </>
  );
}
