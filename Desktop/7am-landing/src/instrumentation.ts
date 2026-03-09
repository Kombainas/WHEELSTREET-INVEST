export async function register() {
  if (process.env.NODE_ENV === "production") {
    if (!process.env.NEXT_PUBLIC_SITE_URL) {
      console.warn(
        "[7AM] NEXT_PUBLIC_SITE_URL is not set. QR links may use Vercel preview URLs."
      );
    }
  }

  if (!process.env.IG_ACCESS_TOKEN) {
    console.warn("[7AM] IG_ACCESS_TOKEN is not set. Instagram feed will be unavailable.");
  }
}
