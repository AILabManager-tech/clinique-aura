"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { TextReveal } from "@/components/animations/TextReveal";
import { LineReveal } from "@/components/animations/LineReveal";

/* ------------------------------------------------------------------ */
/*  Zod schema                                                         */
/* ------------------------------------------------------------------ */

const serviceOptions = [
  "physio",
  "osteo",
  "massage",
  "nutrition",
  "autre",
] as const;

const contactSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caracteres." }),
  email: z.string().email({ message: "Adresse courriel invalide." }),
  phone: z.string().optional(),
  service: z.enum(serviceOptions, { message: "Veuillez choisir un service." }),
  message: z.string().min(10, { message: "Le message doit contenir au moins 10 caracteres." }),
  consent: z.literal(true, { message: "Vous devez accepter la politique de confidentialite." }),
});

/* ------------------------------------------------------------------ */
/*  Form field error display                                           */
/* ------------------------------------------------------------------ */

function FieldError({ errors, field }: { errors: Record<string, string>; field: string }) {
  const msg = errors[field];
  if (!msg) return null;
  return (
    <p className="mt-1 text-xs text-red-500" role="alert">
      {msg}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Main export                                                        */
/* ------------------------------------------------------------------ */

/**
 * ContactContent — Contact page for Clinique Aura with a validated
 * form (Zod), service selection, Loi 25 consent checkbox, and an
 * information sidebar displaying address, phone, email, and hours.
 *
 * @component
 * @example
 * ```tsx
 * <ContactContent />
 * ```
 */
export function ContactContent() {
  const t = useTranslations("contact");
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    const raw: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || undefined,
      service: formData.get("service"),
      message: formData.get("message"),
      consent: formData.get("consent") === "on" ? true : false,
    };

    const result = contactSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        if (key && typeof key === "string" && !fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setSending(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(t("form.success"));
      form.reset();
      setErrors({});
    } catch {
      toast.error(t("form.error"));
    } finally {
      setSending(false);
    }
  }

  /* Shared input classes */
  const inputClass =
    "w-full rounded-xl border border-pearl-400 bg-white/80 px-4 py-3 text-charcoal transition-all focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:bg-white";

  return (
    <main>
      {/* ============================================================ */}
      {/*  1. Hero — AuroraBackground                                  */}
      {/* ============================================================ */}
      <section className="relative flex min-h-[40vh] items-center overflow-hidden bg-sky-800">
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
      {/*  2. Form + sidebar                                            */}
      {/* ============================================================ */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh-bg" />
        <div className="container-wide relative z-10">
          <div className="grid gap-12 md:grid-cols-5">
            {/* --- Form --- */}
            <AnimatedSection direction="left" className="md:col-span-3">
              <form className="card-elevated space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={inputClass}
                    />
                    <FieldError errors={errors} field="email" />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.phone")}{" "}
                      <span className="text-charcoal-light text-xs">
                        ({t("form.optional")})
                      </span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="service"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className={inputClass}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        {t("form.service_placeholder")}
                      </option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {t(`form.services.${opt}`)}
                        </option>
                      ))}
                    </select>
                    <FieldError errors={errors} field="service" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-charcoal"
                  >
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder={t("form.message_placeholder")}
                    className={inputClass}
                  />
                  <FieldError errors={errors} field="message" />
                </div>

                {/* Loi 25 consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-pearl-400 text-sky-500 focus:ring-sky-500/20"
                  />
                  <span className="text-sm text-charcoal-light">
                    {t("form.consent_notice")}{" "}
                    <Link
                      href="/politique-confidentialite"
                      className="text-sky-700 underline underline-offset-2 hover:text-sky-800"
                    >
                      {t("form.privacy_link")}
                    </Link>
                  </span>
                </label>
                <FieldError errors={errors} field="consent" />

                {/* Submit */}
                <Button type="submit" size="lg" variant="primary" disabled={sending}>
                  {sending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      {t("form.sending")}
                    </span>
                  ) : (
                    t("form.submit")
                  )}
                </Button>

                <p className="text-sm text-charcoal-light">{t("form.response_time")}</p>
              </form>
            </AnimatedSection>

            {/* --- Sidebar --- */}
            <AnimatedSection direction="right" delay={0.2} className="md:col-span-2">
              <div className="card-elevated !bg-sky-700 !border-sky-800 text-white">
                <h2 className="mb-6 text-pearl-100 text-xl">{t("info.title")}</h2>
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-sky-100 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-sky-100">
                        {t("info.address_label")}
                      </p>
                      <p className="text-pearl-100">
                        2500, rue King Ouest, bureau 300
                        <br />
                        Sherbrooke QC J1J 2E8
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-sky-100 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-sky-100">
                        {t("info.phone_label")}
                      </p>
                      <a
                        href="tel:+18195550200"
                        className="text-pearl-100 transition-colors hover:text-white"
                      >
                        (819) 555-0200
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-sky-100 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-sky-100">
                        {t("info.email_label")}
                      </p>
                      <a
                        href="mailto:info@clinique-aura.ca"
                        className="text-pearl-100 transition-colors hover:text-white"
                      >
                        info@clinique-aura.ca
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-sky-100 mt-0.5 shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-sky-100">
                        {t("info.hours_label")}
                      </p>
                      <p className="text-pearl-100">{t("info.hours_weekday")}</p>
                      <p className="text-pearl-100">{t("info.hours_weekend")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loi 25 notice */}
              <div className="mt-6 rounded-2xl border border-sky-200/50 bg-sky-50 p-6">
                <h3 className="mb-2 font-heading text-sm font-semibold text-sky-700">
                  {t("loi25.title")}
                </h3>
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {t("loi25.notice")}{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-sky-700 underline underline-offset-2 hover:text-sky-800"
                  >
                    {t("loi25.link")}
                  </Link>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
