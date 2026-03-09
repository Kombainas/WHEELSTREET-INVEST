"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export function MemberNav() {
  const t = useDictionary();
  return (
    <header className="border-b border-white/10 bg-[#0A0E15]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/member" className="flex items-center gap-3">
          <Image
            src="/assets/logos/7am-text.png"
            alt="7AM"
            width={80}
            height={28}
            className="h-7 w-auto"
          />
          <span className="text-sm font-medium text-gray-500 border-l border-white/10 pl-4">
            {t.member.nav.membership}
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="dark" />
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white hover:bg-white/5"
            onClick={() => signOut({ callbackUrl: "/member/login" })}
          >
            <LogOut className="w-4 h-4 mr-2" />
            {t.member.nav.signOut}
          </Button>
        </div>
      </div>
    </header>
  );
}
