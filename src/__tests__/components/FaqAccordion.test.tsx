import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

const mockItems = [
  { question: "Ai-je besoin d'une référence médicale?", answer: "Non, aucune référence n'est nécessaire." },
  { question: "Mes traitements sont-ils couverts par les assurances?", answer: "La plupart des régimes couvrent nos services." },
  { question: "Combien de séances seront nécessaires?", answer: "En moyenne, 4 à 8 séances suffisent." },
];

afterEach(cleanup);

describe("FaqAccordion", () => {
  it("renders all questions", () => {
    render(<FaqAccordion items={mockItems} />);
    expect(screen.getByText("Ai-je besoin d'une référence médicale?")).toBeInTheDocument();
    expect(screen.getByText("Mes traitements sont-ils couverts par les assurances?")).toBeInTheDocument();
    expect(screen.getByText("Combien de séances seront nécessaires?")).toBeInTheDocument();
  });

  it("renders all answers in DOM", () => {
    render(<FaqAccordion items={mockItems} />);
    expect(screen.getByText("Non, aucune référence n'est nécessaire.")).toBeInTheDocument();
    expect(screen.getByText("La plupart des régimes couvrent nos services.")).toBeInTheDocument();
  });

  it("all items start collapsed (aria-expanded=false)", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");
    buttons.forEach((btn) => {
      expect(btn).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("expands an item on click", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
  });

  it("collapses an expanded item on second click", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
  });

  it("only one item can be open at a time", () => {
    render(<FaqAccordion items={mockItems} />);
    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "true");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(buttons[1]!);
    expect(buttons[0]).toHaveAttribute("aria-expanded", "false");
    expect(buttons[1]).toHaveAttribute("aria-expanded", "true");
  });
});
