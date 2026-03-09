import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { AdminNav } from "@/components/admin/admin-nav";
import { MemberForm } from "@/components/admin/member-form";
import { MemberStatusToggle } from "@/components/admin/member-status-toggle";
import { QRDisplay } from "@/components/admin/qr-display";
import { MemberDeleteButton } from "@/components/admin/member-delete-button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyMember = any;

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session || session.user.role !== "admin") redirect("/admin/login");

  const { id } = await params;
  const supabase = createServerSupabaseClient();

  const { data: member }: { data: AnyMember } = await supabase
    .from("members")
    .select("*, member_private(id, member_id, name, surname, email, phone, member_since, notes, photo_path, created_at, updated_at)")
    .eq("id", parseInt(id))
    .single();

  if (!member) notFound();

  const priv = Array.isArray(member.member_private)
    ? member.member_private[0]
    : member.member_private;

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <>
      <AdminNav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/admin"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          {t.admin.memberDetail.backToMembers}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left — Member Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  {priv?.name || ""} {priv?.surname || ""}
                  {!priv?.name && !priv?.surname && t.admin.memberDetail.memberDetails}
                </h1>
                <MemberStatusToggle
                  memberId={member.id}
                  currentStatus={member.status}
                />
              </div>
              <MemberForm
                memberId={member.id}
                showPassword
                defaultValues={{
                  name: priv?.name || "",
                  surname: priv?.surname || "",
                  email: priv?.email || "",
                  phone: priv?.phone || "",
                  member_since: priv?.member_since || "",
                  notes: priv?.notes || "",
                }}
              />
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {t.admin.memberDetail.dangerZone}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                {t.admin.memberDetail.dangerDesc}
              </p>
              <MemberDeleteButton memberId={member.id} />
            </div>
          </div>

          {/* Right — QR Code */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {t.admin.memberDetail.qrCode}
              </h2>
              <QRDisplay memberId={member.id} token={member.token} />
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                {t.admin.memberDetail.info}
              </h2>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-gray-500">{t.admin.memberDetail.token}</dt>
                  <dd className="font-mono text-xs bg-gray-100 px-2 py-1 rounded mt-1 break-all">
                    {member.token}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">{t.admin.memberDetail.created}</dt>
                  <dd>{new Date(member.created_at).toLocaleDateString()}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">{t.admin.memberDetail.lastUpdated}</dt>
                  <dd>{new Date(member.updated_at).toLocaleDateString()}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
