import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="mb-2 font-heading text-7xl font-bold text-sky-500/20">
          404
        </p>
        <h1 className="mb-2 font-heading text-2xl font-semibold text-charcoal">
          Page introuvable
        </h1>
        <p className="mb-8 text-pearl-600">
          La page que vous cherchez n&apos;existe pas ou a &eacute;t&eacute;
          d&eacute;plac&eacute;e.
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
        >
          Retour &agrave; l&apos;accueil
        </Link>
      </div>
    </main>
  );
}
