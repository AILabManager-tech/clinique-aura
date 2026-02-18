"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { useReducedMotion } from "@/hooks/useAnimations";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
  onClick?: () => void;
  type?: "button" | "submit";
}

/**
 * MagneticButton - Button or link that follows the cursor with a magnetic pull effect.
 *
 * @component
 * @example
 * ```tsx
 * <MagneticButton href="/contact" strength={0.3}>
 *   Contact us
 * </MagneticButton>
 * ```
 */
export function MagneticButton({
  children,
  className,
  href,
  strength = 0.3,
  onClick,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [glowOpacity, setGlowOpacity] = useState(0);

  function handleMouse(e: MouseEvent) {
    if (shouldReduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * strength;
    const dy = (e.clientY - centerY) * strength;
    setOffset({ x: dx, y: dy });
    const dist = Math.sqrt(dx ** 2 + dy ** 2);
    setGlowOpacity(Math.min(dist / 50, 0.6));
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
    setGlowOpacity(0);
  }

  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, ...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {}) }
    : { type, onClick };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      className="inline-block"
      style={
        shouldReduceMotion
          ? undefined
          : {
              transform: `translate(${offset.x}px, ${offset.y}px)`,
              transition: "transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)",
            }
      }
    >
      <Tag className={`relative overflow-hidden ${className ?? ""}`} {...linkProps}>
        {!shouldReduceMotion && (
          <span
            className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/20"
            style={{
              opacity: glowOpacity,
              transition: "opacity 0.15s ease-out",
            }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Tag>
    </div>
  );
}
