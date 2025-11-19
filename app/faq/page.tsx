import type { Metadata } from 'next'
import { FAQSection } from '@/components/landing/FAQSection'

export const metadata: Metadata = {
  title: 'FAQ - Questions fréquentes',
  description: 'Trouvez les réponses à toutes vos questions sur Memo-IA : fonctionnement, sécurité, tarifs, support et plus encore. Aide complète pour la génération de mémoires techniques.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Foire aux questions
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Toutes les réponses à vos questions sur Memo-IA
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <FAQSection />

      {/* Additional Resources */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-slate-800">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Notre équipe support est disponible pour répondre à toutes vos questions spécifiques
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href="/contact"
                className="flex items-center justify-center rounded-lg border border-purple-600 bg-purple-600 px-6 py-3 font-semibold text-white transition-all hover:bg-purple-700"
              >
                Nous contacter
              </a>
              <a
                href="/sign-up"
                className="flex items-center justify-center rounded-lg border border-purple-600 px-6 py-3 font-semibold text-purple-600 transition-all hover:bg-purple-50 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-slate-700"
              >
                Essayer gratuitement
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
