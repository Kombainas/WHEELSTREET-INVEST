"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, AlertCircle, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useDictionary } from "@/i18n/provider";

type Status = "verifying" | "signing-in" | "error" | "no-member";

export default function MagicLinkCallback() {
  const t = useDictionary();
  const [status, setStatus] = useState<Status>("verifying");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function handleCallback() {
      const supabase = createBrowserSupabaseClient();

      // Check for PKCE code in URL query params
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) {
          setStatus("error");
          setErrorMsg(t.member.callback.invalidLink);
          return;
        }
      }

      // Get the session (works for both hash fragment and code flows)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        setStatus("error");
        setErrorMsg(t.member.callback.expiredLink);
        return;
      }

      // Sign into NextAuth with the verified Supabase token
      setStatus("signing-in");
      const result = await signIn("member-magic", {
        accessToken: session.access_token,
        redirect: false,
      });

      if (result?.error) {
        setStatus("no-member");
        return;
      }

      router.push("/member");
      router.refresh();
    }

    handleCallback();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#070A0F] p-4">
      <div className="w-full max-w-sm text-center space-y-6">
        <Image
          src="/assets/logos/7am-text.png"
          alt="7AM"
          width={100}
          height={34}
          className="mx-auto h-8 w-auto"
        />

        {status === "verifying" && (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-gray-400">{t.member.callback.verifying}</p>
          </div>
        )}

        {status === "signing-in" && (
          <div className="space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto" />
            <p className="text-gray-400">{t.member.callback.signingIn}</p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto" />
            <p className="text-red-400">{errorMsg}</p>
            <Link href="/member/login">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                {t.member.callback.backToLogin}
              </Button>
            </Link>
          </div>
        )}

        {status === "no-member" && (
          <div className="space-y-4">
            <UserX className="w-10 h-10 text-amber-500 mx-auto" />
            <div>
              <p className="text-white font-semibold">{t.member.callback.notFound}</p>
              <p className="text-gray-400 text-sm mt-2">
                {t.member.callback.notFoundDesc}{" "}
                <a
                  href="mailto:info@7am.lt"
                  className="text-blue-400 hover:text-blue-300"
                >
                  info@7am.lt
                </a>
              </p>
            </div>
            <Link href="/member/login">
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                {t.member.callback.backToLogin}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
