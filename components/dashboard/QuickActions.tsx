"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap, Plus, LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface QuickAction {
    title: string
    description: string
    icon: LucideIcon
    href: string
    primary?: boolean
}

interface QuickActionsProps {
    actions: QuickAction[]
}

export function QuickActions({ actions }: QuickActionsProps) {
    return (
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
                    {actions.map((action) => (
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
                                asChild
                            >
                                <Link href={action.href}>
                                    {action.primary && <Plus className="h-4 w-4" />}
                                    {action.primary ? "Create" : "View"}
                                </Link>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}
