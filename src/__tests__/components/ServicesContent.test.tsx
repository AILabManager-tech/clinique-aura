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

vi.mock("@/components/animations/StaggerGrid", () => ({
  StaggerGrid: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/FaqAccordion", () => ({
  FaqAccordion: ({ items }: { items: { question: string; answer: string }[] }) => (
    <div data-testid="faq-accordion">
      {items.map((item, i) => (
        <div key={i}>{item.question}</div>
      ))}
    </div>
  ),
}));

vi.mock("lucide-react", () => ({
  Activity: () => <span data-testid="icon-activity" />,
  Bone: () => <span data-testid="icon-bone" />,
  Heart: () => <span data-testid="icon-heart" />,
  Apple: () => <span data-testid="icon-apple" />,
}));

import { ServicesContent } from "@/components/pages/ServicesContent";

afterEach(cleanup);

describe("ServicesContent", () => {
  it("renders the main element", () => {
    render(<ServicesContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<ServicesContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders hero subtitle", () => {
    render(<ServicesContent />);
    expect(screen.getByText("hero.subtitle")).toBeInTheDocument();
  });

  it("renders four service sections (physio, osteo, massage, nutrition)", () => {
    render(<ServicesContent />);
    expect(screen.getByText("physio.title")).toBeInTheDocument();
    expect(screen.getByText("osteo.title")).toBeInTheDocument();
    expect(screen.getByText("massage.title")).toBeInTheDocument();
    expect(screen.getByText("nutrition.title")).toBeInTheDocument();
  });

  it("renders service descriptions", () => {
    render(<ServicesContent />);
    expect(screen.getByText("physio.description")).toBeInTheDocument();
    expect(screen.getByText("osteo.description")).toBeInTheDocument();
    expect(screen.getByText("massage.description")).toBeInTheDocument();
    expect(screen.getByText("nutrition.description")).toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    render(<ServicesContent />);
    expect(screen.getByText("faq.title")).toBeInTheDocument();
    expect(screen.getByTestId("faq-accordion")).toBeInTheDocument();
  });

  it("renders FAQ items (6 questions)", () => {
    render(<ServicesContent />);
    const faqAccordion = screen.getByTestId("faq-accordion");
    // The mock renders all 6 FAQ question keys
    expect(faqAccordion.children.length).toBe(6);
  });

  it("renders duration info for services", () => {
    render(<ServicesContent />);
    expect(screen.getByText("physio.duration")).toBeInTheDocument();
    expect(screen.getByText("osteo.duration")).toBeInTheDocument();
  });

  it("renders multiple sections", () => {
    render(<ServicesContent />);
    const sections = document.querySelectorAll("section");
    expect(sections.length).toBeGreaterThanOrEqual(4);
  });
});
