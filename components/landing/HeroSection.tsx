"use client"

import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-20 lg:pt-24">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      {/* Styles pour l'effet de pinceau */}
      <style jsx>{`
        .brush-highlight {
          position: relative;
          display: inline-block;
          padding: 0.05em 0.2em;
          z-index: 1;
        }

        .brush-highlight::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-1deg);
          width: 100%;
          height: 90%;
          background: linear-gradient(120deg, #A855F7 0%, #D946EF 50%, #EC4899 100%);
          border-radius: 4px;
          z-index: -1;
          opacity: 0.2;
          transition: opacity 0.3s ease;
        }
        
        .brush-highlight:hover::before {
            opacity: 0.4;
        }

        .brush-stroke-path {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            animation: dash 1.5s ease-out forwards;
        }

        @keyframes dash {
            to {
                stroke-dashoffset: 0;
            }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Column: Text Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Nouvelle version 2.0 disponible
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6 leading-[1.1]">
                Gagnez vos <br />
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10">marchés publics</span>
                  <svg className="absolute -bottom-2 left-0 -z-10 h-4 w-full text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" className="brush-stroke-path" />
                  </svg>
                </span>
                <br />
                avec l&apos;IA
              </h1>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                La première plateforme d&apos;intelligence artificielle conçue pour les PME qui veulent tripler leur taux de réussite aux appels d&apos;offres sans recruter d&apos;expert.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link href="/sign-up">
                  <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                    Démarrer gratuitement
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Voir la démo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Pas de carte requise</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>14 jours d&apos;essai</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Support français</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Visual/Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-lg bg-background shadow-sm ring-1 ring-gray-900/5 overflow-hidden aspect-[4/3] relative">
                {/* Abstract Dashboard Representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6 flex flex-col gap-4">
                  {/* Header */}
                  <div className="h-8 w-full flex items-center justify-between border-b pb-4">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 grid grid-cols-12 gap-4">
                    <div className="col-span-3 bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-4 space-y-3">
                      <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded"></div>
                      <div className="h-3 w-full bg-slate-50 dark:bg-slate-700/50 rounded"></div>
                      <div className="h-3 w-20 bg-slate-50 dark:bg-slate-700/50 rounded"></div>
                    </div>
                    <div className="col-span-9 bg-white dark:bg-slate-800 rounded-lg border shadow-sm p-6">
                      <div className="flex justify-between items-center mb-6">
                        <div className="h-5 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-8 w-24 bg-primary/10 rounded text-primary flex items-center justify-center text-xs font-medium">Génération...</div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-4 w-[90%] bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-4 w-[95%] bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-xl border border-border flex items-center gap-3 animate-bounce-slow">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">Mémoire généré</div>
                  <div className="text-xs text-muted-foreground">Il y a 2 minutes</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Proof / Trusted By */}
        <div className="mt-20 border-t pt-10">
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Ils nous font confiance pour leurs appels d&apos;offres
          </p>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5 opacity-60 grayscale transition-all hover:grayscale-0 hover:opacity-100">
            {/* Placeholder Logos - Replace with real ones or SVGs */}
            {['Acme Corp', 'Global Tech', 'BuildMaster', 'EcoEnergy', 'UrbanPlan'].map((company) => (
              <div key={company} className="flex items-center justify-center">
                <span className="text-lg font-bold text-slate-400">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}