'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, Calendar } from 'lucide-react'

const EXIT_SCENARIOS = [
  {
    name: 'Conservative',
    multiplier: 8,
    valuation: '€8M',
    timeframe: '5 years',
    color: 'bg-blue-500',
  },
  {
    name: 'Base Case',
    multiplier: 10,
    valuation: '€10M',
    timeframe: '4 years',
    color: 'bg-green-500',
  },
  {
    name: 'Optimistic',
    multiplier: 15,
    valuation: '€15M',
    timeframe: '3 years',
    color: 'bg-purple-500',
  },
]

export default function InvestmentCalculator() {
  const [investment, setInvestment] = useState(50000)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('lt-LT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const calculateReturns = (multiplier: number) => {
    return investment * multiplier
  }

  const calculateROI = (multiplier: number) => {
    return ((multiplier - 1) * 100).toFixed(0)
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-black via-black/95 to-black/90 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-full mb-4">
              💰 Investment Calculator
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Jūsų potencialūs grąžinimai
            </h2>
            <p className="text-white/70 text-lg">
              Paskaičiuokite savo investicijos grąžą pagal skirtingus exit scenarijus
            </p>
          </div>

          {/* Calculator Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-lg p-6 md:p-8 border border-white/10">
            {/* Investment Input */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="text-lg font-medium flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Jūsų investicija
                </label>
                <span className="text-2xl md:text-3xl font-bold gradient-text-white">
                  {formatCurrency(investment)}
                </span>
              </div>

              {/* Slider */}
              <input
                type="range"
                min="10000"
                max="200000"
                step="5000"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #10b981 0%, #10b981 ${
                    ((investment - 10000) / (200000 - 10000)) * 100
                  }%, rgba(255,255,255,0.2) ${
                    ((investment - 10000) / (200000 - 10000)) * 100
                  }%, rgba(255,255,255,0.2) 100%)`,
                }}
              />

              {/* Range Labels */}
              <div className="flex justify-between text-sm text-white/60 mt-2">
                <span>€10K</span>
                <span>€200K</span>
              </div>
            </div>

            {/* Exit Scenarios */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Exit Scenarijai
              </h3>

              {EXIT_SCENARIOS.map((scenario, index) => (
                <motion.div
                  key={scenario.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-3 h-3 rounded-full ${scenario.color}`} />
                        <h4 className="font-semibold text-lg">{scenario.name}</h4>
                        <span className="text-sm text-white/60 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {scenario.timeframe}
                        </span>
                      </div>
                      <p className="text-sm text-white/60">
                        Exit valuation: {scenario.valuation}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <div className="text-2xl md:text-3xl font-bold text-green-400">
                        {formatCurrency(calculateReturns(scenario.multiplier))}
                      </div>
                      <div className="text-sm text-white/60">
                        ROI: +{calculateROI(scenario.multiplier)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                ⚠️ <strong>Disclaimer:</strong> Šie skaičiavimai yra tik iliustracinio pobūdžio ir
                nėra garantija ateities rezultatų. Investicijos vertė gali svyruoti, ir nėra garantijos,
                kad pasieksite ar viršysite šiuos rezultatus. Praeiti rezultatai nereiškia būsimų
                rezultatų. Prieš investuodami, įvertinkite savo rizikos toleranciją.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
