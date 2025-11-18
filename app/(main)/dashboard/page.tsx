"use client"

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  Bot,
  Clock,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Plus,
  Settings,
  CreditCard,
  HelpCircle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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
                Prêt à générer vos appels d'offres et mémoires techniques ?
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Get started with these common tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action) => (
                  <div
                    key={action.title}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
                        <action.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {action.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={action.primary ? "default" : "outline"}
                      size="sm"
                      className="gap-2"
                    >
                      {action.primary && <Plus className="h-4 w-4" />}
                      {action.primary ? "Create" : "View"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card className="border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Plan
                  </span>
                  <Badge variant="secondary">Free Trial</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Status
                  </span>
                  <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    Active
                  </Badge>
                </div>
                <div className="pt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <CreditCard className="h-4 w-4" />
                    Upgrade Plan
                  </Button>
                  <Button variant="ghost" size="sm" className="w-full gap-2">
                    <Settings className="h-4 w-4" />
                    Account Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
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