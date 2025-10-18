'use client'

import { useEffect, useState } from 'react'

export default function GarageMode() {
  const [isActive, setIsActive] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleKeyPress = (e: KeyboardEvent) => {
      // Ignore if user prefers reduced motion
      if (prefersReducedMotion) return

      // Ignore if typing in input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      // Toggle garage mode with 'W' key
      if (e.key === 'w' || e.key === 'W') {
        setIsActive(true)
        document.documentElement.classList.add('garage')

        // Auto-disable after 5 seconds
        setTimeout(() => {
          setIsActive(false)
          document.documentElement.classList.remove('garage')
        }, 5000)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      document.documentElement.classList.remove('garage')
    }
  }, [prefersReducedMotion])

  // Component doesn't render anything visible
  return null
}
