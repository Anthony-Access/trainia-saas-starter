"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-950 to-black z-0" />

      {/* Abstract Shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-foreground border border-primary/20 mb-8 backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            <span>Offre de lancement limitée</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-8 leading-tight">
            Prêt à révolutionner vos réponses aux appels d&apos;offres ?
          </h2>

          <p className="text-lg leading-8 text-gray-300 mb-10 max-w-2xl mx-auto">
            Rejoignez les entreprises qui gagnent plus de marchés en y passant moins de temps.
            Essai gratuit de 14 jours, sans carte bancaire.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="text-lg px-8 py-6 h-auto rounded-full bg-white text-[#2e1065] hover:bg-gray-100 font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Commencer gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 h-auto rounded-full border-white/20 text-white hover:bg-white/10 hover:text-white font-medium backdrop-blur-sm">
                Réserver une démo
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-400">
            Pas de carte requise • Annulation à tout moment
          </p>
        </motion.div>
      </div>
    </section>
  )
}