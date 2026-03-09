"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Youtube } from "lucide-react";
import { useDictionary } from "@/i18n/provider";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export function Footer() {
  const t = useDictionary();

  const footerLinks = {
    product: {
      title: t.footer.product,
      links: [
        { label: t.footer.productLinks[0], href: "#features" },
        { label: t.footer.productLinks[1], href: "#programs" },
        { label: t.footer.productLinks[2], href: "#pricing" },
        { label: t.footer.productLinks[3], href: "#" },
        { label: t.footer.productLinks[4], href: "#" },
      ],
    },
    company: {
      title: t.footer.company,
      links: [
        { label: t.footer.companyLinks[0], href: "#" },
        { label: t.footer.companyLinks[1], href: "#" },
        { label: t.footer.companyLinks[2], href: "#" },
        { label: t.footer.companyLinks[3], href: "#" },
        { label: t.footer.companyLinks[4], href: "#" },
      ],
    },
    legal: {
      title: t.footer.legal,
      links: [
        { label: t.footer.legalLinks[0], href: "#" },
        { label: t.footer.legalLinks[1], href: "#" },
        { label: t.footer.legalLinks[2], href: "#" },
        { label: t.footer.legalLinks[3], href: "#" },
      ],
    },
  };

  return (
    <footer className="bg-background border-t border-black/8">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 md:py-20">

        {/* Top row: brand + newsletter + links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-12 mb-16">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/assets/logos/7am-text.png"
                alt="7AM"
                width={80}
                height={28}
                className="h-7 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              {t.footer.description}
            </p>

            {/* Newsletter */}
            <p className="text-xs font-medium tracking-[0.12em] uppercase mb-3">{t.footer.newsletter}</p>
            <form className="flex border border-black/12" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 px-4 py-2.5 text-sm bg-transparent outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="px-4 border-l border-black/12 text-foreground hover:bg-secondary transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Social links — only show if real URLs */}
            {socialLinks.some((s) => s.href !== "#") && (
              <div className="flex gap-3 mt-5">
                {socialLinks.filter((s) => s.href !== "#").map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 border border-black/12 flex items-center justify-center
                               text-muted-foreground hover:text-foreground hover:border-black/30 transition-colors"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-medium tracking-[0.12em] uppercase mb-5 text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-black/8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.privacy}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.terms}</Link>
            <Link href="#" className="hover:text-foreground transition-colors">{t.footer.cookies}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
