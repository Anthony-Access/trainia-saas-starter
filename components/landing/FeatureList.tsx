
"use client"

import { motion } from 'framer-motion'
import { Clock, Target, CheckCircle, FileText, Zap, Globe, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: Clock,
    title: "Réduisez vos délais de 80%",
    description: "Générez automatiquement vos mémoires techniques en quelques minutes. L'IA rédige pendant que vous affinez votre stratégie.",
    className: "md:col-span-2",
    gradient: "from-blue-500/20 to-indigo-500/20"
  },
  {
    icon: Target,
    title: "Maximisez vos chances",
    description: "Analyse approfondie des critères pour des réponses parfaitement ciblées.",
    className: "md:col-span-1",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    icon: CheckCircle,
    title: "Conformité garantie",
    description: "Analyse automatique du DCE pour n'oublier aucune exigence technique ou administrative.",
    className: "md:col-span-1",
    gradient: "from-orange-500/20 to-amber-500/20"
  },
  {
    icon: FileText,
    title: "Cohérence professionnelle",
    description: "Une image de marque irréprochable avec une mise en page et un ton uniformes sur tous vos documents.",
    className: "md:col-span-2",
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    icon: Zap,
    title: "Génération instantanée",
    description: "Plus de page blanche. Obtenez une première version complète en un clic.",
    className: "md:col-span-1",
    gradient: "from-cyan-500/20 to-sky-500/20"
  },
  {
    icon: Globe,
    title: "Disponible 24/7",
    description: "Votre expert en appels d'offres est disponible à tout moment, sans contrainte horaire.",
    className: "md:col-span-2 lg:col-span-3", // Full width at bottom
    gradient: "from-slate-500/20 to-gray-500/20"
  }
]

export function FeatureList() {
  return (
    <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Productivité</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tout ce dont vous avez besoin pour gagner
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Une suite d&apos;outils complète conçue pour les entreprises qui veulent passer à la vitesse supérieure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300",
                feature.className
              )}
            >
              {/* Gradient Background Hover Effect */}
              <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                feature.gradient
              )} />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="mb-4">
                  <div className="inline-flex rounded-xl bg-primary/10 p-3 mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  En savoir plus <ArrowUpRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
