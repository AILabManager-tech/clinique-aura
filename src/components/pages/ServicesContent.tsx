"use client";

import { useTranslations } from "next-intl";
import { Activity, Bone, Heart, Apple } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

/* ------------------------------------------------------------------ */
/*  Service definitions                                                */
/* ------------------------------------------------------------------ */

interface ServiceDef {
  key: string;
  Icon: LucideIcon;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  inclusions: number;
}

const serviceDefs: ServiceDef[] = [
  {
    key: "physio",
    Icon: Activity,
    accentBg: "bg-sky-50",
    accentText: "text-sky-600",
    accentBorder: "border-sky-200",
    inclusions: 5,
  },
  {
    key: "osteo",
    Icon: Bone,
    accentBg: "bg-sage-50",
    accentText: "text-sage-600",
    accentBorder: "border-sage-200",
    inclusions: 4,
  },
  {
    key: "massage",
    Icon: Heart,
    accentBg: "bg-peach-50",
    accentText: "text-peach-600",
    accentBorder: "border-peach-200",
    inclusions: 4,
  },
  {
    key: "nutrition",
    Icon: Apple,
    accentBg: "bg-sky-100",
    accentText: "text-sky-700",
    accentBorder: "border-sky-300",
    inclusions: 4,
  },
];

/* ------------------------------------------------------------------ */
/*  Service detail block                                               */
/* ------------------------------------------------------------------ */

interface ServiceBlockProps {
  def: ServiceDef;
  index: number;
}

function ServiceBlock({ def, index }: ServiceBlockProps) {
  const t = useTranslations("services");
  const isEven = index % 2 === 0;
  const { key, Icon, accentBg, accentText, accentBorder, inclusions } = def;

  return (
    <section
      className={`section-padding relative overflow-hidden ${!isEven ? "bg-pearl-300/50" : ""}`}
    >
      {!isEven && <div className="absolute inset-0 gradient-mesh-bg" />}
      <div className="container-wide relative">
        <div className="grid items-start gap-12 md:grid-cols-2">
          {/* Text content */}
          <AnimatedSection
            direction={isEven ? "left" : "right"}
            className={isEven ? "" : "md:order-2"}
          >
            {/* Icon + number */}
            <div className="mb-4 flex items-center gap-4">
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${accentBg} ${accentText}`}
              >
                <Icon className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <span
                className={`font-heading text-6xl font-bold ${accentText} opacity-25`}
              >
                {index + 1}
              </span>
            </div>

            <h2 className="mb-3">{t(`${key}.title`)}</h2>
            <p className="mb-6 text-lg text-charcoal-light leading-relaxed">
              {t(`${key}.description`)}
            </p>

            {/* Duration info */}
            <div className="mb-6 flex items-center gap-2 text-sm text-charcoal-light">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{t(`${key}.duration`)}</span>
            </div>

            {/* Inclusions list */}
            <h3 className={`mb-3 text-base font-semibold ${accentText}`}>
              {t(`${key}.includes_title`)}
            </h3>
            <StaggerGrid className="space-y-3" stagger={0.08}>
              {Array.from({ length: inclusions }, (_, i) => (
                <div key={i} className="flex items-start gap-3 group">
                  <span
                    className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-to-br from-sky-400 to-sage-400 transition-transform group-hover:scale-125`}
                  />
                  <span className="text-charcoal-light">
                    {t(`${key}.inclusion_${i + 1}`)}
                  </span>
                </div>
              ))}
            </StaggerGrid>
          </AnimatedSection>

          {/* Visual card */}
          <AnimatedSection
            direction={isEven ? "right" : "left"}
            delay={0.2}
            className={isEven ? "" : "md:order-1"}
          >
            <div className="space-y-6">
              {/* Decorative visual block */}
              <div
                className={`relative rounded-2xl overflow-hidden shadow-lg border ${accentBorder} bg-gradient-to-br from-white to-pearl-300 p-12 flex items-center justify-center min-h-[280px]`}
              >
                <Icon
                  className={`h-32 w-32 ${accentText} opacity-20`}
                  strokeWidth={0.8}
                />
              </div>

              {/* Result card */}
              <div className="card-elevated">
                <LineReveal className="mb-4 w-12" delay={0.4} />
                <p className="font-heading text-lg font-medium text-charcoal">
                  {t(`${key}.result`)}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ServicesContent — Detailed services page for Clinique Aura displaying
 * four alternating service blocks (Physiotherapy, Osteopathy, Massage
 * Therapy, Nutrition) with icons, descriptions, inclusions, duration
 * info, and a FAQ accordion.
 *
 * @component
 * @example
 * ```tsx
 * <ServicesContent />
 * ```
 */
export function ServicesContent() {
  const t = useTranslations("services");

  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`faq.q${i + 1}`),
    answer: t(`faq.a${i + 1}`),
  }));

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero                                                      */}
      {/* ============================================================ */}
      <section className="relative flex items-center overflow-hidden bg-sky-800 section-padding">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-narrow text-center relative z-10">
          <TextReveal className="mb-4 !text-white">{t("hero.title")}</TextReveal>
          <AnimatedSection delay={0.4} direction="none">
            <p className="text-lg text-pearl-300/90 md:text-xl">
              {t("hero.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mt-8 w-24" delay={0.6} />
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Service detail blocks — alternating layout                */}
      {/* ============================================================ */}
      {serviceDefs.map((def, index) => (
        <ServiceBlock key={def.key} def={def} index={index} />
      ))}

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  3. FAQ                                                       */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("faq.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-8 w-24" color="bg-sage-400" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
