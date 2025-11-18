import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'
import ClerkClientProvider from '@/components/providers/clerk-client-provider'
import { Header } from '@/components/layout/Header'
import { validateEnvironmentVariables } from '@/utils/env-validation'

// ✅ SECURITY: Validate environment variables on server startup
// This prevents deployment with misconfigured or placeholder values
if (typeof window === 'undefined') {
  validateEnvironmentVariables()
}

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Train-IA - Automate Your Business Processes',
  description: 'Transform your company with AI. Eliminate repetitive tasks, optimize your processes and save time with AI and automation.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkClientProvider>
          <TanstackClientProvider>
            <Header />
            <main>{children}</main>
          </TanstackClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  )
}
