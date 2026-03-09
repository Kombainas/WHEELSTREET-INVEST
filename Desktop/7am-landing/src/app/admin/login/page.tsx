import Image from "next/image";
import { LoginForm } from "@/components/admin/login-form";
import { cookies } from "next/headers";
import { getDictionary } from "@/i18n/dictionary";

export default async function AdminLoginPage() {
  const cookieStore = await cookies();
  const t = getDictionary(cookieStore.get("lang")?.value);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Image
            src="/assets/logos/7am-text.png"
            alt="7AM"
            width={100}
            height={36}
            className="mx-auto h-10 w-auto mb-4"
          />
          <h1 className="text-xl font-semibold text-gray-900">{t.admin.login.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {t.admin.login.subtitle}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
