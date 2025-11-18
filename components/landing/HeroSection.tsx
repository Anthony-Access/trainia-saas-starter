"use client"

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

      {/* Styles pour l'effet de pinceau */}
      <style jsx>{`
        .brush-highlight {
          position: relative;
          display: inline-block;
          padding: 0.1em 0.3em;
          z-index: 1;
        }

        .brush-highlight::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-1deg);
          width: calc(100% + 20px);
          height: 105%;
          background: linear-gradient(120deg, #A855F7 0%, #D946EF 50%, #EC4899 100%);
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          z-index: 0;
          box-shadow: 0 6px 25px rgba(168, 85, 247, 0.3);
          animation: brushPulse 3s ease-in-out infinite;
        }

        .brush-highlight > span {
          position: relative;
          z-index: 1;
        }

        @keyframes brushPulse {
          0%, 100% {
            transform: translate(-50%, -50%) rotate(-1deg) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) rotate(-1deg) scale(1.02);
          }
        }
      `}</style>

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

          {/* Titre principal sur deux lignes avec effet pinceau */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-6xl text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl lg:text-8xl"
          >
            <div className="leading-tight">Gagnez vos</div>
            <div className="leading-tight">
              <span className="brush-highlight">
                <span className="text-white">marchés</span>
              </span> avec l&apos;IA
            </div>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl"
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