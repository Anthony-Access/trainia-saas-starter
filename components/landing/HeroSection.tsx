"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Play, CheckCircle2, TrendingUp, CreditCard, Send } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-16 lg:pt-32 lg:pb-24">
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
              We’re here to Increase your{' '}
              <span className="relative inline-block text-primary">
                Productivity
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
              Let&apos;s make your work more organized and easy using the Memo-IA Dashboard with many of the latest features in managing work every day.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-12">
              {/* Primary Button - Pill Shape */}
              <Link
                href="/sign-up"
                className="rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                Try free trial
              </Link>

              {/* Secondary Button - Play Icon */}
              <button className="group flex items-center gap-3 text-base font-medium text-foreground hover:text-primary transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background shadow-sm group-hover:border-primary group-hover:text-primary transition-colors">
                  <Play className="h-4 w-4 fill-current" />
                </div>
                View Demo
              </button>
            </div>

            {/* Social Proof - Logos */}
            <div className="space-y-4">
              <p className="text-sm font-medium text-muted-foreground">
                More than 25,000 teams use Memo-IA
              </p>
              <div className="flex flex-wrap items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder Logos (Text for now, can be replaced with SVGs) */}
                <span className="text-xl font-bold font-serif">Unsplash</span>
                <span className="text-xl font-bold font-mono">Notion</span>
                <span className="text-xl font-bold font-sans italic">INTERCOM</span>
                <span className="text-xl font-bold">descript</span>
                <span className="text-xl font-bold font-serif">grammarly</span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Floating UI Composition */}
          <div className="relative h-[600px] w-full hidden lg:block">
            {/* Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-[3rem] rotate-12" />

            {/* Main Subject Placeholder (Person) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] h-[550px] bg-gradient-to-b from-gray-200 to-gray-300 rounded-t-[3rem] overflow-hidden shadow-2xl">
              {/* Placeholder for Image */}
              <div className="w-full h-full flex items-end justify-center pb-10">
                <span className="text-gray-400 font-medium">Person Image Placeholder</span>
              </div>
            </div>

            {/* Floating Element 1: Income Card (Top Right) */}
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
                  <p className="text-xs text-muted-foreground">Total Income</p>
                  <p className="text-lg font-bold text-foreground">$450.00</p>
                </div>
              </div>
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-green-500" />
              </div>
            </motion.div>

            {/* Floating Element 2: Credit Card (Bottom Right) */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-32 -right-4 bg-gradient-to-br from-gray-900 to-gray-800 p-5 rounded-2xl shadow-2xl w-64 z-20 text-white rotate-[-5deg]"
            >
              <div className="flex justify-between items-start mb-6">
                <CreditCard className="h-6 w-6 text-white/80" />
                <div className="h-6 w-10 bg-white/20 rounded" />
              </div>
              <div className="space-y-1">
                <p className="text-xs text-white/60">Balance</p>
                <p className="text-xl font-bold">$245.00</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  <div className="h-6 w-6 rounded-full bg-red-400 border border-gray-800" />
                  <div className="h-6 w-6 rounded-full bg-yellow-400 border border-gray-800" />
                </div>
                <p className="text-xs text-white/60">**** 1234</p>
              </div>
            </motion.div>

            {/* Floating Element 3: Sent Message (Left) */}
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-40 left-0 bg-card border border-border p-3 rounded-2xl shadow-lg flex items-center gap-3 z-10"
            >
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Payment Sent</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </motion.div>

            {/* Floating Element 4: Small Badge (Bottom Left) */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-10 bg-white p-2 rounded-lg shadow-md z-10"
            >
              <Send className="h-5 w-5 text-primary" />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}