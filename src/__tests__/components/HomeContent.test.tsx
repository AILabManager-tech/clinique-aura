import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

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

vi.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
    button: ({
      children,
      ...props
    }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
      <button {...props}>{children}</button>
    ),
    blockquote: ({
      children,
      ...props
    }: React.HTMLAttributes<HTMLQuoteElement>) => (
      <blockquote {...props}>{children}</blockquote>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  useReducedMotion: () => false,
}));

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("next/link", () => ({
  default: ({
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

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <h1 className={className}>{children}</h1>,
}));

vi.mock("@/components/animations/MagneticButton", () => ({
  MagneticButton: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/CountUp", () => ({
  CountUp: ({ to, suffix }: { to: number; suffix?: string }) => (
    <span>
      {to}
      {suffix}
    </span>
  ),
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

vi.mock("@/components/animations/FloatingElement", () => ({
  FloatingElement: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/interactive/SymptomNavigator", () => ({
  SymptomNavigator: () => <div data-testid="symptom-navigator" />,
}));

vi.mock("@/components/interactive/PractitionerCards", () => ({
  PractitionerCards: () => <div data-testid="practitioner-cards" />,
}));

vi.mock("@/components/interactive/BookingCTA", () => ({
  BookingCTA: () => <div data-testid="booking-cta" />,
}));

vi.mock("lucide-react", () => ({
  Activity: () => <span data-testid="icon-activity" />,
  Bone: () => <span data-testid="icon-bone" />,
  Heart: () => <span data-testid="icon-heart" />,
  Apple: () => <span data-testid="icon-apple" />,
}));

import { HomeContent } from "@/components/pages/HomeContent";

afterEach(cleanup);

describe("HomeContent", () => {
  it("renders the main element", () => {
    render(<HomeContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero section with title", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.subtitle")).toBeInTheDocument();
  });

  it("renders hero CTA buttons", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.cta")).toBeInTheDocument();
    expect(screen.getByText("hero.cta_secondary")).toBeInTheDocument();
  });

  it("renders stats section", () => {
    render(<HomeContent />);
    expect(screen.getByText("stats.experience")).toBeInTheDocument();
    expect(screen.getByText("stats.disciplines")).toBeInTheDocument();
    expect(screen.getByText("stats.patients")).toBeInTheDocument();
  });

  it("renders services section with title", () => {
    render(<HomeContent />);
    expect(screen.getByText("services.title")).toBeInTheDocument();
    expect(screen.getByText("services.subtitle")).toBeInTheDocument();
  });

  it("renders four service cards (physio, osteo, massage, nutrition)", () => {
    render(<HomeContent />);
    expect(screen.getByText("services.physio.title")).toBeInTheDocument();
    expect(screen.getByText("services.osteo.title")).toBeInTheDocument();
    expect(screen.getByText("services.massage.title")).toBeInTheDocument();
    expect(screen.getByText("services.nutrition.title")).toBeInTheDocument();
  });

  it("renders SymptomNavigator component", () => {
    render(<HomeContent />);
    expect(screen.getByTestId("symptom-navigator")).toBeInTheDocument();
  });

  it("renders PractitionerCards component", () => {
    render(<HomeContent />);
    expect(screen.getByTestId("practitioner-cards")).toBeInTheDocument();
  });

  it("renders testimonials section", () => {
    render(<HomeContent />);
    expect(screen.getByText("testimonials.title")).toBeInTheDocument();
  });

  it("renders BookingCTA component", () => {
    render(<HomeContent />);
    expect(screen.getByTestId("booking-cta")).toBeInTheDocument();
  });

  it("renders multiple content sections", () => {
    render(<HomeContent />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });

  it("renders hero badge", () => {
    render(<HomeContent />);
    expect(screen.getByText("hero.badge")).toBeInTheDocument();
  });
});
