"use client";

import dynamic from "next/dynamic";

const HomeContent = dynamic(
  () => import("@/components/pages/HomeContent").then((m) => ({ default: m.HomeContent })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

export function HomeContentLazy() {
  return <HomeContent />;
}
