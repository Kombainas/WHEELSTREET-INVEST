"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

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

export function LanguageSwitcher({ transparent = false }: { transparent?: boolean; variant?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(getCurrentLocale);
  const ref = useRef<HTMLDivElement>(null);

  function setLocale(code: string) {
    document.cookie = `lang=${code};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
    setCurrent(code);
    setOpen(false);
    router.refresh();
  }

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const textColor = transparent ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.55)";
  const hoverColor = transparent ? "#FFFFFF" : "#000000";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-0.5 transition-colors"
        style={{ fontSize: "0.875rem", fontWeight: 400, color: textColor }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = hoverColor)}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = textColor)}
      >
        {current.toUpperCase()}
        <ChevronDown className="w-3 h-3 mt-px" />
      </button>

      {open && (
        <div
          className="absolute top-full right-0 mt-1 py-1 bg-white z-[200] min-w-[60px]"
          style={{ border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
        >
          {LOCALES.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLocale(code)}
              className="w-full text-left px-3 py-2 transition-colors hover:bg-[#F5F5F5]"
              style={{
                fontSize: "0.875rem",
                fontWeight: current === code ? 500 : 400,
                color: current === code ? "#000" : "rgba(0,0,0,0.55)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
