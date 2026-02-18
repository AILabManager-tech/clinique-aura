import type { MetadataRoute } from "next";

const BASE_URL = "https://clinique-aura.vercel.app";

const routes = ["", "/services", "/a-propos", "/contact", "/politique-confidentialite", "/mentions-legales"];
const locales = ["fr", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.8,
        alternates: {
          languages: {
            fr: `${BASE_URL}/fr${route}`,
            en: `${BASE_URL}/en${route}`,
          },
        },
      });
    }
  }

  return entries;
}
