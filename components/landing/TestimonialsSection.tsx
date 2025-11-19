'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: "Marie Durand",
    role: "Directrice Commerciale",
    company: "BTP Solutions",
    image: null, // Placeholder for future image
    rating: 5,
    content: "Memo-IA nous a fait gagner 15 heures par semaine sur la rédaction de mémoires techniques. Nous pouvons maintenant répondre à 3 fois plus d'appels d'offres sans recruter. Le ROI a été atteint en moins de 2 mois.",
    highlight: "15h gagnées par semaine"
  },
  {
    name: "Thomas Leroy",
    role: "Responsable Développement",
    company: "Ingénierie Conseil",
    image: null,
    rating: 5,
    content: "La qualité des mémoires générés est impressionnante. L'IA comprend vraiment les exigences et couvre tous les critères. Nous avons augmenté notre taux de succès de 35% depuis qu'on utilise Memo-IA.",
    highlight: "+35% de taux de succès"
  },
  {
    name: "Sophie Martin",
    role: "CEO",
    company: "Environnement+",
    image: null,
    rating: 5,
    content: "Avant Memo-IA, on passait 3 jours sur chaque mémoire. Maintenant, c'est fait en 30 minutes. Notre équipe se concentre enfin sur la stratégie et le relationnel client plutôt que sur la rédaction administrative.",
    highlight: "3 jours → 30 minutes"
  },
  {
    name: "Laurent Dubois",
    role: "Directeur des Opérations",
    company: "Services Publics Pro",
    image: null,
    rating: 5,
    content: "Le système de conformité automatique est un game-changer. Plus d'oublis de critères, plus de stress de dernière minute. Et le support client est excellent, toujours réactif.",
    highlight: "Zéro oubli de critères"
  },
  {
    name: "Céline Robert",
    role: "Responsable Appels d'Offres",
    company: "Multiservices France",
    image: null,
    rating: 5,
    content: "Nous avons testé 3 solutions d'IA avant Memo-IA. C'est de loin la plus adaptée aux marchés publics français. Les templates sont pertinents et la personnalisation est parfaite.",
    highlight: "Meilleure solution testée"
  },
  {
    name: "Nicolas Bernard",
    role: "Consultant Senior",
    company: "Stratégie & Marchés",
    image: null,
    rating: 5,
    content: "En tant que consultant, je recommande Memo-IA à tous mes clients PME. C'est l'outil indispensable pour être compétitif sur les marchés publics en 2025. Simple, efficace, et français.",
    highlight: "Recommandé par les consultants"
  }
]

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50/30 py-24 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Ils nous font confiance
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Découvrez comment Memo-IA transforme le quotidien de centaines d&apos;entreprises
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4"
        >
          {[
            { value: "500+", label: "Entreprises" },
            { value: "10k+", label: "Mémoires générés" },
            { value: "94%", label: "Satisfaction" },
            { value: "4.9/5", label: "Note moyenne" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full p-6 transition-all hover:shadow-lg dark:bg-slate-800">
                {/* Quote icon */}
                <Quote className="absolute right-6 top-6 h-8 w-8 text-purple-200 dark:text-purple-900" />

                {/* Stars */}
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Highlight */}
                <div className="mb-4 inline-block rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                  {testimonial.highlight}
                </div>

                {/* Author */}
                <div className="mt-4 flex items-center gap-3 border-t border-gray-200 pt-4 dark:border-gray-700">
                  {/* Avatar placeholder */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg font-bold text-white">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                    <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Rejoignez des centaines d&apos;entreprises qui gagnent plus de marchés{' '}
            <span className="font-semibold text-purple-600 dark:text-purple-400">
              avec Memo-IA
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
