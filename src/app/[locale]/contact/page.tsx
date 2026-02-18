import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const ContactContent = dynamic(
  () => import("@/components/pages/ContactContent").then((m) => ({ default: m.ContactContent })),
  { loading: () => <div className="min-h-screen" /> }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}/contact`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr/contact",
        en: "https://clinique-aura.vercel.app/en/contact",
      },
    },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
