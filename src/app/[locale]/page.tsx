import { getTranslations } from "next-intl/server";
import { HomeContentLazy } from "@/components/pages/HomeContentLazy";
import type { Metadata } from "next";

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
  return <HomeContentLazy />;
}
