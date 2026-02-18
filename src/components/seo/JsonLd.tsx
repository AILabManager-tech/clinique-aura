interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Renders a JSON-LD structured data script tag for SEO.
 *
 * @component
 * @param {JsonLdProps} props - The structured data object to serialize.
 * @example
 * <JsonLd data={localBusinessSchema} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Clinique Aura",
  description:
    "Clinique multidisciplinaire offrant physiothérapie, ostéopathie, massothérapie et nutrition à Sherbrooke.",
  url: "https://clinique-aura.vercel.app",
  telephone: "(819) 555-0200",
  email: "info@clinique-aura.ca",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2500, rue King Ouest, bureau 300",
    addressLocality: "Sherbrooke",
    addressRegion: "QC",
    postalCode: "J1J 2E8",
    addressCountry: "CA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 45.4042,
    longitude: -71.9329,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  areaServed: {
    "@type": "City",
    name: "Sherbrooke",
  },
  priceRange: "$$",
  serviceType: [
    "Physiothérapie",
    "Ostéopathie",
    "Massothérapie",
    "Nutrition et diététique",
  ],
  knowsLanguage: ["fr", "en"],
};

export function buildServiceSchema(locale: string) {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    provider: {
      "@type": "MedicalBusiness",
      name: "Clinique Aura",
      url: "https://clinique-aura.vercel.app",
    },
    serviceType: isFr ? "Soins multidisciplinaires" : "Multidisciplinary Care",
    areaServed: {
      "@type": "City",
      name: "Sherbrooke, Québec, Canada",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isFr ? "Services de santé" : "Health Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Physiothérapie" : "Physiotherapy",
            description: isFr
              ? "Évaluation et traitement des troubles musculosquelettiques. Réadaptation fonctionnelle, thérapie manuelle et exercices personnalisés."
              : "Assessment and treatment of musculoskeletal disorders. Functional rehabilitation, manual therapy and personalized exercises.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Ostéopathie" : "Osteopathy",
            description: isFr
              ? "Approche manuelle globale visant à rétablir l'équilibre du corps. Traitement des tensions et restrictions de mobilité."
              : "A holistic manual approach to restore the body's balance. Treatment of tensions and mobility restrictions.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Massothérapie" : "Massage Therapy",
            description: isFr
              ? "Massage thérapeutique et de détente pour soulager les tensions musculaires et favoriser la récupération."
              : "Therapeutic and relaxation massage to relieve muscle tension and promote recovery.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: isFr ? "Nutrition / Diététique" : "Nutrition / Dietetics",
            description: isFr
              ? "Conseils nutritionnels personnalisés pour optimiser votre santé et prévenir les maladies chroniques."
              : "Personalized nutritional advice to optimize your health and prevent chronic diseases.",
          },
        },
      ],
    },
  };
}

export function buildFaqSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
