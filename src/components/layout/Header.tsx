"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import type { Locale } from "@/i18n/routing";

const navLinks = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/a-propos", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

/**
 * Header navigation component for Clinique Aura with locale-aware links and mobile menu.
 * Serene, calming design with sky-600 primary and sage accents.
 *
 * @component
 * @example
 * <Header />
 */
export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function switchLocale() {
    const next = locale === "fr" ? "en" : "fr";
    router.replace(pathname, { locale: next });
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-pearl-200 shadow-lg shadow-sky-900/10"
          : "bg-pearl-200/80 backdrop-blur-xl border-b border-sky-100/30 shadow-sm"
      }`}
    >
      {/* Gradient accent line */}
      <div className="h-0.5 bg-gradient-to-r from-sky-500 via-sage-400 to-peach-400" />

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo wordmark with wellness leaf icon */}
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold text-charcoal transition-colors"
        >
          <svg
            className="h-7 w-7 text-sky-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c-1.2 0-3.6 1.2-4.8 3.6C6 9 6 12 7.2 14.4c1.2 2.4 3 4.2 4.8 6.6 1.8-2.4 3.6-4.2 4.8-6.6C18 12 18 9 16.8 6.6 15.6 4.2 13.2 3 12 3z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18"
            />
          </svg>
          <span>
            Clinique <span className="text-sky-600">Aura</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              className={`relative text-sm font-medium transition-colors hover:text-sky-600 ${
                pathname === href
                  ? "text-sky-600"
                  : "text-charcoal/70"
              }`}
            >
              {t(key)}
              {pathname === href && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-sky-500" />
              )}
            </Link>
          ))}

          {/* Language switcher */}
          <button
            onClick={switchLocale}
            className="rounded-lg border border-sky-200/60 bg-white/50 px-3 py-1.5 text-xs font-medium text-charcoal/60 transition-all hover:border-sky-400 hover:text-sky-600 hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            aria-label={locale === "fr" ? "Passer \u00e0 l\u2019anglais" : "Switch to French"}
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>

          {/* CTA */}
          <Link
            href="/contact"
            className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-sky-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-600/20"
          >
            {t("cta")}
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 rounded-md p-1"
          aria-label={locale === "fr" ? "Ouvrir le menu" : "Toggle menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${
              mobileOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-charcoal transition-transform ${
              mobileOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          id="mobile-nav"
          className="border-t border-sky-100/50 bg-pearl-200/95 backdrop-blur-xl px-6 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`text-base font-medium transition-colors ${
                  pathname === href
                    ? "text-sky-600"
                    : "text-charcoal/70 hover:text-sky-600"
                }`}
              >
                {t(key)}
              </Link>
            ))}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={switchLocale}
                className="rounded-lg border border-sky-200 px-3 py-1.5 text-sm text-charcoal/60 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
                aria-label={locale === "fr" ? "Switch to English" : "Passer au fran\u00e7ais"}
              >
                {locale === "fr" ? "English" : "Fran\u00e7ais"}
              </button>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-sky-600 px-5 py-2 text-sm font-medium text-white hover:bg-sky-700"
              >
                {t("cta")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
