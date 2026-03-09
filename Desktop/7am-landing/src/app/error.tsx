"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDictionary } from "@/i18n/provider";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useDictionary();

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070A0F] p-4">
      <div className="text-center space-y-4 max-w-sm">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
        <h1 className="text-xl font-bold text-white">
          {t.error.title}
        </h1>
        <p className="text-sm text-gray-400">{t.error.description}</p>
        <Button
          onClick={reset}
          variant="outline"
          className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
        >
          {t.error.tryAgain}
        </Button>
      </div>
    </main>
  );
}
