import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Outfit, Nunito } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ClientWidgets } from "@/components/layout/ClientWidgets";
import { JsonLd, localBusinessSchema } from "@/components/seo/JsonLd";
import type { Metadata, Viewport } from "next";
import "../globals.css";

export async function generateViewport(): Promise<Viewport> {
  return {
    themeColor: "#5BA4C9",
  };
}

// NEXOS: Typographie sereine et lumineuse — Clinique Aura
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL("https://clinique-aura.vercel.app"),
    title: {
      default: t("title"),
      template: "%s | Clinique Aura",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      siteName: "Clinique Aura",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr",
        en: "https://clinique-aura.vercel.app/en",
      },
    },
    icons: { icon: "/favicon.ico" },
  };
}

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${outfit.variable} ${nunito.variable}`}>
      <head />

      <body className="font-body bg-pearl-200 text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-sky-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <JsonLd data={localBusinessSchema} />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <div id="main-content" className="min-h-screen">{children}</div>
          <Footer />
          <ClientWidgets />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
