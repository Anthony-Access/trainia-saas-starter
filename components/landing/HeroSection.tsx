"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background pt-0 pb-20 lg:pt-0 lg:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto -mt-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 backdrop-blur-sm border border-border/50 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              L&apos;IA générative pour les appels d&apos;offres
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-6 text-balance"
          >
            Gagnez vos appels d&apos;offres avec{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient bg-300%">
              l&apos;Intelligence Artificielle
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl text-balance leading-relaxed"
          >
            Memo-IA analyse vos documents, rédige vos mémoires techniques et optimise vos chances de succès.
            Une solution entreprise pour les équipes exigeantes.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)]"
              asChild
            >
              <Link href="/sign-up">
                <span className="relative z-10 flex items-center gap-2">
                  Commencer gratuitement
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 h-12 text-base hover:bg-secondary/80 transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                Voir une démo
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          style={{ y }}
          className="mt-20 relative mx-auto max-w-6xl perspective-1000"
        >
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden transform rotate-x-12 transition-transform duration-1000 hover:rotate-x-0">
            {/* Mockup Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <div className="ml-4 h-2 w-32 rounded-full bg-white/10" />
            </div>

            {/* Mockup Content */}
            <div className="p-6 grid grid-cols-12 gap-6 h-[400px] md:h-[600px] bg-gradient-to-b from-background/50 to-background">
              {/* Sidebar */}
              <div className="hidden md:block col-span-2 space-y-4">
                <div className="h-8 w-full rounded-lg bg-white/5" />
                <div className="h-4 w-3/4 rounded bg-white/5" />
                <div className="h-4 w-1/2 rounded bg-white/5" />
                <div className="h-4 w-2/3 rounded bg-white/5" />
              </div>

              {/* Main Content */}
              <div className="col-span-12 md:col-span-10 space-y-6">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-1/3 rounded-lg bg-white/10" />
                  <div className="h-8 w-24 rounded-lg bg-primary/20" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
                    <div className="h-8 w-8 rounded-full bg-primary/20 mb-4" />
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                  </div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
                    <div className="h-8 w-8 rounded-full bg-blue-500/20 mb-4" />
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                  </div>
                  <div className="h-32 rounded-xl bg-white/5 border border-white/5 p-4">
                    <div className="h-8 w-8 rounded-full bg-green-500/20 mb-4" />
                    <div className="h-4 w-1/2 rounded bg-white/10" />
                  </div>
                </div>

                <div className="h-64 rounded-xl bg-white/5 border border-white/5 p-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-blue-500/5" />
                  <div className="text-muted-foreground/50">Analyse en cours...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Glow Effect behind mockup */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-xl blur-3xl opacity-20 -z-10" />
        </motion.div>
      </div>
    </section>
  );
}