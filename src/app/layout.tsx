// Root layout redirects to [locale] layout
// This file is required by Next.js but all rendering happens in [locale]/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
