import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const HomeContent = dynamic(
  () => import("@/components/pages/HomeContent").then((m) => ({ default: m.HomeContent })),
  { loading: () => <div className="min-h-screen" /> }
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return <HomeContent />;
}
