'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'

const testimonials = [
  {
    name: "Marie Durand",
    role: "Directrice Commerciale",
    company: "BTP Solutions",
    image: null,
    rating: 5,
    content: "Memo-IA nous a fait gagner 15 heures par semaine sur la rédaction de mémoires techniques. Nous pouvons maintenant répondre à 3 fois plus d'appels d'offres sans recruter.",
    highlight: "15h gagnées par semaine"
  },
  {
    name: "Thomas Leroy",
    role: "Responsable Développement",
    company: "Ingénierie Conseil",
    image: null,
    rating: 5,
    content: "La qualité des mémoires générés est impressionnante. L'IA comprend vraiment les exigences et couvre tous les critères. Nous avons augmenté notre taux de succès de 35%.",
    highlight: "+35% de taux de succès"
  },
  {
    name: "Sophie Martin",
    role: "CEO",
    company: "Environnement+",
    image: null,
    rating: 5,
    content: "Avant Memo-IA, on passait 3 jours sur chaque mémoire. Maintenant, c'est fait en 30 minutes. Notre équipe se concentre enfin sur la stratégie.",
    highlight: "3 jours → 30 minutes"
  },
  {
    name: "Laurent Dubois",
    role: "Directeur des Opérations",
    company: "Services Publics Pro",
    image: null,
    rating: 5,
    content: "Le système de conformité automatique est un game-changer. Plus d'oublis de critères, plus de stress de dernière minute. Et le support client est excellent.",
    highlight: "Zéro oubli de critères"
  },
  {
    name: "Céline Robert",
    role: "Responsable Appels d'Offres",
    company: "Multiservices France",
    image: null,
    rating: 5,
    content: "Nous avons testé 3 solutions d'IA avant Memo-IA. C'est de loin la plus adaptée aux marchés publics français. Les templates sont pertinents.",
    highlight: "Meilleure solution testée"
  },
  {
    name: "Nicolas Bernard",
    role: "Consultant Senior",
    company: "Stratégie & Marchés",
    image: null,
    rating: 5,
    content: "En tant que consultant, je recommande Memo-IA à tous mes clients PME. C'est l'outil indispensable pour être compétitif sur les marchés publics en 2025.",
    highlight: "Recommandé par les consultants"
  }
]

export function TestimonialsSection() {
  return (
    <section className="relative w-full overflow-hidden bg-muted/50 py-24">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Ils nous font confiance
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Découvrez comment Memo-IA transforme le quotidien de centaines d&apos;entreprises
          </p>
        </motion.div>

        {/* Logos Cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-10 border-y border-border/50 py-8 bg-background/50 backdrop-blur-sm"
        >
          <p className="text-center text-sm font-medium text-muted-foreground mb-6">
            Plus de 500 entreprises innovantes nous font confiance
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="text-xl font-bold font-serif">Unsplash</span>
            <span className="text-xl font-bold font-mono">Notion</span>
            <span className="text-xl font-bold font-sans italic">INTERCOM</span>
            <span className="text-xl font-bold">descript</span>
            <span className="text-xl font-bold font-serif">grammarly</span>
            <span className="text-xl font-bold font-mono">Linear</span>
          </div>
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
            <div key={index} className="text-center p-6 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
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
              <Card className="relative h-full p-8 transition-all hover:shadow-lg bg-card border-border/50">
                {/* Quote icon */}
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />

                {/* Stars */}
                <div className="mb-6 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="mb-6 text-foreground leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Highlight */}
                <div className="mb-6 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {testimonial.highlight}
                </div>

                {/* Author */}
                <div className="mt-auto flex items-center gap-4 pt-4 border-t border-border/50">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <div className="font-semibold text-sm text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                    <div className="text-xs font-medium text-primary/80">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
