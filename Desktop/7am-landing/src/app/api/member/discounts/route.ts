import { auth } from "@/lib/auth";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "member") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerSupabaseClient();

  const { data: discounts, error } = await supabase
    .from("discounts")
    .select("id, title, description, discount_value, terms, partners(name, category, logo_url, location)")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Flatten the partner join
  const result = (discounts || [])
    .map((d) => {
      const partner = Array.isArray(d.partners) ? d.partners[0] : d.partners;
      return {
        id: d.id,
        title: d.title,
        description: d.description,
        discount_value: d.discount_value,
        terms: d.terms,
        partner: partner || { name: "Unknown", category: "other", logo_url: null, location: null },
      };
    })
    .filter((d) => d.partner);

  return NextResponse.json(result);
}
