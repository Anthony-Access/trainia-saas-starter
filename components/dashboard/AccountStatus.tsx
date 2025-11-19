"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, CreditCard, Settings } from 'lucide-react'

export function AccountStatus() {
    return (
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
    )
}
