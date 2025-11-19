import type { Metadata } from 'next'
import Link from 'next/link'
import { FileText } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Conditions Générales d\'Utilisation',
  description: 'Conditions générales d\'utilisation de Memo-IA - SaaS de génération automatique de mémoires techniques pour appels d\'offres.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <FileText className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="mb-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Dernière mise à jour : 19 novembre 2025
          </p>

          {/* Navigation légale */}
          <nav className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
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
                  Les présentes Conditions Générales d&apos;Utilisation (ci-après « CGU ») régissent l&apos;utilisation de la plateforme Memo-IA accessible à l&apos;adresse <strong>memo-ia.fr</strong> (ci-après « la Plateforme » ou « le Service »). En utilisant notre Service, vous acceptez sans réserve les présentes CGU.
                </p>
              </div>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                1. Définitions
              </h2>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Utilisateur</strong> : toute personne physique ou morale utilisant la Plateforme</li>
                <li><strong>Client</strong> : Utilisateur ayant souscrit à un abonnement payant</li>
                <li><strong>Contenu</strong> : tout élément (texte, document, mémoire technique) créé ou importé par l&apos;Utilisateur</li>
                <li><strong>Service</strong> : l&apos;ensemble des fonctionnalités proposées par Memo-IA</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                2. Objet et description du Service
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA est une plateforme SaaS (Software as a Service) qui permet la génération automatique de mémoires techniques pour répondre aux appels d&apos;offres publics et privés, en utilisant des technologies d&apos;intelligence artificielle.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Le Service comprend notamment :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>La génération assistée par IA de mémoires techniques</li>
                <li>L&apos;analyse de cahiers des charges</li>
                <li>La personnalisation et l&apos;édition de documents</li>
                <li>L&apos;exportation de documents au format PDF et DOCX</li>
                <li>Le stockage sécurisé de documents</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                3. Accès au Service et création de compte
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.1 Inscription
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;utilisation de certaines fonctionnalités du Service nécessite la création d&apos;un compte utilisateur. L&apos;inscription s&apos;effectue via notre système d&apos;authentification sécurisé fourni par Clerk. L&apos;Utilisateur s&apos;engage à fournir des informations exactes et à les maintenir à jour.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.2 Sécurité du compte
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur est responsable de la confidentialité de ses identifiants de connexion. Il s&apos;engage à :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Utiliser un mot de passe robuste et unique</li>
                <li>Ne pas partager ses identifiants avec des tiers</li>
                <li>Notifier immédiatement Memo-IA de toute utilisation non autorisée de son compte</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                3.3 Conditions d&apos;éligibilité
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur doit être majeur ou disposer de l&apos;autorisation de son représentant légal. Les personnes morales doivent agir par l&apos;intermédiaire d&apos;un représentant dûment habilité.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                4. Abonnements et tarification
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.1 Formules d&apos;abonnement
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA propose différentes formules d&apos;abonnement (Gratuit, Pro, Entreprise) détaillées sur la page tarifs. Chaque formule offre des fonctionnalités et des limites d&apos;utilisation spécifiques (nombre de mémoires générés, stockage, support, etc.).
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.2 Paiements
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Les paiements sont traités de manière sécurisée par Stripe, notre prestataire de services de paiement. Les abonnements sont facturés mensuellement ou annuellement selon l&apos;option choisie. Le prélèvement s&apos;effectue automatiquement à chaque échéance.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Les tarifs sont indiqués en euros (€) TTC. Nous nous réservons le droit de modifier nos tarifs moyennant un préavis de 30 jours.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.3 Période d&apos;essai
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Une période d&apos;essai gratuite de 14 jours peut être proposée pour certaines formules. À l&apos;issue de cette période, l&apos;abonnement payant démarre automatiquement sauf résiliation avant la fin de l&apos;essai.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                4.4 Résiliation et remboursement
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur peut résilier son abonnement à tout moment depuis son espace client. La résiliation prend effet à la fin de la période de facturation en cours. Aucun remboursement partiel n&apos;est effectué pour les mois non utilisés, sauf en cas de manquement grave de Memo-IA à ses obligations.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                5. Propriété intellectuelle
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.1 Propriété de la Plateforme
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                La Plateforme, son code source, son design, ses logos, marques et tout autre élément qui la compose sont la propriété exclusive de Memo-IA et sont protégés par le droit d&apos;auteur, le droit des marques et le droit des bases de données.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.2 Propriété du Contenu Utilisateur
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur conserve l&apos;intégralité de ses droits de propriété intellectuelle sur le Contenu qu&apos;il crée ou importe sur la Plateforme. Toutefois, l&apos;Utilisateur accorde à Memo-IA une licence mondiale, non exclusive et gratuite d&apos;utiliser ce Contenu uniquement dans le but de fournir et d&apos;améliorer le Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Cette licence prend fin lorsque l&apos;Utilisateur supprime son Contenu ou ferme son compte, sous réserve des sauvegardes techniques nécessaires.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                5.3 Contenu généré par l&apos;IA
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Les mémoires techniques et documents générés par l&apos;IA à partir des informations fournies par l&apos;Utilisateur appartiennent à ce dernier. Memo-IA n&apos;utilise pas ce contenu à des fins commerciales ou pour entraîner ses modèles sans le consentement explicite de l&apos;Utilisateur.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                6. Utilisation acceptable du Service
              </h2>

              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur s&apos;engage à utiliser le Service de manière conforme à la loi et aux présentes CGU. Il est notamment interdit de :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Utiliser le Service à des fins illégales ou frauduleuses</li>
                <li>Diffuser des contenus illicites, diffamatoires, discriminatoires ou contraires à l&apos;ordre public</li>
                <li>Tenter d&apos;accéder de manière non autorisée aux systèmes de Memo-IA</li>
                <li>Utiliser des techniques de scraping ou d&apos;extraction automatisée de données</li>
                <li>Revendre ou sous-licencier l&apos;accès au Service sans autorisation</li>
                <li>Surcharger intentionnellement les serveurs ou perturber le fonctionnement du Service</li>
                <li>Utiliser le Service pour générer du contenu frauduleux ou trompeur</li>
              </ul>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                7. Responsabilités et garanties
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                7.1 Responsabilité de Memo-IA
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA s&apos;engage à fournir le Service avec un niveau de compétence et de diligence professionnelle raisonnable. Nous mettons en œuvre tous les moyens techniques nécessaires pour assurer la disponibilité, la sécurité et la performance du Service.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Toutefois, Memo-IA ne peut garantir :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Une disponibilité du Service de 100% (maintenance, pannes, force majeure)</li>
                <li>L&apos;absence totale d&apos;erreurs ou de bugs</li>
                <li>Que les documents générés par l&apos;IA répondront parfaitement à tous les critères des appels d&apos;offres</li>
                <li>Le succès de l&apos;Utilisateur dans l&apos;obtention de marchés</li>
              </ul>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                7.2 Responsabilité de l&apos;Utilisateur
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur est seul responsable :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>De la véracité et de l&apos;exactitude des informations qu&apos;il fournit</li>
                <li>Du Contenu qu&apos;il crée, importe ou diffuse via le Service</li>
                <li>De la relecture et de la validation finale des documents générés avant leur soumission</li>
                <li>Du respect de la législation applicable (marchés publics, propriété intellectuelle, etc.)</li>
                <li>De la conformité de ses documents aux exigences des appels d&apos;offres</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Important</strong> : Memo-IA est un outil d&apos;assistance à la rédaction. Les documents générés doivent toujours être relus, validés et adaptés par l&apos;Utilisateur avant soumission.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                7.3 Limitation de responsabilité
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Dans toute la mesure permise par la loi, la responsabilité de Memo-IA est limitée au montant des sommes effectivement payées par l&apos;Utilisateur au cours des 12 derniers mois. Memo-IA ne pourra être tenue responsable des dommages indirects (perte de chiffre d&apos;affaires, de données, de clientèle, etc.).
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                8. Protection des données personnelles
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Le traitement des données personnelles est effectué conformément au Règlement Général sur la Protection des Données (RGPD) et à notre Politique de Confidentialité, consultable à l&apos;adresse <Link href="/legal/privacy" className="text-purple-600 hover:text-purple-700">memo-ia.fr/legal/privacy</Link>.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Les données sont hébergées en Europe sur des serveurs sécurisés. Nous utilisons des sous-traitants conformes au RGPD (Clerk pour l&apos;authentification, Stripe pour les paiements, Supabase pour le stockage de données).
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                9. Disponibilité et maintenance
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA s&apos;efforce d&apos;assurer une disponibilité optimale du Service. Des interruptions planifiées peuvent survenir pour maintenance, généralement notifiées à l&apos;avance. Nous nous réservons le droit d&apos;interrompre temporairement le Service pour des raisons techniques ou de sécurité.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                En cas d&apos;indisponibilité prolongée (supérieure à 72h consécutives hors cas de force majeure), les Clients payants peuvent demander un avoir proportionnel.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                10. Modification du Service et des CGU
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA se réserve le droit de modifier, améliorer ou interrompre tout ou partie du Service à tout moment. Les modifications substantielles seront notifiées aux Utilisateurs par email ou via la Plateforme.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Les présentes CGU peuvent être modifiées à tout moment. La version en vigueur est toujours accessible sur cette page avec indication de la date de dernière mise à jour. L&apos;utilisation continue du Service après modification vaut acceptation des nouvelles CGU.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                11. Résiliation et suspension du compte
              </h2>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                11.1 Résiliation par l&apos;Utilisateur
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                L&apos;Utilisateur peut à tout moment supprimer son compte depuis son espace client ou en contactant le support. La suppression entraîne la perte définitive de toutes les données associées après un délai de conservation de 30 jours.
              </p>

              <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                11.2 Suspension ou résiliation par Memo-IA
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA peut suspendre ou résilier immédiatement l&apos;accès au Service en cas de :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Violation des présentes CGU</li>
                <li>Utilisation frauduleuse ou illégale du Service</li>
                <li>Non-paiement des sommes dues après relance</li>
                <li>Risque pour la sécurité ou l&apos;intégrité de la Plateforme</li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300">
                Dans la mesure du possible, l&apos;Utilisateur sera informé préalablement et pourra présenter ses observations, sauf urgence ou obligation légale.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                12. Force majeure
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Memo-IA ne pourra être tenue responsable de tout retard ou inexécution de ses obligations résultant d&apos;un cas de force majeure, tel que défini par la jurisprudence française (catastrophe naturelle, guerre, grève, panne généralisée d&apos;internet, acte gouvernemental, etc.).
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                13. Droit applicable et juridiction
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Les présentes CGU sont régies par le droit français. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                À défaut d&apos;accord amiable, tout litige relatif à l&apos;interprétation ou à l&apos;exécution des présentes CGU sera de la compétence exclusive des tribunaux de Paris, France.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Pour les consommateurs</strong> : Conformément au droit de la consommation, vous disposez de la faculté de recourir à une procédure de médiation conventionnelle ou à tout autre mode alternatif de règlement des différends.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                14. Dispositions générales
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Si une ou plusieurs dispositions des présentes CGU sont tenues pour non valides ou déclarées comme telles en application d&apos;une loi, d&apos;un règlement ou à la suite d&apos;une décision définitive d&apos;une juridiction compétente, les autres dispositions conserveront toute leur force et leur portée.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Le fait pour Memo-IA de ne pas se prévaloir temporairement ou de manière permanente d&apos;une ou plusieurs dispositions des présentes CGU ne saurait valoir renonciation à se prévaloir des autres dispositions.
              </p>

              <h2 className="mb-4 mt-8 text-2xl font-bold text-gray-900 dark:text-white">
                15. Contact
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Pour toute question concernant les présentes CGU, vous pouvez nous contacter :
              </p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>Par email : <a href="mailto:contact@memo-ia.fr" className="text-purple-600 hover:text-purple-700">contact@memo-ia.fr</a></li>
                <li>Par courrier : Memo-IA SAS, [Adresse], 75000 Paris, France</li>
                <li>Via notre formulaire de contact : <Link href="/contact" className="text-purple-600 hover:text-purple-700">memo-ia.fr/contact</Link></li>
              </ul>

              <div className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-700">
                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Ces Conditions Générales d&apos;Utilisation ont été mises à jour le 19 novembre 2025.
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
