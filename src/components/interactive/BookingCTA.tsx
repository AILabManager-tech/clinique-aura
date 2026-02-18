"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Decorative floating shapes                                         */
/* ------------------------------------------------------------------ */

interface FloatingElementProps {
  className: string;
  delay: number;
  prefersReduced: boolean;
}

function FloatingElement({ className, delay, prefersReduced }: FloatingElementProps) {
  return (
    <motion.div
      aria-hidden="true"
      initial={prefersReduced ? {} : { y: 0, opacity: 0.15 }}
      animate={
        prefersReduced
          ? { opacity: 0.12 }
          : {
              y: [0, -18, 0],
              opacity: [0.12, 0.22, 0.12],
            }
      }
      transition={
        prefersReduced
          ? { duration: 0 }
          : {
              duration: 6,
              delay,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }
      }
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * BookingCTA — Prominent call-to-action section for booking appointments.
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
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section
      id="booking"
      className="relative isolate overflow-hidden bg-gradient-to-br from-sky-600 to-sage-600 py-20 lg:py-28"
    >
      {/* Decorative floating shapes */}
      <FloatingElement
        className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/10"
        delay={0}
        prefersReduced={prefersReduced}
      />
      <FloatingElement
        className="absolute -right-6 bottom-16 h-28 w-28 rounded-full bg-white/10"
        delay={1.5}
        prefersReduced={prefersReduced}
      />
      <FloatingElement
        className="absolute left-1/3 -top-8 h-20 w-20 rotate-45 rounded-2xl bg-white/[0.07]"
        delay={0.8}
        prefersReduced={prefersReduced}
      />
      <FloatingElement
        className="absolute right-1/4 bottom-6 h-16 w-16 rounded-full bg-white/[0.08]"
        delay={2.2}
        prefersReduced={prefersReduced}
      />
      <FloatingElement
        className="absolute left-2/3 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-white/[0.06]"
        delay={3}
        prefersReduced={prefersReduced}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
        >
          <h2 className="mb-4 font-heading text-3xl font-bold text-white lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mb-8 max-w-lg font-body text-lg leading-relaxed text-white/85">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Phone + CTA */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: prefersReduced ? 0 : 0.2,
            ease: "easeInOut" as const,
          }}
          className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center"
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
        </motion.div>
      </div>
    </section>
  );
}
