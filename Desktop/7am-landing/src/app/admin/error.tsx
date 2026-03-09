"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

export default function AdminError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useDictionary();

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-sm">
        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto" />
        <h1 className="text-xl font-bold text-gray-900">{t.admin.error.title}</h1>
        <p className="text-sm text-gray-500">
          {t.admin.error.description}
        </p>
        <Button onClick={reset}>{t.admin.error.tryAgain}</Button>
      </div>
    </main>
  );
}
