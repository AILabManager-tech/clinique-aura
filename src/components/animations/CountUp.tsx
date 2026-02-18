"use client";

import { useRef, useEffect, useState } from "react";
import { useInView, useReducedMotion } from "@/hooks/useAnimations";

interface CountUpProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Ease-out cubic: decelerates towards the end */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * CountUp - Animates a number counting up when scrolled into view.
 *
 * @component
 * @example
 * ```tsx
 * <CountUp to={100} suffix="%" duration={2} />
 * ```
 */
export function CountUp({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayValue(to);
      return;
    }

    const durationMs = duration * 1000;
    let startTime: number | null = null;
    let rafId: number;

    function tick(timestamp: number) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(from + (to - from) * easedProgress);

      setDisplayValue(current);

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, shouldReduceMotion, from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <span>{displayValue}</span>
      {suffix}
    </span>
  );
}
