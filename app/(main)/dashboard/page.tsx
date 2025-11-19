"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  Bot,
  Clock,
  TrendingUp,
  Users,
  HelpCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StatsGrid } from '@/components/dashboard/StatsGrid'
import { QuickActions } from '@/components/dashboard/QuickActions'
import { AccountStatus } from '@/components/dashboard/AccountStatus'

interface DashboardStats {
  automations: number
  timeSaved: string
  efficiency: string
  teamMembers: number
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [stats, setStats] = useState<DashboardStats>({
    automations: 0,
    timeSaved: "0 hours",
    efficiency: "0%",
    teamMembers: 1
  })

  // ✅ SECURITY: Middleware already protects this route - no client-side redirect needed
  // This prevents redundant checks and improves performance

  useEffect(() => {
    // Simulate loading dashboard data
    if (isLoaded && user) {
      setStats({
        automations: 0,
        timeSaved: "0 hours",
        efficiency: "Ready to start",
        teamMembers: 1
      })
    }
  }, [isLoaded, user])

  // Show loading state while checking auth or redirecting
  if (!isLoaded || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const firstName = user?.firstName || user?.username || 'there'

  const quickActions = [
    {
      title: "Create Your First Automation",
      description: "Set up your first AI-powered workflow",
      icon: Bot,
      href: "/automations/new",
      primary: true
    },
    {
      title: "Invite Team Members",
      description: "Collaborate with your team",
      icon: Users,
      href: "/settings/team"
    },
    {
      title: "View Documentation",
      description: "Learn how to maximize Memo-IA",
      icon: HelpCircle,
      href: "/docs"
    }
  ]

  const statCards = [
    {
      title: "Active Automations",
      value: stats.automations.toString(),
      description: "Workflows currently running",
      icon: Bot,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Time Saved",
      value: stats.timeSaved,
      description: "Hours automated this month",
      icon: Clock,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      title: "Efficiency Boost",
      value: stats.efficiency,
      description: "Productivity improvement",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Team Members",
      value: stats.teamMembers.toString(),
      description: "Active collaborators",
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/30"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Welcome back, {firstName}!
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Prêt à générer vos appels d&apos;offres et mémoires techniques ?
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Badge variant="secondary" className="text-sm">
                Free Trial
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <StatsGrid stats={statCards} />

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Account Status */}
          <AccountStatus />
        </div>

        {/* Getting Started */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8"
        >
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:border-blue-800 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    Nouveau sur Memo-IA ?
                  </h3>
                  <p className="mt-1 text-blue-700 dark:text-blue-300">
                    Consultez notre guide de démarrage pour apprendre les bases et générer votre premier document.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/30">
                    View Guide
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}