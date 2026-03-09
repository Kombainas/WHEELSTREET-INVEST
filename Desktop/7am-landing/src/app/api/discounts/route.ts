import { requireAdmin } from "@/lib/authz";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { safeJson } from "@/lib/http";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("discounts")
    .select("*, partners(name)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch discounts" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = await safeJson(request);
  if (!parsed.ok) return parsed.response;
  const { partner_id, title, description, discount_value, terms, valid_from, valid_to } = parsed.data;

  if (!partner_id || !title || !discount_value) {
    return NextResponse.json(
      { error: "partner_id, title, and discount_value are required" },
      { status: 400 }
    );
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("discounts")
    .insert({
      partner_id,
      title,
      description: description || null,
      discount_value,
      terms: terms || null,
      valid_from: valid_from || null,
      valid_to: valid_to || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create discount" }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
