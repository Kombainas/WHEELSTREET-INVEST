'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem('exitIntentShown')
    if (popupShown) {
      setHasShown(true)
      return
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is moving toward the top of the viewport
      if (e.clientY <= 50 && !hasShown && !showPopup) {
        setShowPopup(true)
        setHasShown(true)
        sessionStorage.setItem('exitIntentShown', 'true')
      }
    }

    // Add a small delay before activating the exit intent
    const timeoutId = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave)
    }, 5000) // Wait 5 seconds before activating

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasShown, showPopup])

  const handleClose = () => {
    setShowPopup(false)
  }

  return (
    <AnimatePresence>
      {showPopup && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4"
          >
            <div className="bg-white rounded-lg shadow-2xl border border-black/10 p-8 relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-black/40 hover:text-black transition-colors"
                aria-label="Close popup"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Content */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-2xl font-bold mb-2">Turite klausimų?</h2>
                <p className="text-black/60">
                  Nesvarstykite vienas. Susisiekime ir aptarkime investicinę galimybę.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <a
                  href="mailto:invest@wheelstreet.lt?subject=Investment Inquiry"
                  className="block w-full px-6 py-3 bg-black text-white text-center font-medium hover:bg-black/90 transition-all duration-200 rounded-lg"
                  onClick={handleClose}
                >
                  📧 Rašyti el. paštu
                </a>
                <a
                  href="https://calendly.com/wheelstreet/investment-call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-white text-black text-center font-medium border-2 border-black hover:bg-black/5 transition-all duration-200 rounded-lg"
                  onClick={handleClose}
                >
                  📅 Užsiregistruoti susitikimui
                </a>
                <button
                  onClick={handleClose}
                  className="block w-full px-6 py-3 text-black/60 text-center font-medium hover:text-black transition-colors duration-200"
                >
                  Ne dabar
                </button>
              </div>

              {/* Trust elements */}
              <div className="mt-6 pt-6 border-t border-black/10">
                <div className="flex items-center justify-center gap-4 text-xs text-black/40">
                  <div className="flex items-center gap-1">
                    <span>⚡</span>
                    <span>Atsakysime per 24h</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔒</span>
                    <span>100% konfidencialumas</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
