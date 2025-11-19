"use client"

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function CTASection() {
  const benefits = [
    "Aucune carte bancaire requise",
    "Essai gratuit de 14 jours",
    "Annulation à tout moment",
    "Accès à toutes les fonctionnalités",
  ]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-slate-50 dark:from-slate-900 dark:via-slate-850 dark:to-gray-800">
      {/* Grille en arrière-plan cohérente avec les autres sections */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_40%,transparent_100%)]" />

      {/* Effet de lueur gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Badge "Rejoignez-nous" */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
            Rejoignez-nous
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Prêt à révolutionner vos réponses aux appels d&apos;offres ?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Rejoignez les entreprises qui utilisent déjà Memo-IA pour générer leurs mémoires techniques et gagner des marchés.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="group gap-3 bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 px-8 py-6 text-base font-semibold text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
              >
                Démarrer gratuitement
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Button>
            </Link>

            <Link href="/sign-in">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 px-8 py-6 text-base font-semibold transition-all duration-200"
              >
                Se connecter
              </Button>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500">
                  <CheckCircle className="h-3.5 w-3.5 text-white" />
                </div>
                {benefit}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}