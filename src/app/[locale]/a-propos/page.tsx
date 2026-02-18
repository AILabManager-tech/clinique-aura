import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const AboutContent = dynamic(
  () => import("@/components/pages/AboutContent").then((m) => ({ default: m.AboutContent })),
  { loading: () => <div className="min-h-screen" /> }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}/a-propos`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr/a-propos",
        en: "https://clinique-aura.vercel.app/en/a-propos",
      },
    },
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
