"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  staggerChildren?: number;
}

/**
 * TextReveal - Splits text into words and animates each word in with a staggered effect.
 *
 * @component
 * @example
 * ```tsx
 * <TextReveal as="h2" delay={0.1}>
 *   Your headline text here
 * </TextReveal>
 * ```
 */
export function TextReveal({
  children,
  className,
  as: Tag = "h1",
  delay = 0,
  staggerChildren = 0.035,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = children.split(" ");

  if (shouldReduceMotion) {
    return (
      <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className}>
        {children}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden" aria-hidden="true">
          <span
            className="inline-block"
            style={{
              transform: isInView ? "translateY(0)" : "translateY(100%)",
              opacity: isInView ? 1 : 0,
              transition: `transform 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${delay + i * staggerChildren}s, opacity 0.5s cubic-bezier(0.33, 1, 0.68, 1) ${delay + i * staggerChildren}s`,
            }}
          >
            {word}
          </span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  );
}
