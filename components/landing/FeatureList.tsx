
"use client"

import { motion } from 'framer-motion'
import { Clock, Target, CheckCircle, FileText, Zap, Globe } from 'lucide-react'
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* LEFT COLUMN: Content & Stats */}
          <div className="flex flex-col justify-center h-full">
            <div className="mb-8">
              <h2 className="text-base font-semibold leading-7 text-primary uppercase tracking-wide">Productivité</h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-foreground sm:text-5xl leading-tight">
                Tout ce dont vous avez besoin pour gagner
              </p>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Une suite d&apos;outils complète conçue pour les entreprises qui veulent passer à la vitesse supérieure.
                Générez vos mémoires techniques en un temps record et concentrez-vous sur l&apos;essentiel : votre expertise.
              </p>
            </div>

            {/* Trust / Stats Block */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className={`h-10 w-10 rounded-full border-2 border-background bg-gray-200 flex items-center justify-center overflow-hidden`}>
                      {/* Placeholder avatars */}
                      <div className={`w-full h-full bg-gradient-to-br from-purple-${i}00 to-indigo-${i}00 opacity-80`} />
                    </div>
                  ))}
                  <div className="h-10 w-10 rounded-full border-2 border-background bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                    +2k
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-foreground">4.9</span>
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">Note moyenne des utilisateurs</span>
                </div>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">80%</p>
                  <p className="text-sm text-muted-foreground">Gain de temps</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">24/7</p>
                  <p className="text-sm text-muted-foreground">Disponibilité</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
                )}
              >
                <div className="mb-4">
                  <div className="inline-flex rounded-lg bg-primary/10 p-2.5 text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
