import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TanstackClientProvider from '@/components/providers/tanstack-client-provider'
import ClerkClientProvider from '@/components/providers/clerk-client-provider'
import SmoothScroll from '@/components/providers/SmoothScroll'
import { Header } from '@/components/layout/Header'
import { validateEnvironmentVariables } from '@/lib/security/validation/env'

// ✅ SECURITY: Validate environment variables on server startup
// This prevents deployment with misconfigured or placeholder values
if (typeof window === 'undefined') {
  validateEnvironmentVariables()
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Memo-IA - Génération Automatique d\'Appels d\'Offres et Mémoires Techniques',
    template: '%s | Memo-IA'
  },
  description: 'Générez automatiquement vos mémoires techniques et répondez à 3x plus d\'appels d\'offres sans recruter. L\'IA qui rédige vos mémoires conformes en 30 minutes. Gagnez 15h par semaine.',
  keywords: ['mémoire technique', 'appel d\'offres', 'IA', 'génération automatique', 'marchés publics', 'réponse appel d\'offres', 'logiciel mémoire technique', 'rédaction automatique'],
  authors: [{ name: 'Memo-IA' }],
  creator: 'Memo-IA',
  publisher: 'Memo-IA',

  // Métadonnées viewport pour mobile
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },

  // Theme color pour navigateurs
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://memo-ia.fr',
    title: 'Memo-IA - Génération Automatique de Mémoires Techniques',
    description: 'Générez automatiquement vos mémoires techniques et répondez à 3x plus d\'appels d\'offres. Gagnez 15h par semaine avec l\'IA.',
    siteName: 'Memo-IA',
    images: [{
      url: 'https://memo-ia.fr/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Memo-IA - Génération Automatique de Mémoires Techniques'
    }]
  },

  // Twitter Cards
  twitter: {
    card: 'summary_large_image',
    title: 'Memo-IA - Génération Automatique de Mémoires Techniques',
    description: 'Répondez à 3x plus d\'appels d\'offres sans recruter. L\'IA qui rédige vos mémoires en 30 minutes.',
    images: ['https://memo-ia.fr/twitter-image.png'],
    creator: '@MemoIA'
  },

  // Robots & indexation
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    }
  },

  // Canonical URL
  alternates: {
    canonical: 'https://memo-ia.fr'
  },

  // Manifest PWA
  manifest: '/manifest.json',

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <ClerkClientProvider>
          <TanstackClientProvider>
            <SmoothScroll>
              <Header />
              <main className="-mt-px">{children}</main>
            </SmoothScroll>
          </TanstackClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  )
}
