'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SearchButton from './SearchButton'
import LogoutButton from './LogoutButton'

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
        aria-label={isOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-full h-0.5 bg-black transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <div className="fixed top-16 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 lg:hidden shadow-2xl">
            <nav className="flex flex-col h-full">
              {/* Search */}
              <div className="p-4 border-b border-black/10">
                <SearchButton />
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto py-4">
                <Link
                  href="/deck"
                  className="block px-6 py-3 text-base hover:bg-black/5 transition-colors"
                >
                  Planas
                </Link>
                <Link
                  href="/data-room"
                  className="block px-6 py-3 text-base hover:bg-black/5 transition-colors"
                >
                  Duomenys
                </Link>
                <Link
                  href="/updates"
                  className="block px-6 py-3 text-base hover:bg-black/5 transition-colors"
                >
                  Naujienos
                </Link>
                <Link
                  href="/bonusas"
                  className="block px-6 py-3 text-base hover:bg-black/5 transition-colors"
                >
                  Bonusas ⭐
                </Link>
                <Link
                  href="/book-a-call"
                  className="block px-6 py-3 text-base hover:bg-black/5 transition-colors"
                >
                  Susisiekti
                </Link>
              </div>

              {/* Logout Button */}
              <div className="p-4 border-t border-black/10">
                <LogoutButton />
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
