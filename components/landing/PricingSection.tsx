"use client";

import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { MouseEvent } from "react";

const plans = [
  {
    name: "Starter",
    price: "49€",
    period: "/mois",
    description: "Pour les indépendants et TPE qui débutent.",
    features: [
      "5 mémoires techniques / mois",
      "Analyse IA basique",
      "Export PDF",
      "Support email",
    ],
    cta: "Commencer",
    popular: false,
  },
  {
    name: "Pro",
    price: "149€",
    period: "/mois",
    description: "Pour les PME en croissance.",
    features: [
      "20 mémoires techniques / mois",
      "Analyse IA avancée",
      "Personnalisation complète",
      "Export Word & PDF",
      "Support prioritaire",
    ],
    cta: "Essayer gratuitement",
    popular: true,
  },
  {
    name: "Business",
    price: "299€",
    period: "/mois",
    description: "Pour les agences et équipes performantes.",
    features: [
      "Mémoires illimités",
      "Analyse IA experte",
      "Multi-utilisateurs (5)",
      "API access",
      "Account Manager dédié",
    ],
    cta: "Commencer",
    popular: false,
  },
];

function PricingCard({ plan }: { plan: typeof plans[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative rounded-3xl border border-border bg-card px-8 py-12 shadow-2xl transition-transform duration-300 hover:-translate-y-2 ${plan.popular ? "ring-1 ring-primary/50" : ""
        }`}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(124, 58, 237, 0.15),
              transparent 80%
            )
          `,
        }}
      />

      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white shadow-lg shadow-primary/30">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Le plus populaire
          </span>
        </div>
      )}

      <div className="relative z-10 flex flex-col h-full">
        <h3 className="text-xl font-semibold leading-7 text-foreground">
          {plan.name}
        </h3>
        <p className="mt-4 flex items-baseline gap-x-2">
          <span className="text-5xl font-bold tracking-tight text-foreground">
            {plan.price}
          </span>
          <span className="text-base text-muted-foreground">{plan.period}</span>
        </p>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          {plan.description}
        </p>
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground flex-1">
          {plan.features.map((feature) => (
            <li key={feature} className="flex gap-x-3">
              <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button
            className={`w-full rounded-full h-12 text-base ${plan.popular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
            asChild
          >
            <Link href="/sign-up">{plan.cta}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Des tarifs <span className="text-primary">transparents</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            Choisissez le plan qui correspond à vos ambitions. Sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard plan={plan} />
            </motion.div>
          ))}
        </div>

        {/* Enterprise / Custom Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm"
        >
          <h3 className="text-2xl font-bold mb-4">Besoin d&apos;une offre sur mesure ?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Pour les grandes entreprises nécessitant un volume important, des intégrations spécifiques ou un accompagnement personnalisé.
          </p>
          <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <Link href="/contact">Contacter notre équipe commerciale</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
