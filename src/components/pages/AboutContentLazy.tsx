"use client";

import dynamic from "next/dynamic";

const AboutContent = dynamic(
  () => import("@/components/pages/AboutContent").then((m) => ({ default: m.AboutContent })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

export function AboutContentLazy() {
  return <AboutContent />;
}
