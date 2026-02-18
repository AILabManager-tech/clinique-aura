// Root layout redirects to [locale] layout
// This file is required by Next.js but all rendering happens in [locale]/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  description:
    "Clinique Aura : physiothérapie, ostéopathie, massothérapie et nutrition à Sherbrooke. Une approche globale pour votre bien-être.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
