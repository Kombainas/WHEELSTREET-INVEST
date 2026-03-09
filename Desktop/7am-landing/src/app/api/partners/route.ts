import { requireAdmin } from "@/lib/authz";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { safeJson } from "@/lib/http";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("partners")
    .select("*, discounts(count)")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to fetch partners" }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = await safeJson(request);
  if (!parsed.ok) return parsed.response;
  const { name, category, description, website, location } = parsed.data;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("partners")
    .insert({
      name: name.trim(),
      category: category || "other",
      description: description || null,
      website: website || null,
      location: location || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to create partner" }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
