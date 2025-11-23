'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
    const { createOrganization } = useOrganizationList()
    const router = useRouter()
    const [companyName, setCompanyName] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // 🛡️ SECURITY: Créer l'organisation Clerk avec l'utilisateur comme admin
            await createOrganization({ name: companyName })

            // ✅ Redirection vers le dashboard (l'org_id sera automatiquement dans le JWT)
            router.push('/dashboard')
        } catch (err) {
            console.error('Error creating organization:', err)
            setError('Une erreur est survenue. Veuillez réessayer.')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Bienvenue sur Trainia 🎉
                    </h1>
                    <p className="text-gray-300">
                        Pour commencer, créons votre espace de travail.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2">
                            <span className="text-sm font-medium text-gray-200">
                                Nom de votre entreprise *
                            </span>
                            <input
                                type="text"
                                required
                                minLength={2}
                                maxLength={100}
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="mt-2 block w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="Ex: Trainia SARL"
                                disabled={loading}
                            />
                        </label>
                        <p className="text-xs text-gray-400 mt-1">
                            Vous pourrez inviter des collaborateurs plus tard.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !companyName.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Création en cours...
                            </span>
                        ) : (
                            'Créer mon espace de travail'
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    En créant votre espace, vous acceptez nos conditions d&apos;utilisation.
                </p>
            </div>
        </div>
    )
}
