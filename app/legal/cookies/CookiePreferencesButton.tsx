'use client'

export function CookiePreferencesButton() {
  const handleClick = () => {
    if (typeof window !== 'undefined') {
      // Cette fonction devra être implémentée avec votre gestionnaire de cookies réel
      alert('Votre gestionnaire de cookies s\'ouvrira ici')
    }
  }

  return (
    <button
      className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-lg"
      onClick={handleClick}
    >
      Gérer mes préférences de cookies
    </button>
  )
}
