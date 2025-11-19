"use client"

import { motion } from 'framer-motion'
import { Clock, Target, CheckCircle, FileText, Zap, Globe } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Clock,
    title: "Réduisez vos délais de 80%",
    description: "Générez automatiquement vos mémoires techniques en quelques minutes au lieu de plusieurs jours. Concentrez-vous sur la stratégie commerciale pendant que l'IA rédige vos réponses."
  },
  {
    icon: Target,
    title: "Maximisez vos chances de succès",
    description: "Améliorez la qualité et la pertinence de vos réponses grâce à une analyse approfondie des critères d'évaluation. Présentez des propositions structurées qui répondent précisément aux attentes du donneur d'ordre."
  },
  {
    icon: CheckCircle,
    title: "Conformité garantie aux exigences",
    description: "L'IA analyse automatiquement chaque critère du cahier des charges et s'assure qu'aucune exigence n'est oubliée. Éliminez les risques de non-conformité administrative."
  },
  {
    icon: FileText,
    title: "Cohérence professionnelle",
    description: "Maintenez une qualité rédactionnelle et une mise en page homogènes sur tous vos documents. Renforcez votre image de marque avec des mémoires techniques soignés et structurés."
  },
  {
    icon: Zap,
    title: "Génération automatique instantanée",
    description: "Votre mémoire technique créé automatiquement en quelques minutes seulement. Plus besoin de passer des heures à rédiger, l'IA s'occupe de tout."
  },
  {
    icon: Globe,
    title: "Disponible 24h/24, 7j/7",
    description: "Accédez à Memo-IA à tout moment, où que vous soyez. Répondez aux appels d'offres même en dehors des horaires de bureau, sans contrainte."
  }
]

export function FeatureList() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 dark:from-slate-800 via-slate-850 dark:to-slate-900 overflow-hidden">
      {/* Grille en arrière-plan avec effet mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Pourquoi choisir Memo-IA ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Des fonctionnalités puissantes pour générer vos documents professionnels
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group"
            >
              <Card className="h-full border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}