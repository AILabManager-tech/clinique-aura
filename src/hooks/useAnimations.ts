"use client";

import { useState, useEffect, type RefObject } from "react";

export function useInView(ref: RefObject<Element | null>, options?: { once?: boolean; margin?: string }): boolean {
  const [isInView, setIsInView] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry?.isIntersecting) { setIsInView(true); if (options?.once !== false) observer.disconnect(); }
    }, { rootMargin: options?.margin || "0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return isInView;
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}
