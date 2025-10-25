'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { useState, useEffect } from 'react'
import SearchButton from './SearchButton'
import MobileNav from './MobileNav'

export default function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktop, setIsDesktop] = useState(true)
  const { scrollY } = useScroll()

  // Check if desktop on mount and resize
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024) // lg breakpoint
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0

    // Hide nav when scrolling down, show when scrolling up (ONLY on desktop)
    if (isDesktop && latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }

    // Increase backdrop blur when scrolled
    if (latest > 50) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  })

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`sticky top-0 z-50 border-b border-black/10 transition-colors duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md' : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black rounded"
          aria-label="Wheelstreet - Home"
        >
          <Image
            src="/wheel-street-logo.png"
            alt="Wheelstreet logo"
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
    </motion.nav>
  )
}
