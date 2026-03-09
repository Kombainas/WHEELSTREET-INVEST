import { NextResponse } from "next/server";

/**
 * Safely parse JSON from a Request.
 * Returns parsed data or a 400 NextResponse on malformed input.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function safeJson<T = any>(
  request: Request
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  try {
    const data = await request.json();
    return { ok: true, data: data as T };
  } catch {
    return {
      ok: false,
      response: NextResponse.json(
        { error: "Invalid JSON body" },
        { status: 400 }
      ),
    };
  }
}
