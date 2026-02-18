"use client";

import { useRef } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Activity, Bone, Heart, Apple } from "lucide-react";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";
import { CountUp } from "@/components/animations/CountUp";
import { FloatingElement } from "@/components/animations/FloatingElement";
import { MagneticButton } from "@/components/animations/MagneticButton";
import { StaggerGrid } from "@/components/animations/StaggerGrid";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SymptomNavigator } from "@/components/interactive/SymptomNavigator";
import { PractitionerCards } from "@/components/interactive/PractitionerCards";
import { BookingCTA } from "@/components/interactive/BookingCTA";
import { useReducedMotion, useInView } from "@/hooks/useAnimations";

/* ------------------------------------------------------------------ */
/*  Service card data                                                  */
/* ------------------------------------------------------------------ */

const services = [
  { key: "physio", Icon: Activity, accent: "sky" },
  { key: "osteo", Icon: Bone, accent: "sage" },
  { key: "massage", Icon: Heart, accent: "peach" },
  { key: "nutrition", Icon: Apple, accent: "sky-700" },
] as const;

const accentMap: Record<string, { bg: string; text: string; border: string }> = {
  sky: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200/50" },
  sage: { bg: "bg-sage-50", text: "text-sage-600", border: "border-sage-200/50" },
  peach: { bg: "bg-peach-50", text: "text-peach-600", border: "border-peach-200/50" },
  "sky-700": { bg: "bg-sky-100", text: "text-sky-700", border: "border-sky-300/50" },
};

/* ------------------------------------------------------------------ */
/*  Testimonial card                                                   */
/* ------------------------------------------------------------------ */

interface TestimonialCardProps {
  index: number;
  prefersReduced: boolean;
}

function TestimonialCard({ index, prefersReduced }: TestimonialCardProps) {
  const t = useTranslations("home.testimonials");
  const cardRef = useRef<HTMLQuoteElement>(null);
  const cardInView = useInView(cardRef, { once: true });

  return (
    <blockquote
      ref={cardRef}
      className="card-elevated flex flex-col"
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
      {/* Stars */}
      <div className="mb-4 flex gap-1 text-peach-400" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="mb-6 flex-1 text-charcoal-light leading-relaxed italic">
        &ldquo;{t(`${index}.quote`)}&rdquo;
      </p>

      <footer className="flex items-center gap-3 border-t border-pearl-300 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 font-heading text-sm font-bold text-sky-700">
          {t(`${index}.name`).charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-charcoal">{t(`${index}.name`)}</p>
          <p className="text-xs text-charcoal-light">{t(`${index}.role`)}</p>
        </div>
      </footer>
    </blockquote>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * HomeContent -- Landing page for Clinique Aura featuring a serene
 * health-focused hero, service overview cards, interactive body map,
 * team preview, patient testimonials, and a final booking CTA.
 *
 * @component
 * @example
 * ```tsx
 * <HomeContent />
 * ```
 */
export function HomeContent() {
  const t = useTranslations("home");
  const prefersReduced = useReducedMotion();

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero -- Serene health-focused with AuroraBackground       */}
      {/* ============================================================ */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-sky-800">
        <AuroraBackground />
        <div className="absolute inset-0 grid-overlay opacity-20" />

        <div className="container-wide relative z-10 section-padding">
          <div className="max-w-2xl">
            <AnimatedSection delay={0.1} direction="none">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-sage-400 animate-glow-pulse" />
                <span className="text-sm font-medium text-pearl-300">
                  {t("hero.badge")}
                </span>
              </div>
            </AnimatedSection>

            <TextReveal className="mb-6 !text-white" delay={0.2}>
              {t("hero.title")}
            </TextReveal>

            <AnimatedSection delay={0.6} direction="none">
              <p className="mb-10 text-lg text-pearl-300/90 md:text-xl leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.9} direction="none">
              <div className="flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-peach-400 px-8 py-4 text-lg font-medium text-charcoal transition-all hover:bg-peach-500 hover:shadow-xl hover:shadow-peach-400/25"
                  strength={0.35}
                >
                  {t("hero.cta")}
                </MagneticButton>
                <MagneticButton
                  href="#services"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/50"
                  strength={0.25}
                >
                  {t("hero.cta_secondary")}
                </MagneticButton>
              </div>
            </AnimatedSection>
          </div>

          {/* Floating elements -- right side */}
          <div className="pointer-events-none absolute right-0 top-1/4 hidden lg:block">
            <FloatingElement amplitude={15} duration={7}>
              <div className="h-20 w-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md" />
            </FloatingElement>
            <FloatingElement amplitude={10} duration={5} delay={1} className="ml-24 mt-8">
              <div className="h-12 w-12 rounded-xl border border-peach-400/20 bg-peach-400/10 backdrop-blur-sm" />
            </FloatingElement>
            <FloatingElement amplitude={18} duration={8} delay={2} className="-ml-8 mt-6">
              <div className="h-16 w-16 rounded-full border border-sage-400/15 bg-sage-400/10 backdrop-blur-sm" />
            </FloatingElement>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pearl-200 to-transparent" />
      </section>

      {/* Stats -- glassmorphism bar */}
      <section className="relative -mt-16 z-20">
        <div className="container-wide px-6">
          <div className="glass rounded-2xl p-8 glow-sky">
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="font-heading text-3xl font-bold text-sky-700 md:text-4xl">
                  <CountUp to={15} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-charcoal-light">{t("stats.experience")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-sage-500 md:text-4xl">
                  <CountUp to={4} />
                </p>
                <p className="mt-1 text-sm text-charcoal-light">{t("stats.disciplines")}</p>
              </div>
              <div>
                <p className="font-heading text-3xl font-bold text-peach-500 md:text-4xl">
                  <CountUp to={10000} suffix="+" />
                </p>
                <p className="mt-1 text-sm text-charcoal-light">{t("stats.patients")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  2. Services overview -- 4 discipline cards                    */}
      {/* ============================================================ */}
      <section id="services" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("services.title")}
            </TextReveal>
          </AnimatedSection>
          <AnimatedSection delay={0.2} direction="none">
            <p className="mx-auto mb-4 max-w-xl text-center text-lg text-charcoal-light">
              {t("services.subtitle")}
            </p>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" delay={0.3} />

          <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12}>
            {services.map(({ key, Icon, accent }) => {
              const colors = accentMap[accent] ?? { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200/50" };
              return (
                <Link
                  key={key}
                  href="/services"
                  className="group card-elevated flex flex-col items-start"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${colors.bg} ${colors.text} transition-colors group-hover:bg-sky-100 group-hover:text-sky-700`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className={`mb-2 text-lg ${colors.text} transition-colors group-hover:text-sky-700`}>
                    {t(`services.${key}.title`)}
                  </h3>
                  <p className="text-sm text-charcoal-light leading-relaxed">
                    {t(`services.${key}.description`)}
                  </p>
                </Link>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  3. SymptomNavigator -- Interactive body map                   */}
      {/* ============================================================ */}
      <SymptomNavigator />

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  4. PractitionerCards -- Team preview                          */}
      {/* ============================================================ */}
      <PractitionerCards />

      <div className="section-divider" />

      {/* ============================================================ */}
      {/*  5. Testimonials -- 3 patient testimonials                     */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <AnimatedSection>
            <TextReveal as="h2" className="mb-4 text-center">
              {t("testimonials.title")}
            </TextReveal>
          </AnimatedSection>
          <LineReveal className="mx-auto mb-12 w-24" color="bg-peach-400" delay={0.3} />

          <div className="grid gap-6 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <TestimonialCard
                key={i}
                index={i}
                prefersReduced={prefersReduced}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/*  6. BookingCTA -- Final CTA                                   */}
      {/* ============================================================ */}
      <BookingCTA />
    </main>
  );
}
