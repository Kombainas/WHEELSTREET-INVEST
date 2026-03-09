import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
import { MemberNav } from "@/components/member/member-nav";
import { MemberDataProvider } from "@/components/member/member-data-provider";
import { MemberQRCard } from "@/components/member/member-qr-card";
import { MemberInfoCard } from "@/components/member/member-info-card";
import { DiscountsList } from "@/components/member/discounts-list";

export const dynamic = "force-dynamic";

export default async function MemberDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "member") redirect("/member/login");

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <>
      <MemberNav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">
            {t.member.dashboard.welcome} {session.user.name}
          </h1>
          <p className="text-gray-400 mt-1">
            {t.member.dashboard.subtitle}
          </p>
        </div>

        <MemberDataProvider>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <MemberQRCard />
              <MemberInfoCard />
            </div>
            <div className="lg:col-span-2">
              <DiscountsList />
            </div>
          </div>
        </MemberDataProvider>
      </main>
    </>
  );
}
