export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 dark:border-slate-700 dark:border-t-purple-500" />

        {/* Loading text */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Chargement du dashboard...
        </p>
      </div>
    </div>
  )
}
