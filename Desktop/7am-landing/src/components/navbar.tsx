"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { useDictionary } from "@/i18n/provider";
import { LanguageSwitcher } from "@/components/language-switcher";

// kismas.com measured: header 51px, logo ~48px font, links 18px, right-aligned
const NAV_H = 52;

export function Navbar() {
  const t = useDictionary();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { href: "#features",     label: t.nav.features },
    { href: "#programs",     label: t.nav.programs },
    { href: "#testimonials", label: t.nav.community },
    { href: "/partners",     label: t.nav.partners },
    { href: "#pricing",      label: t.nav.pricing },
  ];

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const bg      = scrolled ? "#FFFFFF"                   : "transparent";
  const border  = scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent";
  const logoCl  = scrolled ? "#000000"                   : "#FFFFFF";
  const linkClr = scrolled ? "rgba(0,0,0,0.7)"           : "rgba(255,255,255,0.9)";
  const iconClr = scrolled ? "rgba(0,0,0,0.55)"          : "rgba(255,255,255,0.8)";

  return (
    <>
      {/* ── Desktop navbar ── */}
      <header
        className="fixed left-0 right-0 z-50 transition-all duration-300"
        style={{ top: "44px", background: bg, borderBottom: border }}
      >
        <nav className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between" style={{ height: `${NAV_H}px` }}>

            {/* Left — logo as bold text, matches kismas "KISMAS" visual weight */}
            <Link
              href="/"
              className="flex items-center shrink-0 transition-opacity hover:opacity-75"
              style={{
                fontSize: "1.875rem",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                color: logoCl,
                transition: "color 0.3s ease",
              }}
            >
              7AM
            </Link>

            {/* Right — nav links + lang + icons (kismas layout: all on right) */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link-hover transition-colors whitespace-nowrap"
                  style={{ fontSize: "18px", fontWeight: 400, color: linkClr }}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex items-center gap-1 ml-2">
                <LanguageSwitcher transparent={!scrolled} />
                <Link
                  href="/member/login"
                  aria-label="Sign in"
                  className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
                  style={{ color: iconClr }}
                >
                  <User className="w-[18px] h-[18px]" />
                </Link>
                <Link
                  href="#pricing"
                  aria-label="Join"
                  className="w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
                  style={{ color: iconClr }}
                >
                  <ShoppingBag className="w-[18px] h-[18px]" />
                </Link>
              </div>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center transition-opacity hover:opacity-60"
              style={{ color: iconClr }}
              onClick={() => setMobileOpen(true)}
              aria-label="Atidaryti meniu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile full-screen menu ── */}
      {mobileOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 z-[100] flex flex-col bg-white"
          style={{ top: "44px" }}
        >
          <div
            className="flex items-center justify-between px-6 border-b border-black/10"
            style={{ height: `${NAV_H}px` }}
          >
            <span style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.04em", color: "#000" }}>
              7AM
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-9 h-9 flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col flex-1 px-6 pt-4 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-5 border-b border-black/8 hover:opacity-50 transition-opacity"
                style={{ fontSize: "1.5rem", fontWeight: 400, color: "#000" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-10 pt-6 flex items-center gap-4 border-t border-black/8">
            <LanguageSwitcher />
            <Link href="/member/login" onClick={() => setMobileOpen(false)} className="btn-outline">
              {t.nav.signIn}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
