"use client";

import { useState, useEffect } from "react";
import { useReducedMotion } from "@/hooks/useAnimations";

/**
 * ScrollToTop - Floating button that scrolls to top when clicked, appears after 400px scroll.
 *
 * @component
 * @example
 * ```tsx
 * <ScrollToTop />
 * ```
 */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-sky-700 text-white shadow-lg transition-colors hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
      aria-label="Retour en haut de page"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      style={
        shouldReduceMotion
          ? {
              opacity: visible ? 1 : 0,
              pointerEvents: visible ? "auto" : "none",
            }
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              pointerEvents: visible ? "auto" : "none",
              transition: "opacity 0.2s ease-out, transform 0.2s ease-out",
            }
      }
    >
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
