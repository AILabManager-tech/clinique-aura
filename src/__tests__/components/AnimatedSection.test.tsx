import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

// Mock IntersectionObserver as a proper class for useInView hook
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.callback = cb;
    // Immediately trigger as intersecting
    setTimeout(() => cb([{ isIntersecting: true } as IntersectionObserverEntry], this as unknown as IntersectionObserver), 0);
  }
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

// Mock matchMedia for useReducedMotion hook
vi.stubGlobal("matchMedia", vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})));

import { AnimatedSection } from "@/components/ui/AnimatedSection";

afterEach(cleanup);

describe("AnimatedSection", () => {
  it("renders children", () => {
    render(
      <AnimatedSection>
        <p>Hello world</p>
      </AnimatedSection>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("applies className prop", () => {
    const { container } = render(
      <AnimatedSection className="my-class">
        <p>Test</p>
      </AnimatedSection>
    );
    expect(container.firstChild).toHaveClass("my-class");
  });

  it("renders with direction=left", () => {
    render(
      <AnimatedSection direction="left">
        <span>Left</span>
      </AnimatedSection>
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
  });

  it("renders with direction=right", () => {
    render(
      <AnimatedSection direction="right">
        <span>Right</span>
      </AnimatedSection>
    );
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("renders with direction=none", () => {
    render(
      <AnimatedSection direction="none">
        <span>None</span>
      </AnimatedSection>
    );
    expect(screen.getByText("None")).toBeInTheDocument();
  });
});
