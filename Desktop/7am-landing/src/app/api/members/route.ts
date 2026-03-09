import { createServerSupabaseClient } from "@/lib/supabase/server";
import { generateToken } from "@/lib/tokens";
import { requireAdmin, stripPasswordHash } from "@/lib/authz";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { safeJson } from "@/lib/http";

const MEMBER_PRIVATE_FIELDS = "id, member_id, name, surname, email, phone, member_since, notes, photo_path, created_at, updated_at";

export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("members")
    .select(`*, member_private(${MEMBER_PRIVATE_FIELDS})`)
    .order("created_at", { ascending: false });

  if (error)
    return NextResponse.json({ error: "Failed to fetch members" }, { status: 500 });
  return NextResponse.json(stripPasswordHash(data));
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const parsed = await safeJson(request);
  if (!parsed.ok) return parsed.response;
  const { name, surname, email, phone, member_since, notes, password } = parsed.data;
  const token = generateToken();

  const supabase = createServerSupabaseClient();

  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert({ token, status: "active" })
    .select()
    .single();

  if (memberError)
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });

  if (password && (typeof password !== "string" || password.length < 6)) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  const { error: privateError } = await supabase
    .from("member_private")
    .insert({
      member_id: member.id,
      name: name || null,
      surname: surname || null,
      email: email || null,
      phone: phone || null,
      member_since: member_since || null,
      notes: notes || null,
      password_hash: passwordHash,
    });

  if (privateError)
    return NextResponse.json(
      { error: "Failed to create member details" },
      { status: 500 }
    );

  return NextResponse.json(member, { status: 201 });
}
