import { createServerSupabaseClient } from "@/lib/supabase/server";
import { requireAdmin, stripPasswordHash } from "@/lib/authz";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { safeJson } from "@/lib/http";

const MEMBER_PRIVATE_FIELDS = "id, member_id, name, surname, email, phone, member_since, notes, photo_path, created_at, updated_at";

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
    .from("members")
    .select(`*, member_private(${MEMBER_PRIVATE_FIELDS})`)
    .eq("id", numId)
    .single();

  if (error) {
    const status = error.code === "PGRST116" ? 404 : 500;
    const message = status === 404 ? "Member not found" : "Failed to fetch member";
    return NextResponse.json({ error: message }, { status });
  }
  return NextResponse.json(stripPasswordHash(data));
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

  if (body.status) {
    const validStatuses = ["active", "inactive"];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }
    const { error } = await supabase
      .from("members")
      .update({ status: body.status })
      .eq("id", numId);
    if (error)
      return NextResponse.json({ error: "Failed to update member" }, { status: 500 });
  }

  const privateFields = [
    "name",
    "surname",
    "email",
    "phone",
    "member_since",
    "notes",
  ];
  const privateUpdate: Record<string, unknown> = Object.fromEntries(
    Object.entries(body).filter(([key]) => privateFields.includes(key))
  );

  if (body.password) {
    if (typeof body.password !== "string" || body.password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    privateUpdate.password_hash = await bcrypt.hash(body.password, 10);
  }

  if (Object.keys(privateUpdate).length > 0) {
    const { error } = await supabase
      .from("member_private")
      .update(privateUpdate)
      .eq("member_id", numId);
    if (error)
      return NextResponse.json({ error: "Failed to update member details" }, { status: 500 });
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
    .from("members")
    .delete()
    .eq("id", numId);

  if (error)
    return NextResponse.json({ error: "Failed to delete member" }, { status: 500 });
  return NextResponse.json({ success: true });
}
