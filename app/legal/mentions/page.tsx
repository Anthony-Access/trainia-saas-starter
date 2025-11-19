import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site Memo-IA - Informations sur l\'éditeur, l\'hébergeur et les crédits.',
}

export default function MentionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Mentions Légales
          </h1>
          <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : 19 novembre 2025
          </p>

          {/* Navigation légale */}
          <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/legal/terms"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              CGU
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/legal/privacy"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Confidentialité
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/legal/cookies"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Cookies
            </Link>
          </nav>
        </div>
      </section>

      {/* Contenu */}
      <section className="pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-800 md:p-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="mb-8 rounded-lg bg-purple-50 p-6 dark:bg-purple-900/20">
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l&apos;économie numérique, il est précisé aux utilisateurs du site <strong>memo-ia.fr</strong> l&apos;identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                1. Éditeur du site
              </h2>

              <div className="my-6 rounded-lg border-2 border-purple-200 bg-purple-50/50 p-6 dark:border-purple-800 dark:bg-purple-900/20">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Raison sociale
                    </h3>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Memo-IA SAS
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Forme juridique
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      Société par Actions Simplifiée
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Capital social
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      10 000 € (dix mille euros)
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      SIRET
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      923 456 789 00012
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      RCS
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      Paris B 923 456 789
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      TVA intracommunautaire
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      FR 12 923456789
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Siège social
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris<br />
                      France
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Téléphone
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      <a href="tel:+33123456789" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                        +33 1 23 45 67 89
                      </a>
                    </p>
                  </div>

                  <div>
                    <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
                      Email
                    </h3>
                    <p className="text-lg text-gray-900 dark:text-white">
                      <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                        contact@memo-ia.fr
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                2. Directeur de la publication
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Le Directeur de la publication du site memo-ia.fr est :
              </p>
              <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>M. Jean Dupont</strong><br />
                  Président de Memo-IA SAS<br />
                  Email : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a>
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                3. Hébergement du site
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                Le site memo-ia.fr est hébergé par :
              </p>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-slate-800">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    Vercel Inc.
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      <strong>Adresse</strong> : 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis
                    </p>
                    <p>
                      <strong>Site web</strong> : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">vercel.com</a>
                    </p>
                    <p>
                      <strong>Région d&apos;hébergement</strong> : Europe (eu-west-1 - France/Irlande)
                    </p>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Infrastructure fournie par Amazon Web Services (AWS) dans la région Europe.
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-slate-800">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white">
                    Base de données : Supabase Inc.
                  </h3>
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <p>
                      <strong>Adresse</strong> : 970 Toa Payoh North #07-04, Singapore 318992
                    </p>
                    <p>
                      <strong>Site web</strong> : <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">supabase.com</a>
                    </p>
                    <p>
                      <strong>Région d&apos;hébergement</strong> : Europe (eu-west-1 - Irlande)
                    </p>
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                      Toutes les données utilisateurs sont stockées exclusivement sur des serveurs situés dans l&apos;Union Européenne, conformément au RGPD.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                4. Propriété intellectuelle
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.1 Contenu du site
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;ensemble du contenu de ce site (structure, textes, logos, images, graphismes, icônes, sons, logiciels, bases de données, etc.) est la propriété exclusive de Memo-IA SAS, à l&apos;exception des marques, logos ou contenus appartenant à d&apos;autres sociétés partenaires ou auteurs.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Memo-IA SAS.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.2 Marques et logos
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Les marques « Memo-IA » et le logo associé sont des marques déposées de Memo-IA SAS. Toute utilisation non autorisée de ces marques constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.3 Droits d&apos;auteur
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Le site memo-ia.fr est protégé par le droit d&apos;auteur français et les conventions internationales. Tout utilisateur s&apos;engage à respecter les droits de propriété intellectuelle de Memo-IA et de ses partenaires.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                5. Crédits et technologies utilisées
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.1 Conception et développement
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Le site memo-ia.fr a été conçu et développé par l&apos;équipe technique de Memo-IA SAS.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.2 Technologies et frameworks
              </h3>
              <div className="my-4 space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-black text-white">
                    <span className="text-xs font-bold">▲</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Next.js 14</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Framework React pour applications web</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600 text-white">
                    <span className="text-xs font-bold">TS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">TypeScript</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Langage de programmation typé</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                    <span className="text-xs font-bold">CSS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">Tailwind CSS</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Framework CSS utility-first</p>
                  </div>
                </div>
              </div>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.3 Services tiers et partenaires
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Clerk</strong> - Authentification et gestion des utilisateurs (<a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">clerk.com</a>)</li>
                <li><strong>Stripe</strong> - Traitement sécurisé des paiements (<a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">stripe.com</a>)</li>
                <li><strong>Supabase</strong> - Base de données et stockage (<a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">supabase.com</a>)</li>
                <li><strong>OpenAI</strong> - Intelligence artificielle pour la génération de contenu (<a href="https://openai.com" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">openai.com</a>)</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.4 Icônes et ressources graphiques
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Lucide Icons</strong> - Bibliothèque d&apos;icônes open-source (<a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">lucide.dev</a>)</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                6. Responsabilité et garanties
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.1 Exactitude des informations
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Memo-IA ne peut garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur le site.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.2 Disponibilité du site
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA met en œuvre tous les moyens raisonnables pour assurer un accès de qualité au site, mais n&apos;est tenue à aucune obligation d&apos;y parvenir. Memo-IA ne peut être tenue responsable de tout dysfonctionnement du réseau ou des serveurs, ou de tout autre événement échappant à son contrôle raisonnable, qui empêcherait ou dégraderait l&apos;accès au site.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.3 Liens hypertextes
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Le site memo-ia.fr peut contenir des liens hypertextes vers d&apos;autres sites. Memo-IA ne peut être tenue responsable du contenu de ces sites externes.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                7. Protection des données personnelles
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute information concernant la collecte et le traitement de vos données personnelles, veuillez consulter notre <Link href="/legal/privacy" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">Politique de Confidentialité</Link>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données personnelles. Pour exercer ces droits, contactez : <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a>
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                8. Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Le site memo-ia.fr utilise des cookies pour améliorer l&apos;expérience utilisateur et mesurer l&apos;audience. Pour plus d&apos;informations, consultez notre <Link href="/legal/cookies" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">Politique des Cookies</Link>.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                9. Droit applicable et juridiction
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d&apos;accord amiable, le litige sera porté devant les tribunaux compétents de Paris, France.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                10. Médiation de la consommation
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Conformément à l&apos;article L.612-1 du Code de la consommation, Memo-IA propose un dispositif de médiation de la consommation. L&apos;entité de médiation retenue est :
              </p>
              <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Médiateur de la consommation</strong><br />
                  Centre de Médiation et d&apos;Arbitrage de Paris (CMAP)<br />
                  39 avenue Franklin D. Roosevelt, 75008 Paris<br />
                  Site web : <a href="https://www.mediateur-conso.cmap.fr" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">mediateur-conso.cmap.fr</a>
                </p>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Après démarche préalable écrite des consommateurs auprès de Memo-IA, le Service du Médiateur peut être saisi pour tout litige de consommation dont le règlement n&apos;aurait pas abouti.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                11. Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
              </p>
              <div className="my-4 space-y-2 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Par email</strong> : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a>
                </p>
                <p>
                  <strong>Par téléphone</strong> : <a href="tel:+33123456789" className="text-purple-600 hover:text-purple-700">+33 1 23 45 67 89</a>
                </p>
                <p>
                  <strong>Par courrier</strong> : Memo-IA SAS, 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
                <p>
                  <strong>Via notre formulaire</strong> : <Link href="/contact" className="text-purple-600 hover:text-purple-700">memo-ia.fr/contact</Link>
                </p>
              </div>

              <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Ces Mentions Légales ont été mises à jour le 19 novembre 2025.
                  <br />
                  Version 1.0
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
