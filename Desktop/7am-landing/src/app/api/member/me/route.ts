import { auth } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getVerifyLink } from "@/lib/config";
import { NextResponse } from "next/server";
import QRCode from "qrcode";

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "member" || !session.user.memberId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();

  const { data: member } = await supabase
    .from("members")
    .select("id, token, status")
    .eq("id", session.user.memberId)
    .single();

  if (!member) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const { data: priv } = await supabase
    .from("member_private")
    .select("name, surname, email, member_since")
    .eq("member_id", member.id)
    .single();

  const verifyUrl = getVerifyLink(member.token);
  const qrDataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 400,
    margin: 2,
    color: { dark: "#000000", light: "#FFFFFF" },
  });

  return NextResponse.json({
    id: member.id,
    token: member.token,
    status: member.status,
    name: [priv?.name, priv?.surname].filter(Boolean).join(" ") || "Member",
    email: priv?.email || "",
    memberSince: priv?.member_since || null,
    qrDataUrl,
  });
}
