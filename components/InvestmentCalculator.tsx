'use client'

import { useState } from 'react'
import { motion, useSpring, useTransform } from 'motion/react'
import Link from 'next/link'

export default function InvestmentCalculator() {
  const [investment, setInvestment] = useState(100000)
  
  // Business metrics from plan
  const avgMargin = 950 // EUR per car
  const monthlyRevenue = 20000 // Current
  const growthRate = 2.5 // 2.5x per year target
  
  // Calculate projected returns (simplified)
  const equityShare = (investment / 500000) * 100 // Assuming 500K raise
  const yearlyRevenue = monthlyRevenue * 12 * growthRate
  const projectedReturn = (yearlyRevenue * (equityShare / 100)) * 0.15 // 15% net margin estimate
  
  // Animated values
  const springValue = useSpring(investment, { stiffness: 100, damping: 30 })
  const displayValue = useTransform(springValue, (v) => Math.round(v))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-black to-black/95 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Investicijų kalkuliatorius
            </h2>
            <p className="text-lg text-white/70">
              Preliminarus skaičiuotuvas pagal verslo plano prognozes
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            {/* Investment Amount Slider */}
            <div className="mb-10">
              <label className="block text-sm font-medium text-white/60 mb-4">
                Investicijos dydis
              </label>
              <div className="mb-6">
                <motion.div className="text-5xl font-bold mb-2">
                  {formatCurrency(displayValue.get())}
                </motion.div>
                <p className="text-sm text-white/50">
                  {equityShare.toFixed(2)}% equity share
                </p>
              </div>
              <input
                type="range"
                min="50000"
                max="500000"
                step="10000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-sm text-white/40 mt-2">
                <span>€50K</span>
                <span>€500K</span>
              </div>
            </div>

            {/* Projected Returns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-sm text-white/60 mb-2">Metinė grąža (est.)</div>
                <motion.div 
                  className="text-3xl font-bold"
                  key={projectedReturn}
                >
                  {formatCurrency(projectedReturn)}
                </motion.div>
                <div className="text-xs text-white/40 mt-1">
                  ~{((projectedReturn / investment) * 100).toFixed(1)}% ROI
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <div className="text-sm text-white/60 mb-2">3 metų projekcija</div>
                <motion.div 
                  className="text-3xl font-bold"
                  key={projectedReturn * 3}
                >
                  {formatCurrency(projectedReturn * 3)}
                </motion.div>
                <div className="text-xs text-white/40 mt-1">
                  Darant prielaidą stabilaus augimo
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8">
              <p className="text-sm text-yellow-200/90">
                <strong>Dėmesio:</strong> Tai tik orientacinis skaičiavimas pagal verslo plano prognozes. 
                Tikrosios grąžos gali skirtis. Praeiti rezultatai negarantuoja būsimų.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/deck"
                className="flex-1 text-center px-6 py-4 bg-white text-black font-medium hover:bg-white/90 transition-colors"
              >
                Peržiūrėti planą
              </Link>
              <a
                href="mailto:invest@wheelstreet.lt"
                className="flex-1 text-center px-6 py-4 border border-white/20 hover:bg-white/5 transition-colors"
              >
                Susisiekti
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
