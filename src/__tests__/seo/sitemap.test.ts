import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";

describe("sitemap", () => {
  const entries = sitemap();

  it("returns an array of sitemap entries", () => {
    expect(Array.isArray(entries)).toBe(true);
    expect(entries.length).toBeGreaterThan(0);
  });

  it("includes both FR and EN locales for each route", () => {
    const frUrls = entries.filter((e) => e.url.includes("/fr"));
    const enUrls = entries.filter((e) => e.url.includes("/en"));
    expect(frUrls.length).toBe(enUrls.length);
  });

  it("has alternates for each entry", () => {
    for (const entry of entries) {
      expect(entry.alternates).toBeDefined();
      expect(entry.alternates!.languages).toBeDefined();
    }
  });

  it("homepage has priority 1", () => {
    const homeFr = entries.find(
      (e) => e.url === "https://clinique-aura.vercel.app/fr"
    );
    expect(homeFr).toBeDefined();
    expect(homeFr!.priority).toBe(1);
  });

  it("includes legal pages", () => {
    const privacy = entries.find((e) =>
      e.url.includes("/politique-confidentialite")
    );
    const legal = entries.find((e) => e.url.includes("/mentions-legales"));
    expect(privacy).toBeDefined();
    expect(legal).toBeDefined();
  });

  it("includes all main routes", () => {
    const urls = entries.map((e) => e.url);
    expect(urls.some((u) => u.includes("/services"))).toBe(true);
    expect(urls.some((u) => u.includes("/a-propos"))).toBe(true);
    expect(urls.some((u) => u.includes("/contact"))).toBe(true);
  });
});
