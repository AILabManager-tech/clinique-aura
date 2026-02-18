"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useAnimations";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/**
 * ParallaxSection - Wraps children in a scroll-driven parallax effect with opacity fade.
 *
 * @component
 * @example
 * ```tsx
 * <ParallaxSection speed={0.3}>
 *   <p>Parallax content</p>
 * </ParallaxSection>
 * ```
 */
export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [yOffset, setYOffset] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (shouldReduceMotion) return;

    function handleScroll() {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate scroll progress: 0 when element enters viewport at bottom, 1 when it exits at top
      const totalTravel = windowHeight + elementHeight;
      const traveled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, traveled / totalTravel));

      // Map progress to Y offset
      const y = (progress - 0.5) * 2 * speed * -100;
      setYOffset(y);

      // Map progress to opacity (fade at edges)
      let op = 1;
      if (progress < 0.2) op = 0.4 + (progress / 0.2) * 0.6;
      else if (progress > 0.8) op = 0.4 + ((1 - progress) / 0.2) * 0.6;
      setOpacity(op);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldReduceMotion, speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      {shouldReduceMotion ? (
        <div>{children}</div>
      ) : (
        <div
          style={{
            transform: `translateY(${yOffset}px)`,
            opacity,
            willChange: "transform, opacity",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
