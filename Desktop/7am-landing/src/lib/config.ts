/**
 * Returns the site base URL. Priority:
 *  1. NEXT_PUBLIC_SITE_URL — explicit override (Vercel production)
 *  2. VERCEL_PROJECT_PRODUCTION_URL — auto-set by Vercel on production
 *  3. VERCEL_URL — auto-set by Vercel on preview deploys
 *  4. http://localhost:3000 — local dev fallback
 */
function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

/** Base site URL (e.g. https://7am.lt) */
export const SITE_URL = getSiteUrl();

/**
 * URL used for verification/QR links.
 * If NEXT_PUBLIC_VERIFY_URL is set (e.g. https://verify.7am.lt),
 * QR codes will point there. Otherwise falls back to SITE_URL.
 */
export const VERIFY_URL = process.env.NEXT_PUBLIC_VERIFY_URL
  ? process.env.NEXT_PUBLIC_VERIFY_URL.replace(/\/$/, "")
  : SITE_URL;

/** Contact email shown in UI */
export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@7am.lt";

/** Build a full verification link for a member token */
export function getVerifyLink(token: string): string {
  return `${VERIFY_URL}/v/${token}`;
}
