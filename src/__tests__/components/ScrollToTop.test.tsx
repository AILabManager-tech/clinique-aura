import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi, beforeEach } from "vitest";

// Mock matchMedia for useReducedMotion hook
vi.stubGlobal("matchMedia", vi.fn(() => ({
  matches: false,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
})));

import { ScrollToTop } from "@/components/ui/ScrollToTop";

afterEach(() => {
  cleanup();
});

describe("ScrollToTop", () => {
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      writable: true,
      value: 0,
    });
    Object.defineProperty(window, "scrollTo", {
      configurable: true,
      writable: true,
      value: vi.fn(),
    });
  });

  it("renders without crashing", () => {
    render(<ScrollToTop />);
  });

  it("button is hidden when scroll is 0 (aria-hidden=true)", () => {
    Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 0 });
    render(<ScrollToTop />);
    const btn = screen.getByRole("button", { hidden: true });
    expect(btn).toHaveAttribute("aria-hidden", "true");
    expect(btn).toHaveAttribute("tabindex", "-1");
  });

  it("button appears after scrolling past 400px", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 401 });
      window.dispatchEvent(new Event("scroll"));
    });

    const btn = screen.getByRole("button", { name: /retour en haut/i });
    expect(btn).toHaveAttribute("aria-hidden", "false");
    expect(btn).toHaveAttribute("tabindex", "0");
  });

  it("button is hidden when scroll is exactly at 400px", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 400 });
      window.dispatchEvent(new Event("scroll"));
    });

    const btn = screen.getByRole("button", { hidden: true });
    expect(btn).toHaveAttribute("aria-hidden", "true");
  });

  it("button disappears when scrolling back below 400px", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("button", { name: /retour en haut/i })).toHaveAttribute("aria-hidden", "false");

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 100 });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(screen.getByRole("button", { hidden: true })).toHaveAttribute("aria-hidden", "true");
  });

  it("clicking the button calls window.scrollTo with top: 0", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });

    const btn = screen.getByRole("button", { name: /retour en haut/i });
    fireEvent.click(btn);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("button has correct aria-label for accessibility", () => {
    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });

    const btn = screen.getByRole("button", { name: "Retour en haut de page" });
    expect(btn).toBeInTheDocument();
  });

  it("removes scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = render(<ScrollToTop />);
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });

  it("adds scroll event listener on mount", () => {
    const addEventListenerSpy = vi.spyOn(window, "addEventListener");
    render(<ScrollToTop />);
    expect(addEventListenerSpy).toHaveBeenCalledWith("scroll", expect.any(Function), { passive: true });
    addEventListenerSpy.mockRestore();
  });

  it("renders correctly with reduced motion preference", () => {
    // Override matchMedia to return reduced motion
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));

    render(<ScrollToTop />);

    act(() => {
      Object.defineProperty(window, "scrollY", { configurable: true, writable: true, value: 500 });
      window.dispatchEvent(new Event("scroll"));
    });

    const btn = screen.getByRole("button", { name: /retour en haut/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    // Restore default
    vi.stubGlobal("matchMedia", vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })));
  });
});
