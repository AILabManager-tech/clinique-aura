import type { Metadata } from "next";
import { useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Mentions légales" : "Legal Notice",
    description:
      locale === "fr"
        ? "Mentions légales de Clinique Aura inc. — identification, hébergement, propriété intellectuelle."
        : "Clinique Aura Inc. legal notice — identification, hosting, intellectual property.",
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}/mentions-legales`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr/mentions-legales",
        en: "https://clinique-aura.vercel.app/en/mentions-legales",
      },
    },
  };
}

export default function LegalNoticePage() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 font-heading text-3xl font-bold text-charcoal">
        {isFr ? "Mentions légales" : "Legal Notice"}
      </h1>

      <div className="prose prose-charcoal max-w-none space-y-8 text-charcoal/80">
        {/* 1. Identification */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "1. Identification de l'entreprise" : "1. Company identification"}
          </h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Dénomination sociale" : "Legal name"} :</strong>{" "}
              Clinique Aura inc.
            </li>
            <li>
              <strong>NEQ :</strong> 1234567890
            </li>
            <li>
              <strong>{isFr ? "Adresse" : "Address"} :</strong>{" "}
              2500, rue King Ouest, bureau 300, Sherbrooke QC J1J 2E8
            </li>
            <li>
              <strong>{isFr ? "Téléphone" : "Phone"} :</strong> (819) 555-0200
            </li>
            <li>
              <strong>{isFr ? "Courriel" : "Email"} :</strong>{" "}
              <a href="mailto:info@clinique-aura.ca" className="text-sky-700 underline">
                info@clinique-aura.ca
              </a>
            </li>
          </ul>
        </section>

        {/* 2. Hébergement */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "2. Hébergement" : "2. Hosting"}
          </h2>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Hébergeur" : "Host"} :</strong> Vercel Inc.
            </li>
            <li>
              <strong>{isFr ? "Adresse" : "Address"} :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA
            </li>
          </ul>
        </section>

        {/* 3. Organisme de réglementation */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "3. Organisme de réglementation" : "3. Regulatory body"}
          </h2>
          <p>
            {isFr
              ? "Les services de physiothérapie, ostéopathie, massothérapie et nutrition sont régis par les ordres professionnels et organismes compétents du Québec, notamment l'Ordre professionnel de la physiothérapie du Québec, l'Ordre professionnel des diététistes du Québec et les associations professionnelles applicables."
              : "Physiotherapy, osteopathy, massage therapy and nutrition services are governed by the relevant professional orders and regulatory bodies of Quebec, including the Ordre professionnel de la physiothérapie du Québec, the Ordre professionnel des diététistes du Québec and applicable professional associations."}
          </p>
        </section>

        {/* 4. RPP */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr
              ? "4. Responsable de la protection des renseignements personnels"
              : "4. Person responsible for the protection of personal information"}
          </h2>
          <p>
            {isFr
              ? "Conformément à la Loi 25 du Québec (art. 3.1), le responsable est :"
              : "In accordance with Quebec's Law 25 (s. 3.1), the responsible person is:"}
          </p>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>{isFr ? "Nom" : "Name"} :</strong> Dre Sophie Lafleur
            </li>
            <li>
              <strong>{isFr ? "Titre" : "Title"} :</strong>{" "}
              {isFr ? "Physiothérapeute, fondatrice" : "Physiotherapist, Founder"}
            </li>
            <li>
              <strong>{isFr ? "Courriel" : "Email"} :</strong>{" "}
              <a href="mailto:rpp@clinique-aura.ca" className="text-sky-700 underline">
                rpp@clinique-aura.ca
              </a>
            </li>
          </ul>
        </section>

        {/* 5. Propriété intellectuelle */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "5. Propriété intellectuelle" : "5. Intellectual property"}
          </h2>
          <p>
            {isFr
              ? "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.) est la propriété de Clinique Aura inc. ou de ses partenaires et est protégé par les lois applicables en matière de propriété intellectuelle. Toute reproduction, représentation, modification ou exploitation non autorisée est interdite."
              : "All content on this website (texts, images, graphics, logo, icons, etc.) is the property of Clinique Aura Inc. or its partners and is protected by applicable intellectual property laws. Any unauthorized reproduction, representation, modification or exploitation is prohibited."}
          </p>
        </section>

        {/* 6. Limitation de responsabilité */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "6. Limitation de responsabilité" : "6. Limitation of liability"}
          </h2>
          <p>
            {isFr
              ? "Les informations présentées sur ce site sont fournies à titre informatif uniquement et ne constituent pas un avis médical. Clinique Aura inc. s'efforce de fournir des informations exactes et à jour, mais ne peut garantir l'exactitude, la complétude ou l'actualité des informations présentées. Pour tout problème de santé, consultez un professionnel qualifié."
              : "The information presented on this site is provided for informational purposes only and does not constitute medical advice. Clinique Aura Inc. strives to provide accurate and up-to-date information, but cannot guarantee the accuracy, completeness or timeliness of the information presented. For any health concern, consult a qualified professional."}
          </p>
        </section>

        {/* 7. Liens externes */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "7. Liens externes" : "7. External links"}
          </h2>
          <p>
            {isFr
              ? "Ce site peut contenir des liens vers des sites externes. Clinique Aura inc. n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu."
              : "This site may contain links to external websites. Clinique Aura Inc. has no control over these sites and disclaims all responsibility for their content."}
          </p>
        </section>

        {/* 8. Droit applicable */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "8. Droit applicable" : "8. Applicable law"}
          </h2>
          <p>
            {isFr
              ? "Les présentes mentions légales sont régies par les lois du Québec et du Canada. Tout litige relatif à l'utilisation de ce site sera soumis aux tribunaux compétents du district judiciaire de Saint-François (Sherbrooke)."
              : "These legal notices are governed by the laws of Quebec and Canada. Any dispute relating to the use of this site shall be submitted to the competent courts of the judicial district of Saint-François (Sherbrooke)."}
          </p>
        </section>

        {/* 9. Contact */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "9. Contact" : "9. Contact"}
          </h2>
          <p>
            <strong>Clinique Aura inc.</strong>
            <br />
            2500, rue King Ouest, bureau 300
            <br />
            Sherbrooke, QC J1J 2E8
            <br />
            (819) 555-0200
            <br />
            <a href="mailto:info@clinique-aura.ca" className="text-sky-700 underline">
              info@clinique-aura.ca
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
