import { render, screen, cleanup, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, afterEach, vi } from "vitest";

vi.mock("sonner", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

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

vi.mock("framer-motion", () => {
  const mc = (Tag: string) => {
    const FM_PROPS = new Set([
      "initial", "animate", "exit", "transition", "whileInView",
      "viewport", "variants", "whileHover", "whileTap", "layout",
      "layoutId",
    ]);
    const C = ({ children, ...props }: Record<string, unknown>) => {
      const safe: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(props)) {
        if (!FM_PROPS.has(k)) {
          safe[k] = v;
        }
      }
      const El = Tag as unknown as React.ElementType;
      return <El {...safe}>{children as React.ReactNode}</El>;
    };
    C.displayName = `motion.${Tag}`;
    return C;
  };
  return {
    motion: {
      div: mc("div"), span: mc("span"), button: mc("button"),
      section: mc("section"), a: mc("a"), h1: mc("h1"),
      h2: mc("h2"), h3: mc("h3"), p: mc("p"),
      create: (tag: string) => mc(tag),
    },
    animate: () => ({ stop: () => {} }),
    useInView: () => true,
    useScroll: () => ({ scrollYProgress: { get: () => 0.5 } }),
    useTransform: () => 0,
    useMotionValue: (v: number = 0) => ({ set: () => {}, get: () => v }),
    useSpring: () => ({ set: () => {}, get: () => 0 }),
    useReducedMotion: () => false,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

vi.mock("next/image", () => ({
  default: (props: { alt: string; src: string }) => (
    <img alt={props.alt} src={props.src} />
  ),
}));

vi.mock("@/components/ui/AnimatedSection", () => ({
  AnimatedSection: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <div>{children}</div>,
}));

vi.mock("@/components/animations/AuroraBackground", () => ({
  AuroraBackground: () => <div data-testid="aurora" />,
}));

vi.mock("@/components/animations/TextReveal", () => ({
  TextReveal: ({
    children,
  }: {
    children: React.ReactNode;
  }) => <h1>{children}</h1>,
}));

vi.mock("@/components/animations/LineReveal", () => ({
  LineReveal: () => <div data-testid="line-reveal" />,
}));

import { ContactContent } from "@/components/pages/ContactContent";
import { toast } from "sonner";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("ContactContent", () => {
  it("renders the main element", () => {
    render(<ContactContent />);
    expect(document.querySelector("main")).toBeInTheDocument();
  });

  it("renders hero title", () => {
    render(<ContactContent />);
    expect(screen.getByText("hero.title")).toBeInTheDocument();
  });

  it("renders the contact form with name, email, and message fields", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText(/form\.name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/form\.email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/form\.message/)).toBeInTheDocument();
  });

  it("renders the service select field", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText("form.service")).toBeInTheDocument();
  });

  it("renders the consent checkbox", () => {
    render(<ContactContent />);
    const checkbox = document.querySelector('input[name="consent"]');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute("type", "checkbox");
    expect(checkbox).toHaveAttribute("required");
  });

  it("renders the submit button", () => {
    render(<ContactContent />);
    expect(screen.getByText("form.submit")).toBeInTheDocument();
  });

  it("renders contact info section with Clinique Aura details", () => {
    render(<ContactContent />);
    expect(screen.getByText("info@clinique-aura.ca")).toBeInTheDocument();
    expect(screen.getByText("(819) 555-0200")).toBeInTheDocument();
  });

  it("renders address showing Sherbrooke", () => {
    render(<ContactContent />);
    expect(screen.getByText(/Sherbrooke/)).toBeInTheDocument();
  });

  it("submit button is enabled before submission", () => {
    render(<ContactContent />);
    const btn = screen.getByRole("button", { name: /form\.submit/i });
    expect(btn).not.toBeDisabled();
  });

  it("shows spinner and disables button while sending", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    // Fill required fields to pass validation
    fireEvent.change(screen.getByLabelText(/form\.name/), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText(/form\.email/), { target: { value: "marie@example.com" } });
    // Select a service
    const select = screen.getByLabelText("form.service");
    fireEvent.change(select, { target: { value: "physio" } });
    fireEvent.change(screen.getByLabelText(/form\.message/), { target: { value: "Besoin de physiothérapie pour mon dos" } });
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).toBeDisabled();
    expect(document.querySelector(".animate-spin")).toBeInTheDocument();

    await act(async () => {
      await vi.runAllTimersAsync();
    });
  });

  it("calls toast.success after successful submission", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText(/form\.name/), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText(/form\.email/), { target: { value: "marie@example.com" } });
    const select = screen.getByLabelText("form.service");
    fireEvent.change(select, { target: { value: "physio" } });
    fireEvent.change(screen.getByLabelText(/form\.message/), { target: { value: "Besoin de physiothérapie pour mon dos" } });
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    expect(toast.success).toHaveBeenCalledWith("form.success");
  });

  it("button is re-enabled after submission completes", async () => {
    vi.useFakeTimers();
    render(<ContactContent />);

    fireEvent.change(screen.getByLabelText(/form\.name/), { target: { value: "Marie Tremblay" } });
    fireEvent.change(screen.getByLabelText(/form\.email/), { target: { value: "marie@example.com" } });
    const select = screen.getByLabelText("form.service");
    fireEvent.change(select, { target: { value: "physio" } });
    fireEvent.change(screen.getByLabelText(/form\.message/), { target: { value: "Besoin de physiothérapie pour mon dos" } });
    const checkbox = document.querySelector('input[name="consent"]') as HTMLInputElement;
    fireEvent.click(checkbox);

    const form = document.querySelector("form") as HTMLFormElement;
    await act(async () => {
      fireEvent.submit(form);
    });

    await act(async () => {
      await vi.runAllTimersAsync();
    });

    const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(btn).not.toBeDisabled();
  });

  it("form fields accept user input", () => {
    render(<ContactContent />);
    const nameInput = screen.getByLabelText(/form\.name/) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: "Test User" } });
    expect(nameInput.value).toBe("Test User");
  });

  it("renders aurora background", () => {
    render(<ContactContent />);
    expect(screen.getByTestId("aurora")).toBeInTheDocument();
  });

  it("renders response time notice", () => {
    render(<ContactContent />);
    expect(screen.getByText("form.response_time")).toBeInTheDocument();
  });

  it("required fields have correct required attribute", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText(/form\.name/)).toHaveAttribute("required");
    expect(screen.getByLabelText(/form\.email/)).toHaveAttribute("required");
    expect(screen.getByLabelText(/form\.message/)).toHaveAttribute("required");
  });

  it("email field has type email", () => {
    render(<ContactContent />);
    expect(screen.getByLabelText(/form\.email/)).toHaveAttribute("type", "email");
  });

  it("renders Loi 25 privacy link", () => {
    render(<ContactContent />);
    expect(screen.getByText("form.privacy_link")).toBeInTheDocument();
  });
});
