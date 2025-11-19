import type { Metadata } from 'next'
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe Memo-IA pour toute question sur notre solution de génération automatique de mémoires techniques. Support disponible par email, téléphone et chat.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Contactez-nous
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Une question ? Un projet ? Notre équipe est là pour vous accompagner.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'contact@memo-ia.fr',
                description: 'Réponse sous 24h',
                link: 'mailto:contact@memo-ia.fr'
              },
              {
                icon: Phone,
                title: 'Téléphone',
                content: '+33 1 23 45 67 89',
                description: 'Lun-Ven 9h-18h',
                link: 'tel:+33123456789'
              },
              {
                icon: MessageSquare,
                title: 'Chat en direct',
                content: 'Support instantané',
                description: 'Disponible 7j/7',
                link: '#'
              },
              {
                icon: MapPin,
                title: 'Adresse',
                content: 'Paris, France',
                description: 'Siège social',
                link: null
              }
            ].map((contact, index) => (
              <Card
                key={index}
                className="group p-6 text-center transition-all hover:shadow-lg dark:bg-slate-800"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 transition-transform group-hover:scale-110">
                  <contact.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {contact.title}
                </h3>
                {contact.link ? (
                  <a
                    href={contact.link}
                    className="mb-1 block font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                  >
                    {contact.content}
                  </a>
                ) : (
                  <p className="mb-1 font-medium text-gray-900 dark:text-white">
                    {contact.content}
                  </p>
                )}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {contact.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ rapide */}
      <section className="bg-white/50 py-16 dark:bg-slate-800/50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
            Questions fréquentes
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Combien de temps faut-il pour obtenir une réponse ?',
                a: 'Nous répondons à tous les emails sous 24h ouvrées. Pour une réponse immédiate, utilisez notre chat en direct disponible 7j/7.'
              },
              {
                q: 'Proposez-vous des démonstrations personnalisées ?',
                a: 'Oui ! Contactez-nous pour planifier une démo de 30 minutes adaptée à vos besoins spécifiques.'
              },
              {
                q: 'Comment obtenir un devis pour mon entreprise ?',
                a: 'Envoyez-nous un email avec le nombre de mémoires que vous prévoyez de générer par mois, et nous vous enverrons un devis personnalisé sous 24h.'
              }
            ].map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-slate-800"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.q}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Plus de questions ?{' '}
              <a
                href="/faq"
                className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400"
              >
                Consultez notre FAQ complète →
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Prêt à essayer Memo-IA ?
          </h2>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            14 jours d&apos;essai gratuit, aucune carte bancaire requise
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
