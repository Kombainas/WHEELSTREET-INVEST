import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Archivo } from "next/font/google";
import { DictionaryProvider } from "@/i18n/provider";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FAFAF8",
};

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "7AM Community",
    template: "%s | 7AM Community",
  },
  description: "Transform your mornings, transform your life. Join the 7AM Community.",
  openGraph: {
    title: "7AM Community",
    description: "Transform your mornings, transform your life. Join the 7AM Community.",
    siteName: "7AM Community",
    locale: "lt_LT",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7AM Community",
    description: "Transform your mornings, transform your life. Join the 7AM Community.",
  },
};

const langMap: Record<string, string> = { lt: "lt", en: "en", uk: "uk" };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = cookieStore.get("lang")?.value || "lt";
  const htmlLang = langMap[locale] || "lt";

  return (
    <html lang={htmlLang} className="scroll-smooth">
      <body className={`${archivo.variable} font-sans antialiased`}>
        <DictionaryProvider locale={locale}>
          {children}
        </DictionaryProvider>
      </body>
    </html>
  );
}
