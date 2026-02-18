"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

type CookieCategory = "essential" | "analytics" | "marketing";

interface ConsentState {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const CONSENT_KEY = "clinique-aura-cookie-consent";

const DEFAULT_CONSENT: ConsentState = {
  essential: true,
  analytics: false,
  marketing: false,
  timestamp: "",
};

export function useConsent() {
  const [consent, setConsent] = useState<ConsentState | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        setConsent(JSON.parse(stored));
      } catch {
        setConsent(null);
      }
    }
  }, []);

  const saveConsent = useCallback((newConsent: ConsentState) => {
    const withTimestamp = { ...newConsent, timestamp: new Date().toISOString() };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(withTimestamp));
    setConsent(withTimestamp);

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: newConsent.analytics ? "granted" : "denied",
      });
    }
  }, []);

  const hasConsented = consent !== null;
  const isAnalyticsAllowed = consent?.analytics ?? false;
  const isMarketingAllowed = consent?.marketing ?? false;

  return { consent, saveConsent, hasConsented, isAnalyticsAllowed, isMarketingAllowed };
}

/**
 * Cookie consent banner compliant with Quebec's Law 25, with category toggles.
 *
 * @component
 * @example
 * <CookieConsent />
 */
export function CookieConsent() {
  const { saveConsent, hasConsented } = useConsent();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<ConsentState>(DEFAULT_CONSENT);

  if (hasConsented) return null;

  const handleAcceptAll = () => {
    saveConsent({ essential: true, analytics: true, marketing: true, timestamp: "" });
  };

  const handleRejectAll = () => {
    saveConsent({ essential: true, analytics: false, marketing: false, timestamp: "" });
  };

  const handleSavePreferences = () => {
    saveConsent({ ...preferences, essential: true, timestamp: "" });
  };

  const toggleCategory = (category: CookieCategory) => {
    if (category === "essential") return;
    setPreferences((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div
      role="dialog"
      aria-label="Gestion des témoins (cookies)"
      aria-modal="true"
      className="fixed bottom-0 left-0 right-0 z-[60] border-t border-pearl-400 bg-pearl-200 p-4 shadow-2xl md:p-6"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-4">
          <h2 className="mb-2 font-heading text-lg font-semibold text-charcoal">
            Gestion des témoins (cookies)
          </h2>
          <p className="text-sm text-charcoal/70">
            Nous utilisons des témoins pour améliorer votre expérience. Conformément à
            la <strong>Loi 25 du Québec</strong>, seuls les témoins essentiels sont
            actifs par défaut. Vous pouvez accepter ou refuser les témoins optionnels.
          </p>
        </div>

        {showDetails && (
          <div className="mb-4 space-y-3">
            <label className="flex items-center gap-3 rounded-xl bg-pearl-300/50 p-3">
              <input
                type="checkbox"
                checked={true}
                disabled
                aria-label="Témoins essentiels (toujours actifs)"
                className="h-4 w-4 accent-sky-700"
              />
              <div>
                <span className="font-medium text-charcoal">Essentiels</span>
                <span className="ml-2 text-xs text-charcoal/80">(toujours actifs)</span>
                <p className="mt-1 text-xs text-charcoal/70">
                  Nécessaires au fonctionnement du site. Ne peuvent pas être désactivés.
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-pearl-300/50 p-3">
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => toggleCategory("analytics")}
                aria-label="Témoins analytiques"
                className="h-4 w-4 accent-sky-700"
              />
              <div>
                <span className="font-medium text-charcoal">Analytiques</span>
                <p className="mt-1 text-xs text-charcoal/70">
                  Nous aident à comprendre comment les visiteurs utilisent le site (ex. : Google Analytics).
                </p>
              </div>
            </label>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-pearl-300/50 p-3">
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={() => toggleCategory("marketing")}
                aria-label="Témoins marketing"
                className="h-4 w-4 accent-sky-700"
              />
              <div>
                <span className="font-medium text-charcoal">Marketing</span>
                <p className="mt-1 text-xs text-charcoal/70">
                  Utilisés pour afficher des publicités pertinentes et mesurer leur efficacité.
                </p>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
          <button
            onClick={handleRejectAll}
            className="flex-1 rounded-xl bg-pearl-400 px-4 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-pearl-500 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Tout refuser
          </button>

          {showDetails ? (
            <button
              onClick={handleSavePreferences}
              className="flex-1 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Sauvegarder mes choix
            </button>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="flex-1 rounded-xl border border-sky-400 bg-transparent px-4 py-2.5 text-sm font-medium text-sky-700 transition-colors hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            >
              Personnaliser
            </button>
          )}

          <button
            onClick={handleAcceptAll}
            className="flex-1 rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
          >
            Tout accepter
          </button>
        </div>

        <p className="mt-3 text-center text-xs text-charcoal/80">
          Pour en savoir plus, consultez notre{" "}
          <Link
            href="/fr/politique-confidentialite"
            className="text-charcoal underline hover:text-charcoal/70 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export function CookieSettingsButton() {
  const handleOpen = () => {
    localStorage.removeItem(CONSENT_KEY);
    window.location.reload();
  };

  return (
    <button
      onClick={handleOpen}
      className="text-sm text-pearl-500 underline transition-colors hover:text-pearl-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
    >
      Gestion des témoins
    </button>
  );
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
