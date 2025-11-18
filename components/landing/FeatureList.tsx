"use client"

import { motion } from 'framer-motion'
import { Brain, Zap, Shield, TrendingUp, Clock, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    icon: Brain,
    title: "AI-Powered Intelligence",
    description: "Leverage cutting-edge artificial intelligence to make smarter business decisions and automate complex workflows."
  },
  {
    icon: Zap,
    title: "Lightning Fast Automation",
    description: "Process tasks in seconds that would normally take hours, freeing up your team to focus on high-value work."
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Bank-level encryption and security measures to keep your sensitive business data protected at all times."
  },
  {
    icon: TrendingUp,
    title: "Boost Productivity",
    description: "Increase operational efficiency by up to 80% with intelligent process automation and workflow optimization."
  },
  {
    icon: Clock,
    title: "24/7 Operations",
    description: "Keep your business running round-the-clock with automated workflows that work while you sleep."
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Empower your entire team with intuitive tools that enhance collaboration and streamline communication."
  }
]

export function FeatureList() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Pourquoi choisir Memo-IA ?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Des fonctionnalités puissantes pour générer vos documents professionnels
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-200 bg-white/50 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/50">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}