"use client"

import { motion } from 'framer-motion'
import { Check, X, ArrowRight, Star, Zap, Building2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

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
    highlight: "border-border"
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
    highlight: "border-primary ring-1 ring-primary"
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
    highlight: "border-border"
  }
]

export function PricingSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden">
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-primary">
            TARIFS
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choisissez le plan qui vous convient
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Des solutions adaptées à chaque besoin, de l&apos;entrepreneur à la grande entreprise
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "relative flex flex-col",
                plan.popular ? 'lg:-mt-4 lg:mb-4' : ''
              )}
            >
              {/* Badge "POPULAIRE" */}
              {plan.popular && (
                <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
                  <div className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground shadow-lg">
                    ⭐ POPULAIRE
                  </div>
                </div>
              )}

              <Card
                className={cn(
                  "flex-1 flex flex-col transition-all duration-300 hover:shadow-2xl bg-card relative overflow-hidden",
                  plan.highlight,
                  plan.popular ? 'shadow-xl scale-105 z-10 border-primary/50' : 'hover:scale-105 border-border/50'
                )}
              >
                {plan.popular && (
                  <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                )}
                <CardHeader className="space-y-4 pb-8">
                  {/* Icône */}
                  <div className={cn(
                    "inline-flex h-12 w-12 items-center justify-center rounded-lg shadow-sm",
                    plan.popular ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  )}>
                    <plan.icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div>
                    <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                    <CardDescription className="mt-2 text-base text-muted-foreground">
                      {plan.description}
                    </CardDescription>
                  </div>

                  {/* Prix */}
                  <div className="flex items-baseline gap-1">
                    {plan.price === "Sur mesure" ? (
                      <p className="text-4xl font-bold tracking-tight text-foreground">
                        {plan.price}
                      </p>
                    ) : (
                      <>
                        <p className="text-4xl font-bold tracking-tight text-foreground">
                          {plan.price}€
                        </p>
                        <p className="text-lg text-muted-foreground">
                          {plan.period}
                        </p>
                      </>
                    )}
                  </div>

                  {/* Trial info */}
                  {plan.trial && (
                    <p className="text-sm font-medium text-primary">
                      {plan.trial}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4 pb-8 flex-1">
                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className={cn(
                          "flex items-start gap-3",
                          !feature.included && "opacity-50"
                        )}
                      >
                        {feature.included ? (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <Check className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                          </div>
                        ) : (
                          <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-muted">
                            <X className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                          </div>
                        )}
                        <p className="text-sm text-muted-foreground">
                          {feature.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto pt-8">
                  <Link href="/sign-up" className="w-full">
                    <Button
                      size="lg"
                      variant={plan.popular ? "default" : "outline"}
                      className={cn(
                        "w-full gap-2 font-semibold transition-all duration-200",
                        plan.popular && "shadow-md hover:shadow-lg"
                      )}
                    >
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
          <p className="text-sm text-muted-foreground">
            Tous les plans incluent : Mises à jour automatiques • Sécurité des données (RGPD) • Annulation à tout moment
          </p>
        </motion.div>
      </div>
    </section>
  )
}
