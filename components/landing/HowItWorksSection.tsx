"use client";

import { motion, useScroll } from "framer-motion";
import { FileText, PenTool, Send, Sparkles } from "lucide-react";
import { useRef } from "react";

const steps = [
    {
        id: 1,
        title: "Importez votre DCE",
        description:
            "Glissez-déposez vos documents d'appel d'offres (CCTP, RC, etc.). Notre IA analyse instantanément les pièces du dossier pour en extraire les exigences clés.",
        icon: FileText,
        color: "bg-blue-500",
    },
    {
        id: 2,
        title: "L'IA génère le plan",
        description:
            "En quelques secondes, Memo-IA structure votre mémoire technique. Il identifie les points bloquants et vous propose un plan détaillé conforme aux attentes de l'acheteur.",
        icon: Sparkles,
        color: "bg-purple-500",
    },
    {
        id: 3,
        title: "Rédigez et personnalisez",
        description:
            "L'IA rédige les contenus techniques en s'appuyant sur votre base de connaissances. Vous gardez la main pour affiner et personnaliser les réponses.",
        icon: PenTool,
        color: "bg-pink-500",
    },
    {
        id: 4,
        title: "Exportez et envoyez",
        description:
            "Téléchargez votre mémoire technique parfaitement mis en page au format Word ou PDF, prêt à être signé et envoyé.",
        icon: Send,
        color: "bg-green-500",
    },
];

export function HowItWorksSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={containerRef} className="relative bg-background py-24 md:py-32">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                        Comment ça <span className="text-primary">marche</span> ?
                    </motion.h2>
                    <p className="text-lg text-muted-foreground">
                        Un processus simple et fluide pour passer de l&apos;appel d&apos;offres à la réponse gagnante.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connecting Line */}
                    <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block" />

                    {/* Progress Line */}
                    <motion.div
                        style={{ scaleY: scrollYProgress }}
                        className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 bg-primary -translate-x-1/2 origin-top hidden md:block"
                    />

                    <div className="space-y-12 md:space-y-32 relative">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 text-left md:text-right">
                                    <div className={`flex flex-col ${index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"}`}>
                                        <div className="flex items-center gap-4 mb-4 md:hidden">
                                            <div className={`flex items-center justify-center w-14 h-14 rounded-full ${step.color} text-white shadow-lg shadow-${step.color}/20`}>
                                                <step.icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-xl font-bold text-primary">0{step.id}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                        <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center Icon (Desktop) */}
                                <div className="relative z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-secondary shadow-xl">
                                    <div className={`w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white`}>
                                        <step.icon className="w-5 h-5" />
                                    </div>
                                </div>

                                {/* Visual Side (Placeholder for now, could be a screenshot) */}
                                <div className="flex-1 w-full">
                                    <div className="relative rounded-2xl overflow-hidden border border-border bg-card aspect-video shadow-2xl group hover:scale-105 transition-transform duration-500">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${step.color}/10 to-transparent opacity-50`} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <step.icon className={`w-16 h-16 ${step.color.replace('bg-', 'text-')} opacity-20`} />
                                        </div>

                                        {/* Fake UI Elements */}
                                        <div className="absolute top-4 left-4 right-4 h-2 bg-white/10 rounded-full w-1/3" />
                                        <div className="absolute top-8 left-4 right-4 h-2 bg-white/5 rounded-full w-1/2" />
                                        <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/10" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
