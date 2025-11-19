import type { Metadata } from 'next'
import { Target, Users, Award, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Memo-IA, la solution française qui révolutionne la rédaction de mémoires techniques pour les appels d\'offres. Notre mission : démocratiser l\'accès aux marchés publics pour toutes les entreprises.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            À propos de{' '}
            <span className="bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Memo-IA
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Notre mission : démocratiser l'accès aux marchés publics et privés en rendant la rédaction de mémoires techniques accessible à toutes les entreprises, quelle que soit leur taille.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
            Notre histoire
          </h2>
          <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300">
            <p>
              Memo-IA est né d'un constat simple : la rédaction de mémoires techniques pour les appels d'offres est chronophage, coûteuse et souvent inaccessible pour les PME. Trop d'entreprises compétentes renoncent à répondre aux appels d'offres par manque de temps et de ressources.
            </p>
            <p>
              En 2024, nous avons décidé de changer cela en développant une intelligence artificielle spécialisée dans la rédaction de mémoires techniques. Notre IA comprend les exigences des cahiers des charges, analyse les critères de notation et génère des mémoires conformes et pertinents.
            </p>
            <p>
              Aujourd'hui, plus de 500 entreprises utilisent Memo-IA pour gagner du temps et remporter plus de marchés. Notre technologie 100% française est hébergée en Europe et respecte scrupuleusement le RGPD.
            </p>
          </div>
        </div>
      </section>

      {/* Nos valeurs */}
      <section className="bg-white/50 py-16 dark:bg-slate-800/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Nos valeurs
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Target,
                title: 'Excellence',
                description: 'Nous visons l\'excellence dans chaque mémoire généré pour maximiser vos chances de succès.'
              },
              {
                icon: Users,
                title: 'Accessibilité',
                description: 'Rendre les marchés publics accessibles à toutes les entreprises, grandes ou petites.'
              },
              {
                icon: Award,
                title: 'Qualité',
                description: 'Notre IA est entraînée sur des milliers de mémoires gagnants pour garantir la qualité.'
              },
              {
                icon: TrendingUp,
                title: 'Innovation',
                description: 'Nous innovons constamment pour vous offrir les meilleures fonctionnalités du marché.'
              }
            ].map((value, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 text-center transition-all hover:shadow-lg dark:border-gray-700 dark:bg-slate-800"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chiffres clés */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Memo-IA en chiffres
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '500+', label: 'Entreprises clientes' },
              { value: '10,000+', label: 'Mémoires générés' },
              { value: '15h', label: 'Gagnées par semaine' },
              { value: '94%', label: 'Taux de satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Prêt à transformer votre approche des appels d'offres ?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            Rejoignez les centaines d'entreprises qui gagnent plus de marchés avec Memo-IA
          </p>
          <a
            href="/sign-up"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
          >
            Démarrer gratuitement
          </a>
        </div>
      </section>
    </div>
  )
}
