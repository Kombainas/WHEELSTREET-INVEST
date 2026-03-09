"use client";

import { useRouter } from "next/navigation";

const LOCALES = [
  { code: "lt", label: "LT" },
  { code: "en", label: "EN" },
  { code: "uk", label: "UA" },
] as const;

function getCurrentLocale(): string {
  if (typeof document === "undefined") return "lt";
  const match = document.cookie.match(/(?:^|;\s*)lang=(\w+)/);
  return match?.[1] || "lt";
}

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const router = useRouter();
  const current = getCurrentLocale();

  function setLocale(code: string) {
    document.cookie = `lang=${code};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    router.refresh();
  }

  const isDark = variant === "dark";

  return (
    <div className="flex items-center gap-0.5">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            current === code
              ? isDark
                ? "bg-white/15 text-white"
                : "bg-gray-900 text-white"
              : isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
