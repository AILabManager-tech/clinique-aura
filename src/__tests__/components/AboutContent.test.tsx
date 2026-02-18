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

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <h2>{children}</h2>,
}));

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
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

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/interactive/PractitionerCards", () => ({
  PractitionerCards: () => <div data-testid="practitioner-cards" />,
}));

vi.mock("@/hooks/useAnimations", () => ({
  useReducedMotion: () => false,
  useInView: () => true,
}));

vi.mock("lucide-react", () => ({
  ShieldCheck: () => <span data-testid="icon-shieldcheck" />,
  Award: () => <span data-testid="icon-award" />,
  Sparkles: () => <span data-testid="icon-sparkles" />,
}));

import { AboutContent } from "@/components/pages/AboutContent";

afterEach(cleanup);

describe("AboutContent", () => {
  it("renders the main element", () => {
    render(<AboutContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    render(<AboutContent />);
    expect(screen.getByText("hero.subtitle")).toBeInTheDocument();
  });

  it("renders story section", () => {
    render(<AboutContent />);
    expect(screen.getByText("story.title")).toBeInTheDocument();
    expect(screen.getByText("story.p1")).toBeInTheDocument();
    expect(screen.getByText("story.p2")).toBeInTheDocument();
    expect(screen.getByText("story.p3")).toBeInTheDocument();
  });

  it("renders values section title", () => {
    render(<AboutContent />);
    expect(screen.getByText("values.title")).toBeInTheDocument();
  });

  it("renders value cards (wellness, excellence, holistic)", () => {
    render(<AboutContent />);
    expect(screen.getByText("wellness.title")).toBeInTheDocument();
    expect(screen.getByText("excellence.title")).toBeInTheDocument();
    expect(screen.getByText("holistic.title")).toBeInTheDocument();
  });

  it("renders PractitionerCards component", () => {
    render(<AboutContent />);
    expect(screen.getByTestId("practitioner-cards")).toBeInTheDocument();
  });

  it("renders CTA section with booking button", () => {
    render(<AboutContent />);
    expect(screen.getByText("cta.title")).toBeInTheDocument();
    expect(screen.getByText("cta.button")).toBeInTheDocument();
  });

  it("renders AuroraBackground in hero", () => {
    render(<AboutContent />);
    const auroras = screen.getAllByTestId("aurora");
    expect(auroras.length).toBeGreaterThanOrEqual(1);
  });

  it("renders multiple sections", () => {
    render(<AboutContent />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(3);
  });
});
