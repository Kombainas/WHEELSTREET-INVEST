'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SESSION_KEY = 'wheelstreet-intro-shown'

export default function LaunchIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Check if intro has been shown in this session
    const hasShown = sessionStorage.getItem(SESSION_KEY)

    if (!hasShown) {
      setShow(true)
      sessionStorage.setItem(SESSION_KEY, 'true')

      // Check reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      const reducedMotion = mediaQuery.matches

      // Auto-hide after duration (800ms for reduced motion, 2000ms for full animation)
      const duration = reducedMotion ? 800 : 2000
      const timer = setTimeout(() => {
        setShow(false)
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [])

  // Check reduced motion for rendering
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
  }, [])

  return (
    <AnimatePresence mode="wait">
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <div className={`intro-text ${prefersReducedMotion ? 'static' : ''}`}>
                <p className="label-caps text-black/50 mb-2">Wheelstreet</p>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                  Investuotojų portalas
                </h1>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
