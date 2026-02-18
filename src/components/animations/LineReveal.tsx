"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

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
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        className={`h-[3px] ${color} rounded-full`}
        initial={shouldReduceMotion ? false : { scaleX: 0, originX: 0 }}
        animate={shouldReduceMotion ? { scaleX: 1 } : isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : {
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      />
    </div>
  );
}
