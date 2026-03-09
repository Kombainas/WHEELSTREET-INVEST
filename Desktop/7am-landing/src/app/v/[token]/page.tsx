import { createServerSupabaseClient } from "@/lib/supabase/server";
import { VerificationStatus } from "@/components/verification-status";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "7AM Community - Member Verification",
  robots: "noindex, nofollow",
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = createServerSupabaseClient();

  const { data: member } = await supabase
    .from("members")
    .select("status")
    .eq("token", token)
    .single();

  let status: "active" | "inactive" | "not_found";
  let verifiedAt: string | null = null;

  if (!member) {
    status = "not_found";
  } else {
    status = member.status as "active" | "inactive";
    verifiedAt = new Date().toISOString();
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070A0F] p-4">
      <div className="w-full max-w-sm text-center space-y-8">
        <Image
          src="/assets/logos/7am-text.png"
          alt="7AM"
          width={100}
          height={35}
          className="mx-auto h-8 w-auto opacity-60"
        />
        <VerificationStatus status={status} verifiedAt={verifiedAt} />
      </div>
    </main>
  );
}
