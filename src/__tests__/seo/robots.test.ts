import { describe, it, expect } from "vitest";
import robots from "@/app/robots";

describe("robots", () => {
  const config = robots();

  it("allows all user agents", () => {
    expect(config.rules).toBeDefined();
    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules!.userAgent).toBe("*");
  });

  it("allows root path", () => {
    const rules = Array.isArray(config.rules) ? config.rules[0] : config.rules;
    expect(rules!.allow).toBe("/");
  });

  it("includes sitemap URL", () => {
    expect(config.sitemap).toBe("https://clinique-aura.vercel.app/sitemap.xml");
  });
});
