import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { CookieSettingsButton } from "@/components/legal/CookieConsent";

/**
 * Site footer for Clinique Aura with navigation links, contact info, hours, and legal links.
 * Sky-900 background with pearl/sage accents.
 *
 * @component
 * @example
 * <Footer />
 */
export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-sky-900 text-pearl-300">
      {/* Gradient accent line at top */}
      <div className="h-1 bg-gradient-to-r from-sky-500 via-sage-400 to-peach-400" />

      {/* Mini CTA bar */}
      <div className="relative border-b border-sky-800 bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 px-6 py-10 text-center">
        <div className="relative z-10">
          <p className="mb-5 font-heading text-2xl font-semibold text-pearl-100">
            {t("cta")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl bg-peach-400 px-8 py-3 font-medium text-charcoal transition-all hover:bg-peach-500 hover:scale-[1.02] hover:shadow-lg hover:shadow-peach-400/30"
          >
            {t("cta_button")}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-heading text-xl font-semibold text-pearl-100">
              Clinique <span className="text-sky-400">Aura</span>
            </p>
            <p className="mt-2 text-sm text-pearl-400">{t("tagline")}</p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">
              Navigation
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-pearl-400 transition-colors hover:text-pearl-100"
              >
                {nav("home")}
              </Link>
              <Link
                href="/services"
                className="text-sm text-pearl-400 transition-colors hover:text-pearl-100"
              >
                {nav("services")}
              </Link>
              <Link
                href="/a-propos"
                className="text-sm text-pearl-400 transition-colors hover:text-pearl-100"
              >
                {nav("about")}
              </Link>
              <Link
                href="/contact"
                className="text-sm text-pearl-400 transition-colors hover:text-pearl-100"
              >
                {nav("contact")}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">
              Contact
            </p>
            <div className="flex flex-col gap-2 text-sm text-pearl-400">
              <p>
                2500, rue King Ouest, bureau 300
                <br />
                Sherbrooke (QC)&nbsp;J1J&nbsp;2E8
              </p>
              <a
                href="tel:+18195550200"
                className="transition-colors hover:text-pearl-100"
              >
                (819)&nbsp;555-0200
              </a>
              <a
                href="mailto:info@clinique-aura.ca"
                className="transition-colors hover:text-pearl-100"
              >
                info@clinique-aura.ca
              </a>
            </div>
          </div>

          {/* Hours */}
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-sky-400">
              {locale === "fr" ? "Heures d\u2019ouverture" : "Opening Hours"}
            </p>
            <div className="flex flex-col gap-1 text-sm text-pearl-400">
              <p>
                {locale === "fr" ? "Lun\u2013Ven" : "Mon\u2013Fri"}{" "}
                <span className="text-pearl-200">8h00 \u2013 18h00</span>
              </p>
              <p>
                {locale === "fr" ? "Sam" : "Sat"}{" "}
                <span className="text-pearl-200">9h00 \u2013 13h00</span>
              </p>
              <p>
                {locale === "fr" ? "Dim" : "Sun"}{" "}
                <span className="text-pearl-500">
                  {locale === "fr" ? "Ferm\u00e9" : "Closed"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6 h-px bg-sky-700/60" />

        {/* Legal links */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
          <Link
            href="/mentions-legales"
            className="text-xs text-pearl-500 transition-colors hover:text-pearl-200"
          >
            {locale === "fr" ? "Mentions l\u00e9gales" : "Legal Notice"}
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-xs text-pearl-500 transition-colors hover:text-pearl-200"
          >
            {locale === "fr" ? "Politique de confidentialit\u00e9" : "Privacy Policy"}
          </Link>
          <CookieSettingsButton />
        </div>

        {/* RPP + Copyright */}
        <div className="mt-4 text-center text-xs text-pearl-500">
          <p>
            {locale === "fr"
              ? "Responsable de la protection des renseignements personnels : Dre Sophie Lafleur"
              : "Privacy Officer: Dr. Sophie Lafleur"}{" "}
            &mdash;{" "}
            <a
              href="mailto:rpp@clinique-aura.ca"
              className="underline transition-colors hover:text-pearl-200"
            >
              rpp@clinique-aura.ca
            </a>
          </p>
          <p className="mt-2">
            &copy; {year} Clinique Aura. {locale === "fr" ? "Tous droits r\u00e9serv\u00e9s." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
}
