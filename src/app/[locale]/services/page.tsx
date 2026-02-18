import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { JsonLd, buildServiceSchema, buildFaqSchema } from "@/components/seo/JsonLd";
import type { Metadata } from "next";

const ServicesContent = dynamic(
  () => import("@/components/pages/ServicesContent").then((m) => ({ default: m.ServicesContent })),
  { loading: () => <div className="min-h-screen" /> }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}/services`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr/services",
        en: "https://clinique-aura.vercel.app/en/services",
      },
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services.faq" });
  const faqItems = Array.from({ length: 6 }, (_, i) => ({
    question: t(`q${i + 1}`),
    answer: t(`a${i + 1}`),
  }));

  return (
    <>
      <JsonLd data={buildServiceSchema(locale)} />
      <JsonLd data={buildFaqSchema(faqItems)} />
      <ServicesContent />
    </>
  );
}
