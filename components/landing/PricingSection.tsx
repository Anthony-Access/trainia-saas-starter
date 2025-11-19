"use client"

import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Star, Zap, Building2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const plans = [
  {
    name: "Starter",
    description: "Pour tester la puissance de l'IA",
    price: "49",
    period: "/mois",
    trial: "14 jours gratuits",
    icon: Zap,
    popular: false,
    features: [
      { text: "5 mémoires techniques par mois", included: true },
      { text: "Génération automatique de contenu", included: true },
      { text: "Analyse basique du cahier des charges", included: true },
      { text: "Export PDF standard", included: true },
      { text: "Support par email", included: true },
      { text: "Personnalisation avancée", included: false },
      { text: "Bibliothèque de modèles premium", included: false },
      { text: "Support prioritaire (réponse < 48h)", included: false },
    ],
    cta: "Commencer l'essai gratuit",
    highlight: "border-gray-200 dark:border-gray-700"
  },
  {
    name: "Professional",
    description: "Pour les PME et équipes commerciales",
    price: "149",
    period: "/mois",
    trial: null,
    icon: Star,
    popular: true,
    features: [
      { text: "25 mémoires techniques par mois", included: true },
      { text: "Génération automatique de contenu", included: true },
      { text: "Analyse approfondie du cahier des charges", included: true },
      { text: "Export PDF professionnel", included: true },
      { text: "Personnalisation avancée (charte graphique)", included: true },
      { text: "Bibliothèque de modèles premium", included: true },
      { text: "Support prioritaire (réponse < 48h)", included: true },
    ],
    cta: "Démarrer maintenant",
    highlight: "border-purple-500 dark:border-purple-400"
  },
  {
    name: "Enterprise",
    description: "Pour les grandes entreprises",
    price: "249",
    period: "/mois",
    trial: null,
    icon: Building2,
    popular: false,
    features: [
      { text: "50 mémoires techniques par mois", included: true },
      { text: "Génération automatique de contenu", included: true },
      { text: "Export multi-formats (PDF, Word, etc.)", included: true },
      { text: "Personnalisation complète", included: true },
      { text: "Bibliothèque de modèles illimitée", included: true },
      { text: "Support prioritaire (réponse < 24h)", included: true },
      { text: "Account manager dédié", included: true },
    ],
    cta: "Démarrer maintenant",
    highlight: "border-gray-200 dark:border-gray-700"
  }
]

export function PricingSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-br from-blue-50 via-slate-50 to-slate-100 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 overflow-hidden">
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            TARIFS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Choisissez le plan qui vous convient
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Des solutions adaptées à chaque besoin, de l&apos;entrepreneur à la grande entreprise
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative ${plan.popular ? 'lg:scale-105 lg:z-10' : ''}`}
            >
              {/* Badge "POPULAIRE" */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center">
                  <div className="rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg">
                    ⭐ POPULAIRE
                  </div>
                </div>
              )}

              <Card
                className={`h-full flex flex-col border-2 ${plan.highlight} bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? 'hover:shadow-purple-500/20 dark:hover:shadow-purple-500/30'
                    : 'hover:shadow-purple-500/10 dark:hover:shadow-purple-500/20'
                } ${plan.popular ? 'shadow-xl' : ''}`}
              >
                <CardHeader className="space-y-4 pb-8">
                  {/* Icône */}
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                    plan.popular
                      ? 'bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500'
                      : 'bg-gradient-to-br from-slate-500 to-blue-500'
                  } shadow-lg`}>
                    <plan.icon className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2 text-base">
                      {plan.description}
                    </CardDescription>
                  </div>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1">
                    {plan.price === "Sur mesure" ? (
                      <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {plan.price}
                      </p>
                    ) : (
                      <>
                        <p className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {plan.price}€
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          {plan.period}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Trial info */}
                  {plan.trial && (
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {plan.trial}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 pb-8">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={`flex items-start gap-3 ${
                          !feature.included ? 'opacity-50' : ''
                        }`}
                      >
                        {feature.included ? (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500">
                            <Check className="h-3.5 w-3.5 text-white" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                            <X className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {feature.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Link href="/sign-up" className="w-full">
                    <Button
                      size="lg"
                      className={`w-full gap-2 font-semibold transition-all duration-200 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 text-white hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105'
                          : 'bg-white text-gray-900 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700'
                      }`}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Garantie / Info supplémentaire */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Tous les plans incluent : Mises à jour automatiques • Sécurité des données (RGPD) • Annulation à tout moment
          </p>
        </motion.div>
      </div>
    </section>
  )
}
