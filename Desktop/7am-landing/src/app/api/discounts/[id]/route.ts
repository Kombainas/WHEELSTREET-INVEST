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
    .from("discounts")
    .select("*, partners(name)")
    .eq("id", numId)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    const message = status === 404 ? "Discount not found" : "Failed to fetch discount";
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

  const allowedFields = [
    "title", "description", "discount_value", "terms",
    "valid_from", "valid_to", "is_active",
  ];
  const update = Object.fromEntries(
    Object.entries(body).filter(([key]) => allowedFields.includes(key))
  );

  const { error } = await supabase
    .from("discounts")
    .update(update)
    .eq("id", numId);

  if (error) {
    return NextResponse.json({ error: "Failed to update discount" }, { status: 500 });
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
    .from("discounts")
    .delete()
    .eq("id", numId);

  if (error) {
    return NextResponse.json({ error: "Failed to delete discount" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
