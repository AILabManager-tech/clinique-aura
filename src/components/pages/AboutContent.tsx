"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Award, Sparkles } from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { PractitionerCards } from "@/components/interactive/PractitionerCards";
import { useReducedMotion, useInView } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Values definition                                                  */
/* ------------------------------------------------------------------ */

interface ValueDef {
  key: string;
  Icon: LucideIcon;
  accentBg: string;
  accentText: string;
}

const valuesDefs: ValueDef[] = [
  {
    key: "wellness",
    Icon: ShieldCheck,
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
  },
  {
    key: "excellence",
    Icon: Award,
    accentBg: "bg-sage-50",
    accentText: "text-sage-600",
  },
  {
    key: "holistic",
    Icon: Sparkles,
    accentBg: "bg-peach-50",
    accentText: "text-peach-600",
  },
];

/* ------------------------------------------------------------------ */
/*  Value card                                                         */
/* ------------------------------------------------------------------ */

interface ValueCardProps {
  def: ValueDef;
  index: number;
  prefersReduced: boolean;
}

function ValueCard({ def, index, prefersReduced }: ValueCardProps) {
  const t = useTranslations("about.values");
  const { key, Icon, accentBg, accentText } = def;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardInView = useInView(cardRef, { once: true });

  return (
    <div
      ref={cardRef}
      className="group"
      style={
        prefersReduced
          ? undefined
          : {
              opacity: cardInView ? 1 : 0,
              transform: cardInView ? "none" : "translateY(30px)",
              transition: `opacity 0.5s ease-in-out ${index * 0.15}s, transform 0.5s ease-in-out ${index * 0.15}s`,
            }
      }
    >
      <div className="card-elevated flex flex-col items-start h-full">
        <div
          className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${accentBg} ${accentText} transition-transform group-hover:scale-110`}
        >
          <Icon className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h3 className={`mb-2 ${accentText} transition-colors group-hover:text-sky-700`}>
          {t(`${key}.title`)}
        </h3>
        <p className="text-charcoal-light leading-relaxed">
          {t(`${key}.description`)}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * AboutContent -- About page for Clinique Aura featuring the clinic
 * story (founded 2009), three core values (Bienveillance, Excellence,
 * Approche globale), a team section with PractitionerCards, and a
 * closing CTA to book an appointment.
 *
 * @component
 * @example
 * ```tsx
 * <AboutContent />
 * ```
 */
export function AboutContent() {
  const t = useTranslations("about");
  const prefersReduced = useReducedMotion();

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero -- sky gradient bg                                    */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-gradient-to-br from-sky-700 via-sky-700 to-sage-500">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />
        <div className="container-narrow text-center relative z-10 section-padding">
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
      {/*  2. Story -- Founded in 2009                                   */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-narrow relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4">
              {t("story.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mb-8 w-16" delay={0.3} />
          <AnimatedSection delay={0.2}>
            <div className="space-y-5 text-lg leading-relaxed text-charcoal-light">
              <p>{t("story.p1")}</p>
              <p>{t("story.p2")}</p>
              <p>{t("story.p3")}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  3. Values -- Bienveillance, Excellence, Approche globale      */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("values.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-sage-400" delay={0.3} />

          <div className="grid gap-6 md:grid-cols-3">
            {valuesDefs.map((def, i) => (
              <ValueCard
                key={def.key}
                def={def}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  4. Team -- PractitionerCards                                  */}
      {/* ============================================================ */}
      <PractitionerCards />

      {/* ============================================================ */}
      {/*  5. CTA -- Join us / book appointment                          */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-sky-800">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-15" />
        <div className="container-narrow relative z-10 text-center section-padding">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 !text-white">
              {t("cta.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <p className="mb-10 text-lg text-pearl-300/90">
              {t("cta.subtitle")}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.5}>
            <MagneticButton
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-peach-400 px-10 py-5 text-lg font-medium text-charcoal transition-all hover:bg-peach-500 hover:shadow-xl hover:shadow-peach-400/25"
              strength={0.4}
            >
              {t("cta.button")}
            </MagneticButton>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}
