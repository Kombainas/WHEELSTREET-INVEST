"use client";

import Link from "next/link";
import Image from "next/image";
import { useDictionary } from "@/i18n/provider";

export function Footer() {
  const t = useDictionary();

  return (
    <footer className="bg-white" style={{ borderTop: "1px solid rgba(0,0,0,0.1)" }}>

      {/* ── Newsletter — centred like kismas.com ── */}
      <div
        className="py-16 md:py-20 flex flex-col items-center text-center"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
      >
        <p
          className="mb-6"
          style={{
            fontSize: "0.6875rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.4)",
          }}
        >
          {t.footer.newsletter}
        </p>
        <form
          className="flex w-full"
          style={{ maxWidth: "380px", border: "1px solid rgba(0,0,0,0.15)" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={t.footer.emailPlaceholder}
            className="flex-1 px-5 py-3 text-[0.875rem] bg-transparent outline-none placeholder:text-black/30"
          />
          <button
            type="submit"
            className="px-6 py-3 text-[0.8125rem] font-medium tracking-[0.04em] transition-colors hover:bg-black hover:text-white"
            style={{ borderLeft: "1px solid rgba(0,0,0,0.15)" }}
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* ── Main link columns ── */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-14 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16 mb-14">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/assets/logos/7am-text.png"
                alt="7AM"
                width={60}
                height={22}
                className="h-[22px] w-auto object-contain"
              />
            </Link>
            <p style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.45)", maxWidth: "200px", lineHeight: 1.65 }}>
              {t.footer.description}
            </p>
            <div className="flex gap-4 mt-5">
              {["Instagram", "YouTube"].map((s) => (
                <a key={s} href="#" className="text-[0.8125rem] text-black/40 hover:text-black transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-5" style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)" }}>
              {t.footer.product}
            </h3>
            <ul className="space-y-3.5">
              {(t.footer.productLinks as string[]).map((label, i) => (
                <li key={i}>
                  <Link href={["#features","#programs","#pricing","#","#"][i] ?? "#"} className="text-[0.875rem] text-black/55 hover:text-black transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5" style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)" }}>
              {t.footer.company}
            </h3>
            <ul className="space-y-3.5">
              {(t.footer.companyLinks as string[]).map((label, i) => (
                <li key={i}>
                  <Link href="#" className="text-[0.875rem] text-black/55 hover:text-black transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-5" style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.38)" }}>
              {t.footer.legal}
            </h3>
            <ul className="space-y-3.5">
              {(t.footer.legalLinks as string[]).map((label, i) => (
                <li key={i}>
                  <Link href="#" className="text-[0.875rem] text-black/55 hover:text-black transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)", fontSize: "0.8125rem", color: "rgba(0,0,0,0.35)" }}
        >
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-black transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-black transition-colors">{t.footer.terms}</Link>
            <Link href="#" className="hover:text-black transition-colors">{t.footer.cookies}</Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
