"use client";

import dynamic from "next/dynamic";

const ContactContent = dynamic(
  () => import("@/components/pages/ContactContent").then((m) => ({ default: m.ContactContent })),
  { ssr: false, loading: () => <div className="min-h-screen" /> }
);

export function ContactContentLazy() {
  return <ContactContent />;
}
