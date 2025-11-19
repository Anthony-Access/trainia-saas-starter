"use client"

import { motion } from 'framer-motion'
import { Upload, Brain, Sliders, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const steps = [
  {
    number: 1,
    icon: Upload,
    title: "Importez votre appel d'offres",
    description: "Téléchargez votre cahier des charges au format PDF ou Word. Notre système extrait automatiquement les informations clés et les critères d'évaluation."
  },
  {
    number: 2,
    icon: Brain,
    title: "L'IA analyse les critères et exigences",
    description: "L'intelligence artificielle analyse en profondeur chaque exigence, identifie les points critiques et structure votre future réponse pour maximiser vos chances."
  },
  {
    number: 3,
    icon: Sliders,
    title: "Personnalisez votre réponse avec vos atouts",
    description: "Ajoutez vos points forts, vos références clients et vos spécificités. L'IA adapte le contenu à votre entreprise tout en gardant la cohérence rédactionnelle."
  },
  {
    number: 4,
    icon: Download,
    title: "Téléchargez votre mémoire technique finalisé",
    description: "Récupérez un document professionnel, structuré et conforme aux exigences. Prêt à être soumis ou à être enrichi par vos équipes."
  }
]

export function HowItWorks() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-850 dark:to-slate-800 overflow-hidden">
      {/* Grille en arrière-plan avec effet mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Effet de lueur gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-purple-600 dark:text-purple-400 mb-4">
            PROCESSUS SIMPLE ET RAPIDE
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Comment ça marche ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            De l&apos;import de votre cahier des charges à la génération du mémoire technique,
            tout se fait en quelques clics.
          </p>
        </motion.div>

        {/* Grille des étapes */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <Card className="h-full border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20 overflow-hidden">
                {/* Barre de gradient en haut */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500" />

                <CardHeader className="relative">
                  {/* Numéro de l'étape en grand */}
                  <div className="absolute -top-4 -right-4 text-[120px] font-bold text-gray-100 dark:text-gray-800 leading-none select-none opacity-50">
                    {step.number}
                  </div>

                  <div className="relative flex items-start gap-4">
                    {/* Icône avec gradient */}
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <step.icon className="h-7 w-7 text-white" strokeWidth={2.5} aria-hidden="true" />
                    </div>

                    <div className="flex-1">
                      {/* Badge avec numéro */}
                      <div className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 mb-3">
                        <span className="text-sm font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {step.number}
                        </span>
                      </div>

                      <CardTitle className="text-xl sm:text-2xl">
                        {step.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="relative">
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>

                {/* Ligne de connexion pour desktop (sauf dernière carte) */}
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 h-0.5">
                    <div className="w-full h-full bg-gradient-to-r from-purple-300 to-transparent dark:from-purple-600 dark:to-transparent" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Message de conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 px-6 py-3 border border-purple-200 dark:border-purple-800">
            <div className="flex h-2 w-2 items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              En moyenne, générez un mémoire technique complet en moins de 30 minutes
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
