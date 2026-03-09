import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateToken } from "@/lib/tokens";
import { requireAdmin } from "@/lib/authz";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = parseInt(id, 10);
  if (!Number.isFinite(numId) || numId <= 0)
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const newToken = generateToken();
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("members")
    .update({ token: newToken })
    .eq("id", numId);

  if (error)
    return NextResponse.json({ error: "Failed to regenerate token" }, { status: 500 });
  return NextResponse.json({ token: newToken });
}
