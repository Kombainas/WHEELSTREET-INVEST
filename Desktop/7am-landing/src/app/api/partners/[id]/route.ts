import { requireAdmin } from "@/lib/authz";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { safeJson } from "@/lib/http";

function parseId(id: string) {
  const n = parseInt(id, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*, discounts(*)")
    .eq("id", numId)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    const message = status === 404 ? "Partner not found" : "Failed to fetch partner";
    return NextResponse.json({ error: message }, { status });
  }
  return NextResponse.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const parsed = await safeJson(request);
  if (!parsed.ok) return parsed.response;
  const body = parsed.data;
  const supabase = createServerSupabaseClient();

  const allowedFields = ["name", "category", "description", "website", "location", "is_active"];
  const update = Object.fromEntries(
    Object.entries(body).filter(([key]) => allowedFields.includes(key))
  );

  const { error } = await supabase
    .from("partners")
    .update(update)
    .eq("id", numId);

  if (error) {
    return NextResponse.json({ error: "Failed to update partner" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const { id } = await params;
  const numId = parseId(id);
  if (!numId) return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  const supabase = createServerSupabaseClient();

  const { error } = await supabase
    .from("partners")
    .delete()
    .eq("id", numId);

  if (error) {
    return NextResponse.json({ error: "Failed to delete partner" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
