'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SearchButton from './SearchButton'
import MobileNav from './MobileNav'
import { useProject } from '@/lib/projects/ProjectContext'

export default function Nav() {
  // Try to get project config, fall back to defaults if not available
  let projectConfig = { name: 'WheelStreet', logo: '/wheel-street-logo.png' }
  try {
    const context = useProject()
    if (context?.config) {
      projectConfig = context.config
    }
  } catch (e) {
    // Context not available (e.g., in layout), use defaults
  }

  const [scrolled, setScrolled] = useState(false)

  // Track scroll position for backdrop blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-black/10 transition-colors duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black rounded"
          aria-label={`${projectConfig.name} - Home`}
        >
          <Image
            src={projectConfig.logo}
            alt={`${projectConfig.name} logo`}
            width={48}
            height={48}
            priority
            className="h-12 w-12 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <SearchButton />
          <a
            href="/pitch-deck.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Pitch Deck ↗
          </a>
          <Link
            href="/deck"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Verslo planas
          </Link>
          <Link
            href="/data-room"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Duomenys
          </Link>
          <Link
            href="/updates"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Naujienos
          </Link>
          <Link
            href="/partners"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Partneriai
          </Link>
          <Link
            href="/bonusas"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Bonusas ⭐
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  )
}
