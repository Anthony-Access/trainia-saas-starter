import type { Metadata } from 'next'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique des Cookies',
  description: 'Politique d\'utilisation des cookies et traceurs sur Memo-IA - Informations sur les cookies utilisés et comment les gérer.',
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Cookie className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Politique des Cookies
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
              href="/legal/mentions"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Mentions légales
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
                  Cette page vous informe sur l&apos;utilisation des cookies et technologies similaires sur le site <strong>memo-ia.fr</strong>. Nous utilisons des cookies pour améliorer votre expérience de navigation, analyser l&apos;utilisation du site et vous proposer des contenus personnalisés. Conformément à la réglementation en vigueur (RGPD et directive ePrivacy), nous vous informons de manière transparente sur ces technologies et vous offrons les moyens de contrôler leur utilisation.
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                1. Qu&apos;est-ce qu&apos;un cookie ?
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lors de la visite d&apos;un site web. Les cookies permettent au site de reconnaître votre navigateur et de mémoriser certaines informations.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Les cookies peuvent avoir différentes finalités : faciliter votre navigation, permettre le bon fonctionnement du site, mesurer l&apos;audience, proposer des contenus personnalisés, etc.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                2. Types de cookies utilisés sur Memo-IA
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                2.1 Cookies strictement nécessaires
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ces cookies sont indispensables au fonctionnement du site et ne peuvent pas être désactivés. Ils permettent notamment :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>L&apos;authentification et la sécurisation de votre session (cookies de session Clerk)</li>
                <li>La mémorisation de vos préférences linguistiques</li>
                <li>La sécurité et la prévention de la fraude</li>
                <li>Le bon fonctionnement du panier et des fonctionnalités essentielles</li>
              </ul>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Nom du cookie</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Finalité</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">__session</td>
                      <td className="p-3">Authentification utilisateur (Clerk)</td>
                      <td className="p-3">7 jours</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">__client_uat</td>
                      <td className="p-3">Token d&apos;authentification</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">memo_csrf</td>
                      <td className="p-3">Protection CSRF (Cross-Site Request Forgery)</td>
                      <td className="p-3">Session</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">next-auth.session-token</td>
                      <td className="p-3">Gestion de session Next.js</td>
                      <td className="p-3">30 jours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                <strong>Base légale</strong> : Ces cookies sont exemptés de consentement car strictement nécessaires à la fourniture du service (Art. 82 de la loi Informatique et Libertés).
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                2.2 Cookies de préférences
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ces cookies permettent de mémoriser vos choix et préférences pour améliorer votre expérience :
              </p>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Nom du cookie</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Finalité</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">theme_preference</td>
                      <td className="p-3">Mémorisation du thème (clair/sombre)</td>
                      <td className="p-3">1 an</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">cookie_consent</td>
                      <td className="p-3">Enregistrement de vos choix de cookies</td>
                      <td className="p-3">13 mois</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">editor_preferences</td>
                      <td className="p-3">Paramètres de l&apos;éditeur de mémoires</td>
                      <td className="p-3">6 mois</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                <strong>Base légale</strong> : Consentement (Art. 6.1.a RGPD)
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                2.3 Cookies analytiques et de mesure d&apos;audience
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ces cookies nous permettent de comprendre comment vous utilisez notre site, d&apos;identifier les pages les plus consultées, et d&apos;améliorer nos services. Nous utilisons ces données de manière anonymisée et agrégée.
              </p>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Service</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Finalité</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">
                        <strong>Google Analytics</strong><br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Mode anonymisé</span>
                      </td>
                      <td className="p-3">
                        Analyse de l&apos;audience et du trafic<br />
                        <span className="text-xs">(_ga, _gid, _gat)</span>
                      </td>
                      <td className="p-3">2 ans (GA), 24h (GID), 1 min (GAT)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">
                        <strong>Vercel Analytics</strong><br />
                        <span className="text-xs text-gray-600 dark:text-gray-400">Mode privacy-first</span>
                      </td>
                      <td className="p-3">
                        Performance et métriques Web Vitals<br />
                        <span className="text-xs">(vitals, perf)</span>
                      </td>
                      <td className="p-3">7 jours</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Configuration respectueuse de la vie privée</strong> :
              </p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li>Anonymisation des adresses IP</li>
                <li>Désactivation du partage de données avec Google/tiers</li>
                <li>Données agrégées uniquement, aucun tracking individuel</li>
              </ul>

              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                <strong>Base légale</strong> : Consentement (Art. 6.1.a RGPD) ou intérêt légitime pour les cookies analytics configurés en mode respectueux de la vie privée
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                2.4 Cookies de paiement (Stripe)
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Lorsque vous effectuez un paiement, Stripe (notre prestataire de paiement) dépose des cookies pour sécuriser la transaction et prévenir la fraude.
              </p>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Cookie</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Finalité</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Durée</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">__stripe_mid</td>
                      <td className="p-3">Prévention de la fraude</td>
                      <td className="p-3">1 an</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3 font-mono text-xs">__stripe_sid</td>
                      <td className="p-3">Sécurisation du processus de paiement</td>
                      <td className="p-3">30 minutes</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                Pour plus d&apos;informations : <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité Stripe</a>
              </p>

              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                <strong>Base légale</strong> : Exécution du contrat et prévention de la fraude (Art. 6.1.b et 6.1.f RGPD)
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                3. Durée de conservation des cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Conformément aux recommandations de la CNIL, la durée de validité du consentement pour les cookies non essentiels est de <strong>13 mois maximum</strong>. Au-delà de cette période, votre consentement vous sera à nouveau demandé.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Les informations collectées via les cookies sont conservées pour une durée maximale de <strong>25 mois</strong> (13 mois + 12 mois pour les archives de comparaison).
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                4. Cookies tiers
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous faisons appel à des services tiers qui peuvent déposer des cookies sur votre appareil :
              </p>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Clerk (Authentification)</h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Gestion de l&apos;authentification et des sessions utilisateurs
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité Clerk</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Stripe (Paiements)</h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Traitement sécurisé des paiements et prévention de la fraude
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité Stripe</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Google Analytics (Statistiques)</h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Analyse de l&apos;audience (avec anonymisation IP activée)
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité Google</a>
                  </p>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                5. Comment gérer vos préférences de cookies ?
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.1 Via notre outil de gestion des cookies
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Lors de votre première visite sur notre site, une bannière vous permet de choisir les catégories de cookies que vous acceptez. Vous pouvez à tout moment modifier vos préférences en cliquant sur le lien « Gérer les cookies » présent dans le footer de chaque page.
              </p>

              <div className="my-6 rounded-lg border-2 border-purple-200 bg-purple-50 p-6 dark:border-purple-800 dark:bg-purple-900/20">
                <p className="mb-4 text-center font-semibold text-gray-900 dark:text-white">
                  Vous pouvez modifier vos préférences à tout moment
                </p>
                <div className="flex justify-center">
                  <button
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        // Cette fonction devra être implémentée avec votre gestionnaire de cookies réel
                        alert('Votre gestionnaire de cookies s\'ouvrira ici')
                      }
                    }}
                  >
                    Gérer mes préférences de cookies
                  </button>
                </div>
              </div>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.2 Via votre navigateur
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Vous pouvez également configurer votre navigateur pour accepter ou refuser les cookies :
              </p>

              <div className="my-6 space-y-3">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Google Chrome</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Paramètres → Confidentialité et sécurité → Cookies et autres données de sites
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Guide Chrome</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Mozilla Firefox</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Options → Vie privée et sécurité → Cookies et données de sites
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Guide Firefox</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Safari (macOS/iOS)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Préférences → Confidentialité → Gérer les données de sites web
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Guide Safari</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Microsoft Edge</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Paramètres → Cookies et autorisations de site → Gérer et supprimer les cookies
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Guide Edge</a>
                  </p>
                </div>
              </div>

              <div className="my-6 rounded-lg border-l-4 border-orange-500 bg-orange-50 p-4 dark:bg-orange-900/20">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Attention</strong> : Le blocage de tous les cookies peut affecter votre expérience de navigation et empêcher l&apos;utilisation de certaines fonctionnalités du site (connexion, paiement, mémorisation des préférences, etc.).
                </p>
              </div>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.3 Outils de refus des cookies analytics
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Vous pouvez également refuser les cookies de Google Analytics en installant le module complémentaire de navigateur fourni par Google :
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Module de désactivation de Google Analytics</a>
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                6. Conséquences du refus des cookies
              </h2>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="text-green-600">✓</span>
                    Cookies strictement nécessaires (non désactivables)
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Indispensables au fonctionnement du site (authentification, sécurité, paiement)
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="text-blue-600">~</span>
                    Cookies de préférences (désactivables)
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Impact : Vos préférences (thème, langue, paramètres éditeur) ne seront pas mémorisées entre les sessions
                  </p>
                </div>

                <div className="rounded-lg border border-purple-200 bg-purple-50 p-4 dark:border-purple-800 dark:bg-purple-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="text-purple-600">ⓘ</span>
                    Cookies analytics (désactivables)
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Impact : Nous ne pourrons pas mesurer l&apos;utilisation du site et améliorer nos services en fonction de vos usages
                  </p>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                7. Cookies et données personnelles
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Certains cookies peuvent contenir des données personnelles (identifiant utilisateur, préférences, etc.). Ces données sont traitées conformément à notre <Link href="/legal/privacy" className="text-purple-600 hover:text-purple-700">Politique de Confidentialité</Link> et au RGPD.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Vous disposez des droits suivants concernant vos données personnelles collectées via les cookies :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Droit d&apos;accès et de rectification</li>
                <li>Droit à l&apos;effacement</li>
                <li>Droit d&apos;opposition</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Pour exercer ces droits, contactez-nous à <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a>
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                8. Modifications de la Politique des Cookies
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous nous réservons le droit de modifier cette Politique des Cookies à tout moment pour refléter les évolutions techniques, légales ou de nos pratiques. La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Nous vous encourageons à consulter régulièrement cette page pour rester informé de l&apos;utilisation des cookies sur notre site.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                9. Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question concernant cette Politique des Cookies ou l&apos;utilisation des cookies sur notre site :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Email DPO : <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a></li>
                <li>Support : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a></li>
                <li>Courrier : Memo-IA SAS, 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                10. Ressources utiles
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>
                  <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                    CNIL - Cookies et traceurs : que dit la loi ?
                  </a>
                </li>
                <li>
                  <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                    CNIL - Outils pour maîtriser les cookies
                  </a>
                </li>
                <li>
                  <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                    AboutCookies.org - Informations et guides sur les cookies
                  </a>
                </li>
              </ul>

              <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Cette Politique des Cookies a été mise à jour le 19 novembre 2025.
                  <br />
                  Version 1.0 - Conforme aux recommandations de la CNIL
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
