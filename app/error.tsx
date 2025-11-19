'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // ✅ SECURITY: Log error to monitoring service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-slate-800">
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Error icon */}
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>

          {/* Error message */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Une erreur s'est produite
          </h2>

          <p className="text-gray-600 dark:text-gray-400">
            Désolé, quelque chose s'est mal passé. Veuillez réessayer.
          </p>

          {/* Error details (development only) */}
          {process.env.NODE_ENV === 'development' && (
            <pre className="mt-4 max-w-full overflow-auto rounded bg-gray-100 p-4 text-left text-xs dark:bg-gray-900">
              {error.message}
            </pre>
          )}

          {/* Actions */}
          <div className="mt-4 flex gap-3">
            <Button onClick={reset}>
              Réessayer
            </Button>
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
