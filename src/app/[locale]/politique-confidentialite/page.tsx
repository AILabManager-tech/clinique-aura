import type { Metadata } from "next";
import { useLocale } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "fr" ? "Politique de confidentialité" : "Privacy Policy",
    description:
      locale === "fr"
        ? "Politique de confidentialité de Clinique Aura inc. — conforme à la Loi 25 du Québec. Protection des données de santé."
        : "Clinique Aura Inc. privacy policy — compliant with Quebec's Law 25. Health data protection.",
    alternates: {
      canonical: `https://clinique-aura.vercel.app/${locale}/politique-confidentialite`,
      languages: {
        fr: "https://clinique-aura.vercel.app/fr/politique-confidentialite",
        en: "https://clinique-aura.vercel.app/en/politique-confidentialite",
      },
    },
  };
}

export default function PrivacyPolicyPage() {
  const locale = useLocale();
  const isFr = locale === "fr";

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="mb-8 font-heading text-3xl font-bold text-charcoal">
        {isFr ? "Politique de confidentialité" : "Privacy Policy"}
      </h1>
      <p className="mb-8 text-sm text-charcoal/70">
        {isFr ? "Dernière mise à jour : février 2026" : "Last updated: February 2026"}
      </p>

      <div className="prose prose-charcoal max-w-none space-y-8 text-charcoal/80">
        {/* 1. Introduction */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "1. Introduction" : "1. Introduction"}
          </h2>
          <p>
            {isFr
              ? "Clinique Aura inc. (ci-après « nous ») s'engage à protéger les renseignements personnels de ses patients et utilisateurs conformément à la Loi 25 du Québec (Loi modernisant des dispositions législatives en matière de protection des renseignements personnels). En tant que clinique de santé, nous accordons une attention particulière à la protection des données de santé."
              : "Clinique Aura Inc. (hereinafter \"we\") is committed to protecting the personal information of its patients and users in accordance with Quebec's Law 25 (Act to modernize legislative provisions regarding the protection of personal information). As a health clinic, we pay particular attention to the protection of health data."}
          </p>
        </section>

        {/* 2. RPP */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr
              ? "2. Responsable de la protection des renseignements personnels (RPP)"
              : "2. Person responsible for the protection of personal information"}
          </h2>
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
              <a href="mailto:rpp@clinique-aura.ca" className="text-sky-600 underline">
                rpp@clinique-aura.ca
              </a>
            </li>
          </ul>
        </section>

        {/* 3. Renseignements collectés */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "3. Renseignements personnels collectés" : "3. Personal information collected"}
          </h2>
          <p>
            {isFr
              ? "Nous collectons les renseignements suivants dans le cadre de nos activités :"
              : "We collect the following information as part of our activities:"}
          </p>
          <h3 className="font-heading text-lg font-medium text-charcoal">
            {isFr ? "Via le site web" : "Via the website"}
          </h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>{isFr ? "Nom et prénom" : "First and last name"}</li>
            <li>{isFr ? "Adresse courriel" : "Email address"}</li>
            <li>{isFr ? "Numéro de téléphone" : "Phone number"}</li>
            <li>{isFr ? "Service souhaité" : "Desired service"}</li>
            <li>
              {isFr
                ? "Messages envoyés via le formulaire de contact"
                : "Messages sent via the contact form"}
            </li>
            <li>
              {isFr
                ? "Données de navigation (via témoins analytiques, si consentement)"
                : "Browsing data (via analytics cookies, if consented)"}
            </li>
          </ul>
          <h3 className="mt-4 font-heading text-lg font-medium text-charcoal">
            {isFr ? "Dossiers professionnels (en clinique)" : "Professional records (in clinic)"}
          </h3>
          <p>
            {isFr
              ? "Les dossiers de santé tenus par nos professionnels (physiothérapeute, ostéopathe, massothérapeute, nutritionniste) sont régis par les lois et règlements applicables à chaque profession, incluant le Code des professions du Québec. Ces dossiers sont conservés de manière confidentielle et sécurisée, séparément des données du site web."
              : "Health records maintained by our professionals (physiotherapist, osteopath, massage therapist, nutritionist) are governed by the laws and regulations applicable to each profession, including Quebec's Professional Code. These records are kept confidentially and securely, separately from website data."}
          </p>
        </section>

        {/* 4. Finalités */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "4. Finalités de la collecte" : "4. Purposes of collection"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>{isFr ? "Répondre à vos demandes de rendez-vous" : "Respond to your appointment requests"}</li>
            <li>{isFr ? "Fournir nos services de santé multidisciplinaires" : "Provide our multidisciplinary health services"}</li>
            <li>{isFr ? "Améliorer l'expérience de navigation sur le site" : "Improve the browsing experience on the site"}</li>
            <li>{isFr ? "Communiquer avec vous au sujet de vos rendez-vous et traitements" : "Communicate with you about your appointments and treatments"}</li>
            <li>{isFr ? "Respecter nos obligations légales et professionnelles" : "Meet our legal and professional obligations"}</li>
          </ul>
        </section>

        {/* 5. Consentement */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "5. Consentement" : "5. Consent"}
          </h2>
          <p>
            {isFr
              ? "Conformément à l'article 8.1 de la Loi 25, nous obtenons votre consentement manifeste, libre et éclairé avant de collecter vos renseignements personnels. Les témoins (cookies) non essentiels ne sont activés qu'après votre consentement explicite. Vous pouvez modifier vos préférences à tout moment via le lien « Gestion des témoins » en bas de chaque page."
              : "In accordance with Section 8.1 of Law 25, we obtain your manifest, free and informed consent before collecting your personal information. Non-essential cookies are only activated after your explicit consent. You can change your preferences at any time via the \"Cookie Settings\" link at the bottom of each page."}
          </p>
        </section>

        {/* 6. Conservation */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "6. Durée de conservation" : "6. Retention period"}
          </h2>
          <p>
            {isFr
              ? "Les données collectées via le site web sont conservées pendant 24 mois après votre dernière interaction avec nous. Après cette période, elles sont détruites de manière sécurisée conformément à l'article 23 de la Loi 25."
              : "Data collected via the website is retained for 24 months after your last interaction with us. After this period, it is securely destroyed in accordance with Section 23 of Law 25."}
          </p>
          <p>
            {isFr
              ? "Les dossiers professionnels de santé sont conservés selon les durées prescrites par les ordres professionnels et la législation applicable (généralement 5 ans minimum après le dernier service rendu)."
              : "Professional health records are retained according to the periods prescribed by professional orders and applicable legislation (generally a minimum of 5 years after the last service rendered)."}
          </p>
        </section>

        {/* 7. Droits */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "7. Vos droits" : "7. Your rights"}
          </h2>
          <p>
            {isFr ? "En vertu de la Loi 25, vous avez le droit de :" : "Under Law 25, you have the right to:"}
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>{isFr ? "Accéder" : "Access"}</strong> —{" "}
              {isFr ? "consulter vos renseignements personnels" : "view your personal information"}
            </li>
            <li>
              <strong>{isFr ? "Rectifier" : "Rectify"}</strong> —{" "}
              {isFr ? "corriger des informations inexactes" : "correct inaccurate information"}
            </li>
            <li>
              <strong>{isFr ? "Supprimer" : "Delete"}</strong> —{" "}
              {isFr ? "demander la suppression de vos données" : "request deletion of your data"}
            </li>
            <li>
              <strong>{isFr ? "Retirer votre consentement" : "Withdraw consent"}</strong> —{" "}
              {isFr ? "à tout moment" : "at any time"}
            </li>
            <li>
              <strong>{isFr ? "Porter plainte" : "File a complaint"}</strong> —{" "}
              {isFr
                ? "auprès de la Commission d'accès à l'information du Québec (CAI)"
                : "with the Commission d'accès à l'information du Québec (CAI)"}
            </li>
          </ul>
          <p className="mt-2">
            {isFr ? "Pour exercer ces droits : " : "To exercise these rights: "}
            <a href="mailto:rpp@clinique-aura.ca" className="text-sky-600 underline">
              rpp@clinique-aura.ca
            </a>
            {isFr ? ". Nous répondrons dans un délai de 30 jours." : ". We will respond within 30 days."}
          </p>
        </section>

        {/* 8. Services tiers */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "8. Services tiers" : "8. Third-party services"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Vercel</strong> — {isFr ? "Hébergement du site" : "Website hosting"} (USA)
            </li>
            <li>
              <strong>Google Analytics</strong> —{" "}
              {isFr ? "Statistiques de navigation (si consentement)" : "Browsing analytics (if consented)"} (USA)
            </li>
          </ul>
        </section>

        {/* 9. Transfert hors Québec */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "9. Transfert hors Québec" : "9. Transfer outside Quebec"}
          </h2>
          <p>
            {isFr
              ? "Certains services tiers (Vercel, Google) sont situés aux États-Unis. En utilisant notre site et en consentant aux témoins analytiques, vous acceptez que certaines données de navigation puissent être traitées aux États-Unis. Ces fournisseurs s'engagent à protéger vos données conformément à leurs politiques de confidentialité respectives. Les données de santé collectées en clinique ne sont jamais transférées hors du Québec."
              : "Some third-party services (Vercel, Google) are located in the United States. By using our site and consenting to analytical cookies, you agree that some browsing data may be processed in the United States. These providers are committed to protecting your data in accordance with their respective privacy policies. Health data collected in clinic is never transferred outside of Quebec."}
          </p>
        </section>

        {/* 10. Témoins */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "10. Témoins (cookies)" : "10. Cookies"}
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>{isFr ? "Essentiels" : "Essential"}</strong> —{" "}
              {isFr
                ? "Nécessaires au fonctionnement du site. Toujours actifs."
                : "Required for the website to function. Always active."}
            </li>
            <li>
              <strong>{isFr ? "Analytiques" : "Analytics"}</strong> —{" "}
              {isFr
                ? "Activés uniquement avec votre consentement."
                : "Activated only with your consent."}
            </li>
            <li>
              <strong>Marketing</strong> —{" "}
              {isFr
                ? "Activés uniquement avec votre consentement."
                : "Activated only with your consent."}
            </li>
          </ul>
        </section>

        {/* 11. Sécurité */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "11. Sécurité" : "11. Security"}
          </h2>
          <p>
            {isFr
              ? "Nous mettons en place des mesures de sécurité raisonnables : chiffrement HTTPS, headers de sécurité HTTP complets, aucune clé API exposée côté client. Les dossiers de santé en clinique sont protégés par des mesures de sécurité physiques et numériques conformes aux exigences des ordres professionnels."
              : "We implement reasonable security measures: HTTPS encryption, complete HTTP security headers, no API keys exposed client-side. In-clinic health records are protected by physical and digital security measures in compliance with professional order requirements."}
          </p>
        </section>

        {/* 12. Incident */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "12. Incident de confidentialité" : "12. Privacy incident"}
          </h2>
          <p>
            {isFr
              ? "En cas d'incident de confidentialité présentant un risque de préjudice sérieux, nous nous engageons à aviser la Commission d'accès à l'information du Québec (CAI) et les personnes concernées, et à tenir un registre des incidents conformément à l'article 3.5 de la Loi 25."
              : "In the event of a privacy incident presenting a risk of serious harm, we commit to notifying the Commission d'accès à l'information du Québec (CAI) and affected individuals, and to maintaining a register of incidents in accordance with Section 3.5 of Law 25."}
          </p>
          <p>
            {isFr ? "Courriel de notification d'incident : " : "Incident notification email: "}
            <a href="mailto:rpp@clinique-aura.ca" className="text-sky-600 underline">
              rpp@clinique-aura.ca
            </a>
          </p>
        </section>

        {/* 13. Contact */}
        <section>
          <h2 className="font-heading text-xl font-semibold text-charcoal">
            {isFr ? "13. Contact" : "13. Contact"}
          </h2>
          <p>
            <strong>Clinique Aura inc.</strong>
            <br />
            Dre Sophie Lafleur, RPP
            <br />
            2500, rue King Ouest, bureau 300
            <br />
            Sherbrooke, QC J1J 2E8
            <br />
            (819) 555-0200
            <br />
            <a href="mailto:rpp@clinique-aura.ca" className="text-sky-600 underline">
              rpp@clinique-aura.ca
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
