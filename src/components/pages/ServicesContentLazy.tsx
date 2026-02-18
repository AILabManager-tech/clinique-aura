"use client";

import dynamic from "next/dynamic";

const ServicesContent = dynamic(
  () => import("@/components/pages/ServicesContent").then((m) => ({ default: m.ServicesContent })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

export function ServicesContentLazy() {
  return <ServicesContent />;
}
