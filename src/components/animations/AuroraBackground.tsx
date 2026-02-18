"use client";

import { useReducedMotion } from "@/hooks/useAnimations";

/**
 * AuroraBackground - Animated gradient blobs and geometric shapes overlay.
 *
 * @component
 * @example
 * ```tsx
 * <AuroraBackground />
 * ```
 */
export function AuroraBackground() {
  const shouldReduceMotion = useReducedMotion();

  // When reduced motion is preferred, render static blobs without animation
  if (shouldReduceMotion) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-sky-300/20 blur-[140px]" />
        <div className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-sage-300/15 blur-[120px]" />
        <div className="absolute -bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-peach-300/12 blur-[100px]" />
        <div className="absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-sky-200/8 blur-[100px]" />
        <div className="absolute -left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-sage-200/6 blur-[80px]" />
        <div className="absolute right-[15%] top-[20%] h-16 w-16 rotate-45 rounded-lg border border-sky-300/20" />
        <div className="absolute left-[10%] bottom-[30%] h-10 w-10 rounded-full border border-peach-300/15 opacity-30" />
        <div className="absolute left-[60%] top-[60%] h-24 w-px bg-gradient-to-b from-transparent via-sky-400/20 to-transparent opacity-20" />
        <div className="absolute right-[30%] bottom-[15%] h-px w-24 bg-gradient-to-r from-transparent via-sage-400/25 to-transparent opacity-20" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 grid-overlay opacity-50" />

      {/* Large sky blob -- top left */}
      <div
        className="absolute -left-1/4 -top-1/4 h-[700px] w-[700px] rounded-full bg-sky-300/20 blur-[140px]"
        style={{ animation: "aurora-1 22s ease-in-out infinite" }}
      />

      {/* Sage blob -- right */}
      <div
        className="absolute -right-1/4 top-1/4 h-[600px] w-[600px] rounded-full bg-sage-300/15 blur-[120px]"
        style={{ animation: "aurora-2 26s ease-in-out infinite" }}
      />

      {/* Peach blob -- bottom center */}
      <div
        className="absolute -bottom-1/4 left-1/3 h-[500px] w-[500px] rounded-full bg-peach-300/12 blur-[100px]"
        style={{ animation: "aurora-3 20s ease-in-out infinite" }}
      />

      {/* Sky accent -- subtle top right */}
      <div
        className="absolute right-1/4 top-0 h-[350px] w-[350px] rounded-full bg-sky-200/8 blur-[100px]"
        style={{ animation: "aurora-4 18s ease-in-out infinite" }}
      />

      {/* Sage whisper -- bottom left */}
      <div
        className="absolute -left-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-sage-200/6 blur-[80px]"
        style={{ animation: "aurora-5 24s ease-in-out infinite" }}
      />

      {/* Floating geometric shapes */}
      <div
        className="absolute right-[15%] top-[20%] h-16 w-16 rotate-45 rounded-lg border border-sky-300/20"
        style={{ animation: "aurora-rotate 12s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[10%] bottom-[30%] h-10 w-10 rounded-full border border-peach-300/15"
        style={{ animation: "aurora-pulse 8s ease-in-out infinite" }}
      />
      <div
        className="absolute left-[60%] top-[60%] h-24 w-px bg-gradient-to-b from-transparent via-sky-400/20 to-transparent"
        style={{ animation: "aurora-scaleY 6s ease-in-out infinite" }}
      />
      <div
        className="absolute right-[30%] bottom-[15%] h-px w-24 bg-gradient-to-r from-transparent via-sage-400/25 to-transparent"
        style={{ animation: "aurora-scaleX 7s ease-in-out 2s infinite" }}
      />
    </div>
  );
}
