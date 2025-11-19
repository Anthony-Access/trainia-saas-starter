"use client"

import { useState } from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden bg-gradient-to-br from-slate-50/95 to-blue-50/95 backdrop-blur-md dark:from-slate-900/95 dark:to-slate-800/95">
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-50" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
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
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
            Memo-IA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-8 md:flex">
          <SignedOut>
            <Link href="/sign-in">
              <Button variant="ghost">Se connecter</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Commencer</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="ghost">Dashboard</Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="relative md:hidden">
          <div className="border-t border-gray-200/50 bg-white/90 px-2 py-4 backdrop-blur-md dark:border-gray-800/50 dark:bg-gray-900/90">
            <div className="space-y-3">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/sign-up"
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Commencer
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}