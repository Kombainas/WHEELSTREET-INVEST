import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

/**
 * Verifies the caller is an authenticated admin.
 * Returns null if authorized, or a 401/403 NextResponse to return early.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const role = (session.user as any)?.role;

  if (role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}

/**
 * Strips password_hash from member_private in a response object.
 * Works on single objects and arrays. Belt & suspenders defense.
 */
export function stripPasswordHash<T>(data: T): T {
  if (data === null || data === undefined) return data;

  if (Array.isArray(data)) {
    return data.map(stripPasswordHash) as T;
  }

  if (typeof data === "object") {
    const obj = { ...data } as Record<string, unknown>;

    // Strip from top-level (if this IS a member_private record)
    if ("password_hash" in obj) {
      delete obj.password_hash;
    }

    // Strip from nested member_private
    if ("member_private" in obj && obj.member_private) {
      if (Array.isArray(obj.member_private)) {
        obj.member_private = obj.member_private.map((mp: Record<string, unknown>) => {
          const copy = { ...mp };
          delete copy.password_hash;
          return copy;
        });
      } else if (typeof obj.member_private === "object") {
        const copy = { ...(obj.member_private as Record<string, unknown>) };
        delete copy.password_hash;
        obj.member_private = copy;
      }
    }

    return obj as T;
  }

  return data;
}
