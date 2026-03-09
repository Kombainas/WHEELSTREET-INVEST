"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useDictionary } from "@/i18n/provider";

export default function MemberError({
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
        <h1 className="text-xl font-bold text-white">{t.member.error.title}</h1>
        <p className="text-sm text-gray-400">
          {t.member.error.description}
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={reset}
            variant="outline"
            className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
          >
            {t.member.error.tryAgain}
          </Button>
          <Link href="/member/login">
            <Button
              variant="outline"
              className="border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
            >
              {t.member.error.backToLogin}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
