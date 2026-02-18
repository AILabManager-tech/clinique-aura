"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface LineRevealProps {
  className?: string;
  color?: string;
  delay?: number;
}

/**
 * LineReveal - Animated horizontal line that scales in when scrolled into view.
 *
 * @component
 * @example
 * ```tsx
 * <LineReveal color="bg-sky-400" delay={0.2} />
 * ```
 */
export function LineReveal({
  className,
  color = "bg-sky-400",
  delay = 0,
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <div
        className={`h-[3px] ${color} rounded-full`}
        style={
          shouldReduceMotion
            ? { transform: "scaleX(1)", transformOrigin: "left" }
            : {
                transform: isInView ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: `transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
              }
        }
      />
    </div>
  );
}
