import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
import Link from "next/link";

export default async function NotFound() {
  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070A0F] p-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-8xl font-bold tracking-tighter text-white">404</p>
        <h1 className="text-xl font-semibold text-white">
          {t.notFoundPage.title}
        </h1>
        <p className="text-sm text-gray-400">{t.notFoundPage.description}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          {t.notFoundPage.goHome}
        </Link>
      </div>
    </main>
  );
}
