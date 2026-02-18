"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Practitioner data                                                  */
/* ------------------------------------------------------------------ */

const PRACTITIONER_KEYS = [
  "sophie_lafleur",
  "marc_andre_tremblay",
  "camille_bergeron",
  "nadia_khoury",
] as const;

type PractitionerKey = (typeof PRACTITIONER_KEYS)[number];

/** Colour accent per discipline */
const ACCENT: Record<PractitionerKey, {
  gradient: string;
  tagBg: string;
  tagText: string;
  ring: string;
}> = {
  sophie_lafleur: {
    gradient: "from-sky-400 to-sky-700",
    tagBg: "bg-sky-100",
    tagText: "text-sky-700",
    ring: "ring-sky-300",
  },
  marc_andre_tremblay: {
    gradient: "from-sage-400 to-sage-600",
    tagBg: "bg-sage-100",
    tagText: "text-sage-700",
    ring: "ring-sage-300",
  },
  camille_bergeron: {
    gradient: "from-peach-400 to-peach-600",
    tagBg: "bg-peach-100",
    tagText: "text-peach-700",
    ring: "ring-peach-300",
  },
  nadia_khoury: {
    gradient: "from-pearl-400 to-pearl-600",
    tagBg: "bg-pearl-300",
    tagText: "text-pearl-800",
    ring: "ring-pearl-400",
  },
};

/** Number of specialty tags per practitioner (convention: 3 each) */
const SPECIALTY_INDICES = [0, 1, 2] as const;

/* ------------------------------------------------------------------ */
/*  Single card                                                       */
/* ------------------------------------------------------------------ */

interface CardProps {
  practitionerKey: PractitionerKey;
  index: number;
  prefersReduced: boolean;
}

function PractitionerCard({ practitionerKey, index, prefersReduced }: CardProps) {
  const t = useTranslations("home.practitioners");
  const accent = ACCENT[practitionerKey];

  /** Extract initials from translated name */
  const fullName: string = t(`${practitionerKey}.name`);
  const initials = fullName
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <motion.article
      initial={
        prefersReduced ? {} : { opacity: 0, y: 30 }
      }
      whileInView={
        prefersReduced ? {} : { opacity: 1, y: 0 }
      }
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: prefersReduced ? 0 : index * 0.1,
        ease: "easeInOut" as const,
      }}
      whileHover={prefersReduced ? {} : { y: -6 }}
      className="group flex flex-col rounded-2xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      {/* Avatar circle with gradient + initials */}
      <div className="mb-5 flex justify-center">
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${accent.gradient} ring-4 ${accent.ring} ring-offset-2 transition-transform duration-300 group-hover:scale-105`}
        >
          <span className="font-heading text-xl font-bold text-white">
            {initials}
          </span>
        </div>
      </div>

      {/* Name & title */}
      <h3 className="text-center font-heading text-lg font-bold text-charcoal">
        {fullName}
      </h3>
      <p className="mb-4 text-center text-sm text-charcoal-light">
        {t(`${practitionerKey}.title`)}
      </p>

      {/* Specialty tags */}
      <div className="mb-4 flex flex-wrap justify-center gap-2">
        {SPECIALTY_INDICES.map((i) => (
          <span
            key={i}
            className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${accent.tagBg} ${accent.tagText}`}
          >
            {t(`${practitionerKey}.specialties.${i}`)}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="mb-6 flex-1 text-center text-sm leading-relaxed text-charcoal-light">
        {t(`${practitionerKey}.bio`)}
      </p>

      {/* Booking button */}
      <Link
        href="/contact"
        className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-current px-5 py-2.5 text-sm font-semibold transition-colors duration-200 ${accent.tagText} hover:bg-sky-50`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
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
        {t(`${practitionerKey}.cta`)}
      </Link>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * PractitionerCards — Responsive grid presenting the clinic team.
 *
 * Each card features a gradient avatar with initials, specialty tags
 * colour-coded by discipline, a short bio and a booking CTA.
 * Stagger animation on scroll, with `prefers-reduced-motion` support.
 *
 * @component
 * @example
 * ```tsx
 * <PractitionerCards />
 * ```
 */
export function PractitionerCards() {
  const t = useTranslations("home.practitioners");
  const prefersReduced = useReducedMotion() ?? false;

  return (
    <section id="team" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeInOut" as const }}
          className="mb-12 text-center"
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-charcoal lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl font-body text-charcoal-light">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PRACTITIONER_KEYS.map((key, i) => (
            <PractitionerCard
              key={key}
              practitionerKey={key}
              index={i}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
