"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/language-switcher";

export function Navbar() {
  const t = useDictionary();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "#features", label: t.nav.features },
    { href: "#programs", label: t.nav.programs },
    { href: "#testimonials", label: t.nav.community },
    { href: "/partners", label: t.nav.partners },
    { href: "#pricing", label: t.nav.pricing },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm border-b border-black/8"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-[70px]">

            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/assets/logos/7am-text.png"
                alt="7AM"
                width={80}
                height={28}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop nav links — centre */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-hover text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop right: language + CTA */}
            <div className="hidden md:flex items-center gap-5">
              <LanguageSwitcher />
              <Link
                href="/member/login"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {t.nav.signIn}
              </Link>
              <Link href="#pricing" className="btn-primary text-xs">
                {t.nav.getStarted}
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-foreground"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background">
          <div className="flex items-center justify-between px-6 h-16 border-b border-black/8">
            <Image
              src="/assets/logos/7am-text.png"
              alt="7AM"
              width={80}
              height={28}
              className="h-7 w-auto"
            />
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="p-2 -mr-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-4 text-2xl font-light border-b border-black/6 text-foreground hover:text-muted-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-10 flex flex-col gap-3">
            <LanguageSwitcher />
            <Link
              href="/member/login"
              onClick={() => setMobileOpen(false)}
              className="btn-outline w-full justify-center text-sm"
            >
              {t.nav.signIn}
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center text-sm"
            >
              {t.nav.getStarted}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
