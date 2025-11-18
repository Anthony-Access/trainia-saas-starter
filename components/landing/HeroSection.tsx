"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Tag accroche */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
              APPELS D&apos;OFFRES & MÉMOIRES TECHNIQUES
            </p>
          </motion.div>

          {/* Titre principal avec effet pinceau */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-5xl text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            Gagnez vos{' '}
            <span className="relative inline-block px-1">
              <span className="relative z-10 text-white">marchés</span>
              {/* SVG Brush stroke effect - couvre tout le mot */}
              <svg
                className="absolute -inset-1 w-[115%] h-full -left-4"
                viewBox="0 0 200 100"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="brushGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" style={{ stopColor: '#9333ea', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#a855f7', stopOpacity: 1 }} />
                  </linearGradient>
                </defs>
                <path
                  d="M2,25 Q15,12 50,20 T100,26 Q145,30 180,18 T198,28 L199,72 Q180,85 145,75 T100,70 Q50,78 15,82 T2,70 Z"
                  fill="url(#brushGradient)"
                  opacity="0.95"
                />
              </svg>
            </span>{' '}
            avec l&apos;IA
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300"
          >
            Générez automatiquement vos mémoires techniques et réponses aux appels d&apos;offres.
            L&apos;intelligence artificielle au service de votre réussite.
          </motion.p>

          {/* Bouton CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="group gap-3 bg-white px-8 py-6 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
              >
                Démarrer gratuitement
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 transition-transform group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-white" />
                </span>
              </Button>
            </Link>
          </motion.div>

          {/* Info supplémentaire */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Aucune carte bancaire requise • Essai gratuit de 14 jours
          </motion.p>
        </div>
      </div>
    </section>
  )
}