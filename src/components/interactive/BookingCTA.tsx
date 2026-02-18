"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useReducedMotion, useInView } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Decorative floating shapes                                         */
/* ------------------------------------------------------------------ */

interface FloatingShapeProps {
  className: string;
  delay: number;
  prefersReduced: boolean;
}

function FloatingShape({ className, delay, prefersReduced }: FloatingShapeProps) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={
        prefersReduced
          ? { opacity: 0.12 }
          : {
              animation: `float 6s ease-in-out ${delay}s infinite`,
              opacity: 0.12,
              ["--float-y" as string]: "18px",
            }
      }
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * BookingCTA -- Prominent call-to-action section for booking appointments.
 *
 * Features a sky-to-sage gradient background, organic floating decorative
 * shapes, a heading with subtext, a click-to-call phone link and a
 * navigational button to the contact page.
 *
 * @component
 * @example
 * ```tsx
 * <BookingCTA />
 * ```
 */
export function BookingCTA() {
  const t = useTranslations("home.booking");
  const prefersReduced = useReducedMotion();
  const headingRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  return (
    <section
      id="booking"
      className="relative isolate overflow-hidden bg-gradient-to-br from-sky-700 to-sage-600 py-20 lg:py-28"
    >
      {/* Decorative floating shapes */}
      <FloatingShape
        className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/10"
        delay={0}
        prefersReduced={prefersReduced}
      />
      <FloatingShape
        className="absolute -right-6 bottom-16 h-28 w-28 rounded-full bg-white/10"
        delay={1.5}
        prefersReduced={prefersReduced}
      />
      <FloatingShape
        className="absolute left-1/3 -top-8 h-20 w-20 rotate-45 rounded-2xl bg-white/[0.07]"
        delay={0.8}
        prefersReduced={prefersReduced}
      />
      <FloatingShape
        className="absolute right-1/4 bottom-6 h-16 w-16 rounded-full bg-white/[0.08]"
        delay={2.2}
        prefersReduced={prefersReduced}
      />
      <FloatingShape
        className="absolute left-2/3 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/[0.06]"
        delay={3}
        prefersReduced={prefersReduced}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          style={
            prefersReduced
              ? undefined
              : {
                  opacity: headingInView ? 1 : 0,
                  transform: headingInView ? "none" : "translateY(20px)",
                  transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }
          }
        >
          <h2 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-body text-lg leading-relaxed text-white/85">
            {t("subtitle")}
          </p>
        </div>

        {/* Phone + CTA */}
        <div
          ref={ctaRef}
          className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
          style={
            prefersReduced
              ? undefined
              : {
                  opacity: ctaInView ? 1 : 0,
                  transform: ctaInView ? "none" : "translateY(16px)",
                  transition: "opacity 0.45s ease-in-out 0.2s, transform 0.45s ease-in-out 0.2s",
                }
          }
        >
          {/* Click-to-call */}
          <a
            href={`tel:${t("phone_raw")}`}
            className="group inline-flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 font-heading text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:scale-110"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t("phone_display")}
          </a>

          {/* Contact page CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 font-heading text-sm font-bold text-sky-700 shadow-lg transition-all duration-200 hover:bg-pearl-100 hover:shadow-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
