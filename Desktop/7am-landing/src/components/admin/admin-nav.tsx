"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut, Users, Handshake } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDictionary } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AdminNav() {
  const pathname = usePathname();
  const t = useDictionary();

  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/assets/logos/7am-text.png"
              alt="7AM"
              width={80}
              height={28}
              className="h-7 w-auto"
            />
            <span className="hidden sm:inline text-sm font-medium text-gray-500 border-l pl-4">
              {t.admin.nav.admin}
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname === "/admin" || pathname.startsWith("/admin/members")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.nav.members}</span>
            </Link>
            <Link
              href="/admin/partners"
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                pathname.startsWith("/admin/partners")
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Handshake className="w-4 h-4" />
              <span className="hidden sm:inline">{t.admin.nav.partners}</span>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher />
          <Link
            href="/"
            className="hidden sm:inline text-sm text-gray-500 hover:text-gray-900"
          >
            {t.admin.nav.viewSite}
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">{t.admin.nav.signOut}</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
