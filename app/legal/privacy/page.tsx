import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de Memo-IA - Conformité RGPD.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Politique de Confidentialité
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
              href="/legal/mentions"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
            >
              Mentions légales
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
                  Memo-IA accorde une importance primordiale à la protection de vos données personnelles. La présente Politique de Confidentialité vous informe sur la manière dont nous collectons, utilisons, partageons et protégeons vos données dans le respect du Règlement Général sur la Protection des Données (RGPD) et de la loi française Informatique et Libertés.
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                1. Responsable du traitement
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Le responsable du traitement des données personnelles est :
              </p>
              <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Memo-IA SAS</strong><br />
                  Capital social : 10 000 €<br />
                  SIRET : 923 456 789 00012<br />
                  Siège social : 123 Avenue des Champs-Élysées, 75008 Paris, France<br />
                  Email : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a>
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                2. Délégué à la Protection des Données (DPO)
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question relative à la protection de vos données personnelles ou pour exercer vos droits, vous pouvez contacter notre Délégué à la Protection des Données :
              </p>
              <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>DPO Memo-IA</strong><br />
                  Email : <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a><br />
                  Courrier : DPO, Memo-IA SAS, 123 Avenue des Champs-Élysées, 75008 Paris, France
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                3. Données collectées
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.1 Données d&apos;identification et de contact
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (optionnel)</li>
                <li>Nom de l&apos;entreprise</li>
                <li>Fonction/poste</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.2 Données de connexion et d&apos;authentification
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Identifiant de compte unique (géré par Clerk)</li>
                <li>Mot de passe chiffré (nous ne conservons jamais les mots de passe en clair)</li>
                <li>Adresse IP</li>
                <li>Données de session et cookies d&apos;authentification</li>
                <li>Historique des connexions (date, heure, appareil utilisé)</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.3 Données d&apos;utilisation du Service
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Mémoires techniques créés et documents importés</li>
                <li>Cahiers des charges téléchargés</li>
                <li>Paramètres de personnalisation</li>
                <li>Statistiques d&apos;utilisation (nombre de mémoires générés, fonctionnalités utilisées)</li>
                <li>Logs techniques et données de performance</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.4 Données de facturation et de paiement
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Informations de facturation (nom, adresse, numéro de TVA intracommunautaire si applicable)</li>
                <li>Historique des transactions</li>
                <li>Formule d&apos;abonnement souscrite</li>
              </ul>
              <p className="text-sm italic text-gray-600 dark:text-gray-400">
                <strong>Note importante</strong> : Les données bancaires (numéro de carte, cryptogramme) sont collectées et traitées directement par notre prestataire de paiement sécurisé Stripe. Memo-IA n&apos;a jamais accès à ces données sensibles.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.5 Données de support client
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Échanges par email, chat ou téléphone</li>
                <li>Tickets de support et demandes d&apos;assistance</li>
                <li>Retours d&apos;expérience et avis utilisateurs</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                4. Finalités et bases légales du traitement
              </h2>

              <div className="my-6 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Finalité</th>
                      <th className="p-3 text-left font-semibold text-gray-900 dark:text-white">Base légale RGPD</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-gray-300">
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Création et gestion de votre compte</td>
                      <td className="p-3">Exécution du contrat (Art. 6.1.b RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Fourniture du Service (génération de mémoires)</td>
                      <td className="p-3">Exécution du contrat (Art. 6.1.b RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Traitement des paiements et facturation</td>
                      <td className="p-3">Exécution du contrat et obligation légale (Art. 6.1.b et 6.1.c RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Support client et assistance technique</td>
                      <td className="p-3">Exécution du contrat et intérêt légitime (Art. 6.1.b et 6.1.f RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Amélioration du Service et développement de nouvelles fonctionnalités</td>
                      <td className="p-3">Intérêt légitime (Art. 6.1.f RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Sécurité et prévention de la fraude</td>
                      <td className="p-3">Intérêt légitime et obligation légale (Art. 6.1.c et 6.1.f RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Analyses statistiques et mesure d&apos;audience</td>
                      <td className="p-3">Intérêt légitime (Art. 6.1.f RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Communications marketing (newsletter, offres)</td>
                      <td className="p-3">Consentement (Art. 6.1.a RGPD)</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="p-3">Respect des obligations légales (comptabilité, fiscalité)</td>
                      <td className="p-3">Obligation légale (Art. 6.1.c RGPD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                5. Durée de conservation des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous conservons vos données personnelles uniquement le temps nécessaire aux finalités pour lesquelles elles ont été collectées :
              </p>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Compte actif</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Pendant toute la durée de la relation contractuelle (abonnement actif)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Après résiliation du compte</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Suppression sous 30 jours, sauf obligation légale de conservation (voir ci-dessous)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Données de facturation</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    10 ans (obligation légale comptable et fiscale)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Logs de connexion et données de sécurité</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    1 an (obligation légale française)
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Données marketing (prospects n&apos;ayant pas souscrit)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    3 ans à compter du dernier contact
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Cookies et traceurs</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    13 mois maximum (conformément aux recommandations CNIL)
                  </p>
                </div>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                6. Destinataires des données
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.1 Personnel de Memo-IA
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Seuls les membres autorisés de notre équipe ont accès à vos données, dans la limite de leurs attributions respectives (support, technique, comptabilité).
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.2 Sous-traitants et partenaires
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous faisons appel à des sous-traitants soigneusement sélectionnés et conformes au RGPD pour la fourniture de notre Service :
              </p>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="rounded bg-purple-100 px-2 py-1 text-xs text-purple-700 dark:bg-purple-900 dark:text-purple-300">Authentification</span>
                    Clerk
                  </h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Gestion sécurisée des comptes utilisateurs et de l&apos;authentification
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Localisation : États-Unis (clauses contractuelles types UE approuvées) • <a href="https://clerk.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900 dark:text-green-300">Paiements</span>
                    Stripe
                  </h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Traitement sécurisé des paiements par carte bancaire
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Localisation : Europe (serveurs en Irlande) • Certifié PCI-DSS Level 1 • <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">Base de données</span>
                    Supabase
                  </h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Hébergement sécurisé de la base de données et stockage des documents
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Localisation : Europe (région eu-west-1) • Chiffrement au repos et en transit • <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">Politique de confidentialité</a>
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-700 dark:bg-orange-900 dark:text-orange-300">Hébergement</span>
                    Vercel / AWS
                  </h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Hébergement de l&apos;application web
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Localisation : Europe (région eu-west-1) • Conformité RGPD et ISO 27001
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-800">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                    <span className="rounded bg-pink-100 px-2 py-1 text-xs text-pink-700 dark:bg-pink-900 dark:text-pink-300">Email</span>
                    Resend / SendGrid
                  </h4>
                  <p className="mb-2 text-sm text-gray-700 dark:text-gray-300">
                    Envoi des emails transactionnels et newsletters
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Localisation : Europe • Conformité RGPD
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300">
                Tous nos sous-traitants sont liés par des accords contractuels garantissant la sécurité et la confidentialité de vos données conformément au RGPD (Art. 28).
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                6.3 Autorités et obligations légales
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Nous pouvons être amenés à communiquer vos données aux autorités compétentes en cas d&apos;obligation légale (réquisition judiciaire, lutte contre la fraude, etc.).
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                7. Transferts de données hors UE
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nos serveurs et nos principaux sous-traitants sont situés au sein de l&apos;Union Européenne pour garantir une protection optimale de vos données.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Lorsque certains de nos prestataires sont situés hors de l&apos;UE (notamment Clerk aux États-Unis), nous nous assurons que :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Des <strong>clauses contractuelles types</strong> approuvées par la Commission Européenne sont en place</li>
                <li>Des <strong>mesures de sécurité supplémentaires</strong> sont mises en œuvre (chiffrement, pseudonymisation)</li>
                <li>Le prestataire est certifié selon des <strong>normes de sécurité reconnues</strong> (ISO 27001, SOC 2)</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                8. Vos droits sur vos données personnelles
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
              </p>

              <div className="my-6 space-y-4">
                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit d&apos;accès (Art. 15 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez demander une copie de toutes les données personnelles que nous détenons sur vous
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit de rectification (Art. 16 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez corriger ou mettre à jour vos données si elles sont inexactes ou incomplètes
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit à l&apos;effacement / « Droit à l&apos;oubli » (Art. 17 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez demander la suppression de vos données, sauf obligation légale de conservation
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit à la limitation du traitement (Art. 18 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez demander le gel temporaire du traitement de vos données dans certains cas
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit à la portabilité (Art. 20 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez récupérer vos données dans un format structuré et lisible par machine (JSON, CSV)
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit d&apos;opposition (Art. 21 RGPD)</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez vous opposer au traitement de vos données à des fins de prospection commerciale
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit de retirer votre consentement</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Lorsque le traitement est fondé sur votre consentement, vous pouvez le retirer à tout moment
                  </p>
                </div>

                <div className="rounded-lg border-l-4 border-purple-500 bg-gray-50 p-4 dark:bg-slate-900">
                  <h4 className="mb-2 font-semibold text-gray-900 dark:text-white">Droit de définir des directives post-mortem</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Vous pouvez définir des directives concernant le sort de vos données après votre décès
                  </p>
                </div>
              </div>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Comment exercer vos droits ?
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Pour exercer vos droits, vous pouvez :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Envoyer un email à notre DPO : <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a></li>
                <li>Utiliser les paramètres de votre compte pour gérer certaines données directement</li>
                <li>Envoyer un courrier postal à l&apos;adresse indiquée en section 1</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Délai de réponse</strong> : Nous nous engageons à répondre à votre demande dans un délai d&apos;un mois maximum. En cas de demande complexe, ce délai peut être prolongé de deux mois supplémentaires avec information préalable.
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Justificatif d&apos;identité</strong> : Pour des raisons de sécurité, nous pourrons vous demander une copie d&apos;une pièce d&apos;identité pour vérifier votre identité.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                Droit de réclamation auprès de la CNIL
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Si vous estimez que nous ne respectons pas vos droits ou les obligations du RGPD, vous avez le droit d&apos;introduire une réclamation auprès de la Commission Nationale de l&apos;Informatique et des Libertés (CNIL) :
              </p>
              <div className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-slate-900">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>CNIL</strong><br />
                  3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07<br />
                  Téléphone : +33 1 53 73 22 22<br />
                  Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">www.cnil.fr</a>
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                9. Sécurité des données
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte, destruction ou altération :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Chiffrement</strong> : HTTPS/TLS pour les communications, chiffrement au repos pour les données sensibles</li>
                <li><strong>Authentification renforcée</strong> : Authentification multi-facteurs (2FA) disponible</li>
                <li><strong>Contrôle d&apos;accès</strong> : Accès aux données strictement limité selon le principe du moindre privilège</li>
                <li><strong>Sauvegardes régulières</strong> : Sauvegardes quotidiennes chiffrées avec rétention de 30 jours</li>
                <li><strong>Surveillance</strong> : Monitoring 24/7 et détection des incidents de sécurité</li>
                <li><strong>Mises à jour</strong> : Patches de sécurité appliqués régulièrement</li>
                <li><strong>Tests de sécurité</strong> : Audits et tests d&apos;intrusion périodiques</li>
                <li><strong>Sensibilisation</strong> : Formation continue de nos équipes aux bonnes pratiques de sécurité</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                En cas de violation de données susceptible d&apos;engendrer un risque élevé pour vos droits et libertés, nous vous notifierons dans les 72 heures et informerons la CNIL conformément à l&apos;article 33 du RGPD.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                10. Cookies et technologies similaires
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous utilisons des cookies et technologies similaires pour améliorer votre expérience utilisateur. Pour en savoir plus, consultez notre <Link href="/legal/cookies" className="text-purple-600 hover:text-purple-700">Politique des Cookies</Link>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Vous pouvez gérer vos préférences en matière de cookies à tout moment via les paramètres de votre navigateur ou notre outil de gestion des cookies.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                11. Données des mineurs
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Notre Service n&apos;est pas destiné aux personnes de moins de 18 ans. Nous ne collectons pas sciemment de données personnelles auprès de mineurs. Si vous êtes parent ou tuteur légal et que vous découvrez que votre enfant nous a fourni des données personnelles, contactez-nous immédiatement à <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a>.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                12. Modifications de la Politique de Confidentialité
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Nous nous réservons le droit de modifier la présente Politique de Confidentialité à tout moment pour refléter les évolutions légales, techniques ou de nos pratiques. La date de dernière mise à jour est indiquée en haut de cette page.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                En cas de modification substantielle, nous vous informerons par email ou via une notification sur la Plateforme au moins 30 jours avant l&apos;entrée en vigueur des changements.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                13. Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question concernant cette Politique de Confidentialité ou le traitement de vos données personnelles :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>DPO : <a href="mailto:privacy@memo-ia.fr" className="text-purple-600 hover:text-purple-700">privacy@memo-ia.fr</a></li>
                <li>Support : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a></li>
                <li>Courrier : Memo-IA SAS, 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
              </ul>

              <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Cette Politique de Confidentialité a été mise à jour le 19 novembre 2025.
                  <br />
                  Version 1.0 - Conforme RGPD (UE) 2016/679
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
