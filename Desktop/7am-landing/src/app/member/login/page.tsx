import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";
import Image from "next/image";
import { MemberLoginForm } from "@/components/member/member-login-form";

export default async function MemberLoginPage() {
  const session = await auth();
  if (session?.user?.role === "member") redirect("/member");

  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Image
            src="/assets/logos/7am-text.png"
            alt="7AM"
            width={120}
            height={40}
            className="mx-auto h-10 w-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-900">{t.member.login.title}</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {t.member.login.subtitle}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <MemberLoginForm />
        </div>
      </div>
    </main>
  );
}
