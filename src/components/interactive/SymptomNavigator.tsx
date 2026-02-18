"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useReducedMotion, useInView } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Zone definitions -- each maps to a clickable SVG region            */
/* ------------------------------------------------------------------ */

const ZONE_KEYS = [
  "head",
  "neck",
  "shoulders",
  "back",
  "arms",
  "hands",
  "hips",
  "legs",
  "feet",
] as const;

type ZoneKey = (typeof ZONE_KEYS)[number];

/** Colour accent per recommended treatment discipline */
const DISCIPLINE_COLOR: Record<string, string> = {
  physio: "bg-sky-100 text-sky-700",
  osteo: "bg-sage-100 text-sage-700",
  massage: "bg-peach-100 text-peach-700",
  nutrition: "bg-pearl-400 text-pearl-800",
};

/* ------------------------------------------------------------------ */
/*  SVG Body Map                                                      */
/* ------------------------------------------------------------------ */

interface BodyZoneProps {
  zone: ZoneKey;
  selected: ZoneKey | null;
  onSelect: (z: ZoneKey) => void;
  label: string;
}

function BodyZone({ zone, selected, onSelect, label }: BodyZoneProps) {
  const isSelected = selected === zone;

  /** SVG path data for each zone (simplified front-facing body outline) */
  const paths: Record<ZoneKey, string> = {
    head: "M90,28 C90,14 105,2 120,2 C135,2 150,14 150,28 C150,48 135,56 120,56 C105,56 90,48 90,28Z",
    neck: "M110,56 L130,56 L132,72 L108,72Z",
    shoulders:
      "M60,72 L108,72 L110,95 L60,95Z M132,72 L180,72 L180,95 L130,95Z",
    back: "M80,95 L160,95 L158,170 L82,170Z",
    arms: "M40,80 L60,80 L58,160 L38,160Z M180,80 L200,80 L202,160 L182,160Z",
    hands:
      "M32,160 L62,160 L64,185 L30,185Z M178,160 L208,160 L210,185 L176,185Z",
    hips: "M78,170 L162,170 L165,210 L75,210Z",
    legs: "M78,210 L115,210 L112,310 L82,310Z M125,210 L162,210 L158,310 L128,310Z",
    feet: "M72,310 L116,310 L118,335 L68,335Z M124,310 L168,310 L172,335 L122,335Z",
  };

  return (
    <path
      d={paths[zone]}
      className={`cursor-pointer transition-colors duration-200 ${
        isSelected
          ? "fill-sky-400 stroke-sky-700"
          : "fill-pearl-300 stroke-pearl-500 hover:fill-sky-200"
      }`}
      strokeWidth={1.5}
      onClick={() => onSelect(zone)}
      role="button"
      tabIndex={0}
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(zone);
        }
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Detail panel (slides in from right / bottom)                      */
/* ------------------------------------------------------------------ */

interface DetailPanelProps {
  zone: ZoneKey;
  onClose: () => void;
  prefersReduced: boolean;
}

function DetailPanel({ zone, onClose, prefersReduced }: DetailPanelProps) {
  const t = useTranslations("home.symptom_navigator");

  /** The number of symptoms and treatments is convention-based (3 each) */
  const symptomKeys = [0, 1, 2] as const;
  const treatmentKeys = [0, 1] as const;

  return (
    <aside
      className="flex h-full flex-col overflow-y-auto rounded-2xl bg-white p-6 shadow-xl lg:p-8"
      role="region"
      aria-label={t(`zones.${zone}.name`)}
      style={
        prefersReduced
          ? undefined
          : {
              animation: "fadeIn 0.35s ease-in-out both",
            }
      }
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="mb-4 self-end rounded-full p-2 text-charcoal transition-colors hover:bg-pearl-300"
        aria-label={t("close")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Zone name */}
      <h3 className="mb-1 font-heading text-2xl font-bold text-charcoal">
        {t(`zones.${zone}.name`)}
      </h3>
      <div className="mb-6 h-1 w-12 rounded-full bg-sky-400" />

      {/* Symptoms */}
      <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-sky-700">
        {t("symptoms_title")}
      </h4>
      <ul className="mb-6 space-y-2">
        {symptomKeys.map((i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-light"
          >
            <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-400" />
            {t(`zones.${zone}.symptoms.${i}`)}
          </li>
        ))}
      </ul>

      {/* Recommended treatments */}
      <h4 className="mb-3 font-heading text-sm font-semibold uppercase tracking-wider text-sage-600">
        {t("treatments_title")}
      </h4>
      <div className="mb-8 flex flex-wrap gap-2">
        {treatmentKeys.map((i) => {
          const discipline = t(`zones.${zone}.treatments.${i}.type`);
          const colorClass =
            DISCIPLINE_COLOR[discipline] ?? "bg-pearl-300 text-charcoal";
          return (
            <span
              key={i}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colorClass}`}
            >
              {t(`zones.${zone}.treatments.${i}.label`)}
            </span>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-auto">
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-700 px-6 py-3 font-heading text-sm font-semibold text-white shadow-md transition-colors hover:bg-sky-800"
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
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                       */
/* ------------------------------------------------------------------ */

/**
 * SymptomNavigator -- Interactive body map with clickable anatomical zones.
 *
 * Clicking a zone reveals a sliding detail panel showing common symptoms,
 * recommended treatments and a CTA to book an appointment.
 *
 * @component
 * @example
 * ```tsx
 * <SymptomNavigator />
 * ```
 */
export function SymptomNavigator() {
  const t = useTranslations("home.symptom_navigator");
  const prefersReduced = useReducedMotion();
  const [selectedZone, setSelectedZone] = useState<ZoneKey | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const bodyMapRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true });
  const bodyMapInView = useInView(bodyMapRef, { once: true });

  function handleSelect(zone: ZoneKey) {
    setSelectedZone((prev) => (prev === zone ? null : zone));
  }

  return (
    <section id="symptom-navigator" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className="mb-12 text-center"
          style={
            prefersReduced
              ? undefined
              : {
                  opacity: headerInView ? 1 : 0,
                  transform: headerInView ? "none" : "translateY(24px)",
                  transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }
          }
        >
          <h2 className="mb-3 font-heading text-3xl font-bold text-charcoal lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto max-w-xl font-body text-charcoal-light">
            {t("subtitle")}
          </p>
        </div>

        {/* Body map + panel grid */}
        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* SVG body map */}
          <div
            ref={bodyMapRef}
            className="relative mx-auto w-full max-w-xs lg:max-w-sm"
            style={
              prefersReduced
                ? undefined
                : {
                    opacity: bodyMapInView ? 1 : 0,
                    transform: bodyMapInView ? "none" : "scale(0.96)",
                    transition: "opacity 0.5s ease-in-out 0.15s, transform 0.5s ease-in-out 0.15s",
                  }
            }
          >
            <svg
              viewBox="0 0 240 340"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              aria-label={t("body_map_label")}
              role="img"
            >
              {/* Background silhouette outline */}
              <rect
                x="0"
                y="0"
                width="240"
                height="340"
                fill="none"
              />

              {/* Render each zone */}
              {ZONE_KEYS.map((zone) => (
                <BodyZone
                  key={zone}
                  zone={zone}
                  selected={selectedZone}
                  onSelect={handleSelect}
                  label={t(`zones.${zone}.name`)}
                />
              ))}
            </svg>

            {/* Zone labels overlay (mobile helper) */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 lg:hidden">
              {ZONE_KEYS.map((zone) => (
                <button
                  key={zone}
                  onClick={() => handleSelect(zone)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedZone === zone
                      ? "bg-sky-500 text-white"
                      : "bg-pearl-300 text-charcoal hover:bg-sky-100"
                  }`}
                >
                  {t(`zones.${zone}.name`)}
                </button>
              ))}
            </div>
          </div>

          {/* Detail panel area */}
          <div className="min-h-[420px]">
            {selectedZone ? (
              <DetailPanel
                key={selectedZone}
                zone={selectedZone}
                onClose={() => setSelectedZone(null)}
                prefersReduced={prefersReduced}
              />
            ) : (
              <div
                className="flex h-full min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-pearl-400 p-8 text-center"
                style={
                  prefersReduced
                    ? undefined
                    : {
                        animation: "fadeInScale 0.25s ease-in-out both",
                      }
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-4 text-pearl-500"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <p className="font-heading text-lg font-semibold text-charcoal">
                  {t("placeholder_title")}
                </p>
                <p className="mt-1 text-sm text-charcoal-light">
                  {t("placeholder_subtitle")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
