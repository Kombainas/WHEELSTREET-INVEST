'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { investmentPitch } from '@/content/investment-pitch'

export default function InvestmentHighlight() {
  const pitch = investmentPitch

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
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">Keliame</div>
            <div className="text-3xl font-bold mb-1">{pitch.fundraise.amount}</div>
            <div className="text-sm text-white/70">{pitch.fundraise.equity}</div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">Vertinimas</div>
            <div className="text-3xl font-bold mb-1">{pitch.valuation.amount}</div>
            <div className="text-sm text-white/70">{pitch.valuation.label}</div>
          </div>

          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <div className="text-sm text-white/60 uppercase tracking-wide mb-2">{pitch.target.label}</div>
            <div className="text-3xl font-bold mb-1">{pitch.target.amount}</div>
            <div className="text-sm text-white/70">{pitch.target.sublabel}</div>
          </div>
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
          <Link
            href="/deck"
            className="inline-block px-8 py-4 bg-white text-black font-medium text-center hover:bg-white/90 transition-all duration-200"
          >
            Peržiūrėti pilną planą
          </Link>
          <Link
            href="mailto:invest@wheelstreet.lt?subject=Investment Inquiry"
            className="inline-block px-8 py-4 bg-white/10 text-white font-medium text-center hover:bg-white/20 border border-white/20 transition-all duration-200"
          >
            Susisiekti dėl investicijos
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
