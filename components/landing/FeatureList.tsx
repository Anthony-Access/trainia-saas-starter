"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Brain,
  Clock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const features = [
  {
    title: "Analyse IA Avancée",
    description:
      "Notre IA décortique vos appels d'offres pour identifier les points clés et les critères d'évaluation.",
    icon: Brain,
    className: "md:col-span-2",
  },
  {
    title: "Rédaction Automatisée",
    description:
      "Générez des réponses complètes et structurées en quelques secondes.",
    icon: Sparkles,
    className: "md:col-span-1",
  },
  {
    title: "Gain de Temps",
    description: "Réduisez votre temps de rédaction par 10.",
    icon: Clock,
    className: "md:col-span-1",
  },
  {
    title: "Conformité Totale",
    description: "Vérification automatique des exigences du DCE.",
    icon: ShieldCheck,
    className: "md:col-span-2",
  },
  {
    title: "Tableaux de Bord",
    description: "Suivez vos performances et optimisez vos taux de succès.",
    icon: BarChart3,
    className: "md:col-span-3",
  },
];

export function FeatureList() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Tout ce dont vous avez besoin pour <span className="text-primary">gagner</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Une suite d&apos;outils puissants pour optimiser chaque étape de votre réponse aux appels d&apos;offres.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>

                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
