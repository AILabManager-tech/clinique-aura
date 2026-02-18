"use client";

import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
}

/**
 * StaggerGrid - Renders children in a grid with staggered reveal animations on scroll.
 *
 * @component
 * @example
 * ```tsx
 * <StaggerGrid stagger={0.12} className="grid grid-cols-3 gap-4">
 *   {items.map(item => <Card key={item.id} />)}
 * </StaggerGrid>
 * ```
 */
export function StaggerGrid({
  children,
  className,
  stagger = 0.12,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children.map((child, i) => (
          <div key={i}>{child}</div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? "translateY(0) scale(1)" : "translateY(40px) scale(0.92)",
            filter: isInView ? "blur(0px)" : "blur(8px)",
            transition: `all 0.5s ease-out ${i * stagger}s`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
