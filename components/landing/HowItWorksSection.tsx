"use client"

import { motion } from 'framer-motion'
import { Upload, Wand2, FileCheck, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
    {
        id: "01",
        title: "Importez vos documents",
        description: "Déposez simplement votre DCE (Dossier de Consultation des Entreprises) ou CCTP. Nous supportons PDF, Word et Excel.",
        icon: Upload,
        color: "bg-blue-500/10 text-blue-600"
    },
    {
        id: "02",
        title: "L'IA analyse et rédige",
        description: "Nos algorithmes identifient les critères d'évaluation et génèrent une réponse structurée et personnalisée en quelques minutes.",
        icon: Wand2,
        color: "bg-purple-500/10 text-purple-600"
    },
    {
        id: "03",
        title: "Validez et exportez",
        description: "Relisez la proposition, ajustez si nécessaire grâce à l'éditeur intelligent, et exportez votre mémoire technique prêt à l'envoi.",
        icon: FileCheck,
        color: "bg-emerald-500/10 text-emerald-600"
    }
]

export function HowItWorksSection() {
    return (
        <section className="py-24 sm:py-32 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
                {/* Section Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-base font-semibold leading-7 text-primary uppercase tracking-wide"
                    >
                        Processus simple et rapide
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
                    >
                        Comment ça marche ?
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mt-6 text-lg leading-8 text-muted-foreground"
                    >
                        Une approche fluide en trois étapes pour transformer vos appels d'offres en succès.
                    </motion.p>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
                    {/* Connecting Line (Desktop only) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative flex flex-col items-center text-center group"
                        >
                            {/* Icon Circle */}
                            <div className={cn(
                                "w-24 h-24 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-background border border-border relative z-10",
                            )}>
                                <div className={cn("w-16 h-16 rounded-xl flex items-center justify-center", step.color)}>
                                    <step.icon className="w-8 h-8" />
                                </div>

                                {/* Step Number Badge */}
                                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm border-4 border-background">
                                    {step.id}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                {step.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {step.description}
                            </p>

                            {/* Arrow for mobile (except last item) */}
                            {index < steps.length - 1 && (
                                <div className="md:hidden mt-8 mb-4 text-muted-foreground/30">
                                    <ArrowRight className="w-6 h-6 rotate-90" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
