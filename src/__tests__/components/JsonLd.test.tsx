import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  JsonLd,
  localBusinessSchema,
  buildServiceSchema,
  buildFaqSchema,
} from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  it("renders a script tag with correct type", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).not.toBeNull();
  });

  it("renders valid JSON content", () => {
    const { container } = render(<JsonLd data={localBusinessSchema} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const parsed = JSON.parse(script!.textContent!);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("MedicalBusiness");
    expect(parsed.name).toBe("Clinique Aura");
  });
});

describe("localBusinessSchema", () => {
  it("has required MedicalBusiness fields", () => {
    expect(localBusinessSchema["@type"]).toBe("MedicalBusiness");
    expect(localBusinessSchema.name).toBe("Clinique Aura");
    expect(localBusinessSchema.address).toBeDefined();
    expect(localBusinessSchema.serviceType).toHaveLength(4);
    expect(localBusinessSchema.knowsLanguage).toContain("fr");
    expect(localBusinessSchema.knowsLanguage).toContain("en");
  });

  it("has Sherbrooke address", () => {
    expect(localBusinessSchema.address.addressLocality).toBe("Sherbrooke");
    expect(localBusinessSchema.address.addressRegion).toBe("QC");
    expect(localBusinessSchema.address.postalCode).toBe("J1J 2E8");
  });

  it("has correct URL", () => {
    expect(localBusinessSchema.url).toBe("https://clinique-aura.vercel.app");
  });

  it("has correct phone and email", () => {
    expect(localBusinessSchema.telephone).toBe("(819) 555-0200");
    expect(localBusinessSchema.email).toBe("info@clinique-aura.ca");
  });
});

describe("buildServiceSchema", () => {
  it("builds French service schema", () => {
    const schema = buildServiceSchema("fr");
    expect(schema["@type"]).toBe("Service");
    expect(schema.serviceType).toBe("Soins multidisciplinaires");
    expect(schema.hasOfferCatalog.itemListElement).toHaveLength(4);
  });

  it("builds English service schema", () => {
    const schema = buildServiceSchema("en");
    expect(schema.serviceType).toBe("Multidisciplinary Care");
  });

  it("references Clinique Aura as provider", () => {
    const schema = buildServiceSchema("fr");
    expect(schema.provider.name).toBe("Clinique Aura");
    expect(schema.provider["@type"]).toBe("MedicalBusiness");
  });
});

describe("buildFaqSchema", () => {
  it("builds FAQPage schema from items", () => {
    const items = [
      { question: "Ai-je besoin d'une référence?", answer: "Non." },
      { question: "Mes traitements sont-ils couverts?", answer: "Oui, la plupart." },
    ];
    const schema = buildFaqSchema(items);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(2);
    expect(schema.mainEntity[0]!["@type"]).toBe("Question");
    expect(schema.mainEntity[0]!.name).toBe("Ai-je besoin d'une référence?");
    expect(schema.mainEntity[0]!.acceptedAnswer.text).toBe("Non.");
  });
});
