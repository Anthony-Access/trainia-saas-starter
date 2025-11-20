"use client"

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "Est-ce compatible avec tous les secteurs d'activité ?",
    answer: "Oui, Memo-IA est conçu pour s'adapter à tous les secteurs (BTP, Services, Informatique, Formation, etc.). Notre IA analyse le contexte spécifique de chaque appel d'offres pour générer une réponse pertinente."
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Absolument. La sécurité est notre priorité. Vos données sont chiffrées de bout en bout et hébergées sur des serveurs sécurisés en Europe (RGPD). Nous n'utilisons pas vos données pour entraîner nos modèles publics."
  },
  {
    question: "Puis-je personnaliser les modèles de réponse ?",
    answer: "Oui, vous pouvez importer vos propres documents de référence et définir votre ton de communication. L'IA apprendra de votre style pour produire des contenus qui vous ressemblent."
  },
  {
    question: "Quelle est la durée d'engagement ?",
    answer: "Nos offres sont sans engagement de durée. Vous pouvez annuler votre abonnement à tout moment depuis votre espace client. L'accès s'arrêtera à la fin de la période facturée."
  },
  {
    question: "Proposez-vous un accompagnement au démarrage ?",
    answer: "Oui, tous nos plans incluent un accès à notre centre d'aide. Les plans Professional et Enterprise bénéficient en plus d'un onboarding personnalisé pour configurer votre espace de travail."
  }
]

export function FaqSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tout ce que vous devez savoir pour démarrer avec Memo-IA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
