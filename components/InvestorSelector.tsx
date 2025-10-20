'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useInvestorProfile } from '@/hooks/useInvestorProfile'

export default function InvestorSelector() {
  const { profile, selectInvestor, clearProfile } = useInvestorProfile()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Show selector if no profile exists
    if (!profile) {
      setIsOpen(true)
    }
  }, [profile])

  const handleSelect = (investor: 'kastytis' | 'andrius') => {
    selectInvestor(investor)
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="mb-4 text-4xl">👋</div>
              <h2 className="text-2xl font-bold mb-2">Sveiki atvykę</h2>
              <p className="text-black/60">
                Pasirinkite savo profilį asmeninei patirčiai
              </p>
            </div>

            {/* Investor Options */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSelect('kastytis')}
                className="w-full p-4 border-2 border-black/10 rounded-lg hover:border-black hover:bg-black/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">Kastytis</div>
                    <div className="text-sm text-black/60">Investuotojas</div>
                  </div>
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    👤
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleSelect('andrius')}
                className="w-full p-4 border-2 border-black/10 rounded-lg hover:border-black hover:bg-black/5 transition-all duration-200 text-left group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg">Andrius</div>
                    <div className="text-sm text-black/60">Investuotojas</div>
                  </div>
                  <div className="text-2xl group-hover:scale-110 transition-transform">
                    👤
                  </div>
                </div>
              </button>
            </div>

            {/* Footer Note */}
            <div className="text-center text-xs text-black/40 border-t border-black/10 pt-4">
              Jūsų pasirinkimas bus išsaugotas ir padės mums suasmeninti jūsų patirtį
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
