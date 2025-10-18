'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSION_KEY = 'wheelstreet-intro-shown'

export default function LaunchIntro() {
  const [show, setShow] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Check if intro has been shown in this session
    const hasShown = sessionStorage.getItem(SESSION_KEY)

    if (!hasShown) {
      setShow(true)
      sessionStorage.setItem(SESSION_KEY, 'true')

      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        setShow(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (prefersReducedMotion) {
    return null
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="intro-content">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
                Wheelstreet
              </h1>
              <p className="text-lg text-black/60">Investor Portal</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
