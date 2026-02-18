"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

const directions = {
  up: "translateY(30px)",
  left: "translateX(-30px)",
  right: "translateX(30px)",
  none: "none",
};

/**
 * AnimatedSection - Fades and slides children into view on scroll with configurable direction.
 *
 * @component
 * @example
 * ```tsx
 * <AnimatedSection direction="up" delay={0.2}>
 *   <p>Animated content</p>
 * </AnimatedSection>
 * ```
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offset = directions[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "none" : offset,
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
