"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, CheckCircle } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

type Tab = "magic" | "password";

export function MemberLoginForm() {
  const t = useDictionary();
  const [tab, setTab] = useState<Tab>("magic");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [magicSent, setMagicSent] = useState(false);
  const router = useRouter();

  async function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const supabase = createBrowserSupabaseClient();
    const siteUrl = window.location.origin;

    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/member/auth/callback`,
      },
    });

    if (otpError) {
      setError(t.member.login.magicLinkError);
      setLoading(false);
      return;
    }

    setMagicSent(true);
    setLoading(false);
  }

  async function handlePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("member-login", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError(t.member.login.invalidCredentials);
      setLoading(false);
      return;
    }

    router.push("/member");
    router.refresh();
  }

  if (magicSent) {
    return (
      <div className="text-center space-y-4 py-4">
        <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
        <div>
          <p className="font-semibold text-gray-900">{t.member.login.emailSent}</p>
          <p className="text-sm text-gray-500 mt-1">
            {t.member.login.emailSentDesc}
          </p>
        </div>
        <button
          onClick={() => { setMagicSent(false); setError(""); }}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          {t.member.login.tryDifferent}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          type="button"
          onClick={() => { setTab("magic"); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            tab === "magic"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          {t.member.login.magicLink}
        </button>
        <button
          type="button"
          onClick={() => { setTab("password"); setError(""); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
            tab === "password"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Lock className="w-3.5 h-3.5" />
          {t.member.login.password}
        </button>
      </div>

      {tab === "magic" && (
        <form onSubmit={handleMagicLink} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="magic-email">{t.member.login.email}</Label>
            <Input
              id="magic-email"
              name="email"
              type="email"
              required
              placeholder={t.member.login.emailPlaceholder}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.member.login.sending : t.member.login.sendLink}
          </Button>
          <p className="text-xs text-gray-400 text-center">
            {t.member.login.emailHint}
          </p>
        </form>
      )}

      {tab === "password" && (
        <form onSubmit={handlePassword} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pw-email">{t.member.login.email}</Label>
            <Input
              id="pw-email"
              name="email"
              type="email"
              required
              placeholder={t.member.login.emailPlaceholder}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pw-password">{t.member.login.password}</Label>
            <Input
              id="pw-password"
              name="password"
              type="password"
              required
              placeholder={t.member.login.yourPassword}
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t.member.login.signingIn : t.member.login.signIn}
          </Button>
        </form>
      )}
    </div>
  );
}
