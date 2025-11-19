export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 dark:border-slate-700 dark:border-t-purple-500" />

        {/* Loading text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Chargement...
        </p>
      </div>
    </div>
  )
}
