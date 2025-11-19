'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: "Est-ce que Memo-IA remplace mes équipes commerciales ?",
    answer: "Non, Memo-IA est un assistant qui accélère la rédaction de vos mémoires techniques. Vos équipes gardent le contrôle final et peuvent ajuster chaque section selon vos besoins. L'IA vous fait gagner 80% du temps de rédaction pour vous concentrer sur l'analyse et la stratégie."
  },
  {
    question: "Mes données et documents sont-ils sécurisés ?",
    answer: "Oui, absolument. Nous sommes conformes RGPD et toutes vos données sont chiffrées. Vos documents ne sont jamais utilisés pour entraîner l'IA et restent strictement confidentiels. Nous utilisons des serveurs sécurisés en Europe avec des audits de sécurité réguliers."
  },
  {
    question: "Comment fonctionne la génération automatique ?",
    answer: "C'est simple : 1) Vous uploadez le cahier des charges de l'appel d'offres. 2) Vous répondez à quelques questions sur votre entreprise. 3) L'IA génère un mémoire technique complet et conforme en 30 minutes. 4) Vous relisez et ajustez selon vos besoins."
  },
  {
    question: "Les mémoires générés sont-ils conformes aux exigences ?",
    answer: "Oui, Memo-IA analyse automatiquement tous les critères du cahier des charges et s'assure que chaque point est couvert. Nous avons un taux de conformité de 98% sur les critères obligatoires. Le système détecte les exigences cachées et les points de notation."
  },
  {
    question: "Puis-je personnaliser les mémoires générés ?",
    answer: "Absolument ! Chaque section peut être modifiée, réorganisée ou enrichie. Vous pouvez également sauvegarder vos propres templates et phrases types pour que l'IA les réutilise automatiquement dans vos futurs mémoires."
  },
  {
    question: "Combien de mémoires puis-je générer par mois ?",
    answer: "Cela dépend de votre plan : Plan Starter (5 mémoires/mois), Plan Professional (25 mémoires/mois), Plan Enterprise (illimité). Vous pouvez changer de plan à tout moment selon vos besoins."
  },
  {
    question: "Y a-t-il un engagement ou une période minimale ?",
    answer: "Non, aucun engagement. Vous pouvez annuler votre abonnement à tout moment. L'essai gratuit de 14 jours ne nécessite pas de carte bancaire et vous permet de tester toutes les fonctionnalités."
  },
  {
    question: "Comment se passe l'essai gratuit ?",
    answer: "L'essai gratuit de 14 jours vous donne accès à toutes les fonctionnalités du plan Professional. Aucune carte bancaire n'est requise. Vous pouvez générer jusqu'à 3 mémoires pendant la période d'essai pour tester la qualité."
  },
  {
    question: "Qu'est-ce qui se passe avec mes documents après résiliation ?",
    answer: "Vous gardez l'accès à tous vos documents pendant 30 jours après résiliation. Vous pouvez les télécharger à tout moment. Après 30 jours, vos données sont définitivement supprimées conformément au RGPD."
  },
  {
    question: "Proposez-vous une formation ou du support ?",
    answer: "Oui ! Chaque nouvel utilisateur bénéficie d'un onboarding personnalisé. Notre équipe support est disponible en français par chat, email et téléphone du lundi au vendredi. Nous proposons également des webinaires mensuels pour partager les best practices."
  }
]

export function FAQSection() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-24 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Questions fréquentes
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Vous avez des questions ? Nous avons les réponses.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-lg border border-gray-200 bg-white px-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-slate-800"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-purple-600 dark:text-white dark:hover:text-purple-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400">
            Vous avez d'autres questions ?{' '}
            <a
              href="/contact"
              className="font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300"
            >
              Contactez-nous →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
