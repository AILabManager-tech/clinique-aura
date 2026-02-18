import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
  useLocale: () => "fr",
}));

vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import {
  CookieConsent,
  CookieSettingsButton,
} from "@/components/legal/CookieConsent";

beforeEach(() => {
  localStorage.clear();
});

afterEach(cleanup);

describe("CookieConsent", () => {
  it("renders the dialog when no consent is stored", () => {
    render(<CookieConsent />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("does not render when consent is already stored", () => {
    localStorage.setItem(
      "clinique-aura-cookie-consent",
      JSON.stringify({
        essential: true,
        analytics: false,
        marketing: false,
        timestamp: "2026-01-01",
      })
    );
    render(<CookieConsent />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has reject, customize, and accept buttons", () => {
    render(<CookieConsent />);
    expect(
      screen.getByLabelText("Refuser tous les témoins optionnels")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Personnaliser les préférences de témoins")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Accepter tous les témoins")
    ).toBeInTheDocument();
  });

  it("saves consent on accept all", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Tout accepter"));
    const stored = JSON.parse(
      localStorage.getItem("clinique-aura-cookie-consent")!
    );
    expect(stored.analytics).toBe(true);
    expect(stored.marketing).toBe(true);
    expect(stored.essential).toBe(true);
  });

  it("saves consent with only essential on reject all", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Tout refuser"));
    const stored = JSON.parse(
      localStorage.getItem("clinique-aura-cookie-consent")!
    );
    expect(stored.analytics).toBe(false);
    expect(stored.marketing).toBe(false);
    expect(stored.essential).toBe(true);
  });

  it("shows detail categories when personalize is clicked", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Personnaliser"));
    expect(screen.getByText("Essentiels")).toBeInTheDocument();
    expect(screen.getByText("Analytiques")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("allows toggling analytics checkbox", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Personnaliser"));
    const analyticsCheckbox = screen.getByLabelText("Témoins analytiques");
    expect(analyticsCheckbox).not.toBeChecked();
    fireEvent.click(analyticsCheckbox);
    expect(analyticsCheckbox).toBeChecked();
  });

  it("saves customized preferences", () => {
    render(<CookieConsent />);
    fireEvent.click(screen.getByText("Personnaliser"));
    fireEvent.click(screen.getByLabelText("Témoins analytiques"));
    fireEvent.click(screen.getByText("Sauvegarder mes choix"));
    const stored = JSON.parse(
      localStorage.getItem("clinique-aura-cookie-consent")!
    );
    expect(stored.analytics).toBe(true);
    expect(stored.marketing).toBe(false);
  });

  it("contains a privacy policy link", () => {
    render(<CookieConsent />);
    const link = screen.getByText("politique de confidentialité");
    expect(link.closest("a")).toHaveAttribute(
      "href",
      "/fr/politique-confidentialite"
    );
  });
});

describe("CookieSettingsButton", () => {
  it("renders a button", () => {
    render(<CookieSettingsButton />);
    expect(screen.getByText("Gestion des témoins")).toBeInTheDocument();
  });
});
