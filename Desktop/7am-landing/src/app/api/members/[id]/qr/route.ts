import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/authz";
import { getVerifyLink } from "@/lib/config";
import QRCode from "qrcode";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = parseInt(id, 10);
  if (!Number.isFinite(numId) || numId <= 0)
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const supabase = createServerSupabaseClient();

  const { data } = await supabase
    .from("members")
    .select("token")
    .eq("id", numId)
    .single();

  if (!data) {
    return NextResponse.json({ error: "Member not found" }, { status: 404 });
  }

  const token = (data as { token: string }).token;
  const verifyUrl = getVerifyLink(token);

  const format = request.nextUrl.searchParams.get("format") || "png";

  if (format === "svg") {
    const svg = await QRCode.toString(verifyUrl, { type: "svg", width: 300 });
    return new NextResponse(svg, {
      headers: { "Content-Type": "image/svg+xml" },
    });
  }

  const dataUrl = await QRCode.toDataURL(verifyUrl, {
    width: 300,
    margin: 2,
  });
  return NextResponse.json({ qr: dataUrl, url: verifyUrl });
}
