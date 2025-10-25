'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { investmentPitch } from '@/content/investment-pitch'
import { useCardTilt } from '@/hooks/useCardTilt'

export default function InvestmentHighlight() {
  const pitch = investmentPitch
  const [isDesktop, setIsDesktop] = useState(true)

  // Disable 3D tilt on mobile for performance
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const tilt1 = useCardTilt({ maxTilt: 5, scale: 1.03 })
  const tilt2 = useCardTilt({ maxTilt: 5, scale: 1.03 })
  const tilt3 = useCardTilt({ maxTilt: 5, scale: 1.03 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-gradient-to-br from-black to-black/90 text-white p-8 md:p-12 rounded-lg shadow-2xl border border-white/10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
            {pitch.badge}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            {pitch.headline}
          </h2>
          <p className="text-lg text-white/80">
            {pitch.subheadline}
          </p>
        </div>

        {/* Key Investment Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={isDesktop ? { ...tilt1.style, ...tilt1.transform } : {}}
            onMouseMove={isDesktop ? tilt1.handleMouseMove : undefined}
            onMouseLeave={isDesktop ? tilt1.handleMouseLeave : undefined}
            className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">Keliame</div>
            <div className="text-3xl font-bold mb-1 gradient-text-white">{pitch.fundraise.amount}</div>
            <div className="text-sm text-white/70">{pitch.fundraise.equity}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={isDesktop ? { ...tilt2.style, ...tilt2.transform } : {}}
            onMouseMove={isDesktop ? tilt2.handleMouseMove : undefined}
            onMouseLeave={isDesktop ? tilt2.handleMouseLeave : undefined}
            className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">Vertinimas</div>
            <div className="text-3xl font-bold mb-1">{pitch.valuation.amount}</div>
            <div className="text-sm text-white/70">{pitch.valuation.label}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={isDesktop ? { ...tilt3.style, ...tilt3.transform } : {}}
            onMouseMove={isDesktop ? tilt3.handleMouseMove : undefined}
            onMouseLeave={isDesktop ? tilt3.handleMouseLeave : undefined}
            className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">{pitch.target.label}</div>
            <div className="text-3xl font-bold mb-1">{pitch.target.amount}</div>
            <div className="text-sm text-white/70">{pitch.target.sublabel}</div>
          </motion.div>
        </div>

        {/* Use of Funds */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Lėšų panaudojimas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pitch.useOfFunds.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="text-2xl">{item.emoji}</div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-white/70">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/deck"
              className="inline-block px-8 py-4 bg-white text-black font-medium text-center hover:bg-white/90 hover:shadow-xl transition-all duration-200 rounded"
            >
              Peržiūrėti pilną planą
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="mailto:invest@wheelstreet.lt?subject=Investment Inquiry"
              className="inline-block px-8 py-4 bg-white/10 text-white font-medium text-center hover:bg-white/20 border border-white/20 hover:border-white/40 transition-all duration-200 rounded"
            >
              Susisiekti dėl investicijos
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
