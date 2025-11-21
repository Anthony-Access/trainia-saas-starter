"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, CheckCircle2, TrendingUp, FileText, Zap } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 pb-16 lg:pt-32 lg:pb-24 dark:from-gray-950 dark:via-gray-900 dark:to-purple-950/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">

          {/* LEFT COLUMN: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center text-left"
          >
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl mb-6 leading-[1.1]">
              Remportez plus d&apos;
              <span className="relative inline-block text-primary">
                Appels d&apos;Offres
                {/* Wavy Underline SVG - Purple */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-primary/80"
                  viewBox="0 0 100 10"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 5 Q 50 10 100 5"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Générez des mémoires techniques sur-mesure, conformes et convaincants en quelques clics. Ne perdez plus de temps sur la rédaction, concentrez-vous sur votre expertise.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-12">
              {/* Primary Button - Pill Shape */}
              <Link
                href="/sign-up"
                className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Essayer gratuitement
              </Link>

              {/* Secondary Button - Play Icon */}
              <button className="group flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                Voir la démo
              </button>
            </div>

            {/* Social Proof - Logos */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                Déjà adopté par plus de 500 entreprises
              </p>
              <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Logos Clients */}
                <div className="flex items-center gap-2 font-bold text-xl">
                  <div className="h-8 w-8 bg-foreground rounded-sm" />
                  <span>EIFFAGE</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl font-serif">
                  <div className="h-8 w-8 bg-foreground rounded-full" />
                  <span>VINCI</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl italic">
                  <div className="h-8 w-8 bg-foreground rotate-45 rounded-sm" />
                  <span>BOUYGUES</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl">
                  <div className="h-8 w-8 bg-foreground rounded-tr-xl rounded-bl-xl" />
                  <span>SPIE</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-xl font-mono">
                  <div className="h-8 w-8 bg-foreground rounded-full border-4 border-background" />
                  <span>ENGIE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Floating UI Composition */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-[3rem] rotate-12" />

            {/* Main Subject Placeholder (Person) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[550px] rounded-t-[3rem] overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="/dashboard-mockup.png"
                alt="Interface Memo-IA"
                className="w-full h-full object-cover object-top bg-gray-900"
              />
              {/* Gradient Overlay at bottom to blend */}
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-900 to-transparent" />
            </div>

            {/* Floating Element 1: Success Rate (Top Right) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-10 bg-card border border-border p-4 rounded-2xl shadow-xl w-48 z-10"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Taux de réussite</p>
                  <p className="text-lg font-bold text-foreground">+ 45%</p>
                </div>
              </div>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-green-500" />
              </div>
            </motion.div>

            {/* Floating Element 2: Time Saved (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 -right-4 bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl shadow-2xl w-64 z-20 text-white rotate-[-5deg]"
            >
              <div className="flex justify-between items-start mb-6">
                <Zap className="h-6 w-6 text-yellow-400" />
                <div className="h-6 w-10 bg-white/20 rounded" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-white/60">Temps gagné</p>
                <p className="text-xl font-bold">15h / semaine</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-blue-400 border border-gray-800" />
                  <div className="h-6 w-6 rounded-full bg-purple-400 border border-gray-800" />
                </div>
                <p className="text-xs text-white/60">Équipe commerciale</p>
              </div>
            </motion.div>

            {/* Floating Element 3: Proposal Generated (Left) */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-40 left-0 bg-card border border-border p-3 rounded-2xl shadow-lg flex items-center gap-3 z-10"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Mémoire généré</p>
                <p className="text-xs text-muted-foreground">À l&apos;instant</p>
              </div>
            </motion.div>

            {/* Floating Element 4: Small Badge (Bottom Left) */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-10 bg-white p-2 rounded-lg shadow-md z-10"
            >
              <FileText className="h-5 w-5 text-primary" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}