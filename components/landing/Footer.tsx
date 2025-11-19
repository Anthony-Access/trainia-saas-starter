import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-800 via-gray-850 to-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main footer content - 4 columns */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + Description */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Logo with 4 colored squares */}
              <div className="relative h-10 w-10 transition-transform group-hover:scale-110">
                <div className="grid grid-cols-2 gap-1 h-full w-full rotate-0 group-hover:rotate-6 transition-all duration-300">
                  <div className="rounded-sm bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm" />
                  <div className="rounded-sm bg-gradient-to-br from-fuchsia-500 to-fuchsia-600 shadow-sm" />
                  <div className="rounded-sm bg-gradient-to-br from-violet-500 to-violet-600 shadow-sm" />
                  <div className="rounded-sm bg-gradient-to-br from-pink-500 to-pink-600 shadow-sm" />
                </div>
              </div>
              {/* Brand name */}
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Memo-IA
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              L&apos;intelligence artificielle au service de vos appels d&apos;offres.
              Générez vos mémoires techniques en quelques clics.
            </p>
          </div>

          {/* Column 2: Produit */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Produit
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Fonctionnalités
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Tarifs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Démo
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Entreprise */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Entreprise
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Légal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              Légal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  CGU
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm hover:text-white transition-colors duration-200"
                >
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section: separator + copyright + social links */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {/* Copyright */}
            <p className="text-sm text-gray-400">
              © 2024 Memo-IA. Tous droits réservés.
            </p>

            {/* Social links */}
            <div className="flex items-center space-x-6">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
