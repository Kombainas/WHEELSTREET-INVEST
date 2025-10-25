'use client'

import dynamic from 'next/dynamic'
import { motion } from 'motion/react'
import { TrendingUp, Target, DollarSign, Calendar } from 'lucide-react'

// Dynamic import for Lottie animation
const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
  ssr: false,
  loading: () => null,
})

export default function ExitStrategy() {
  const targetAcquirers = [
    {
      name: 'Auto1 Group',
      description: 'Europos lyderis',
      valuation: '€4.5B vertinimas',
      icon: '🚗',
    },
    {
      name: 'Autoplius.lt',
      description: 'Baltijos rinkos lyderis',
      valuation: 'Strateginė įsigijimo galimybė',
      icon: '🏢',
    },
    {
      name: 'Series A/B VCs',
      description: 'Automotive tech fondai',
      valuation: '€10-20M round',
      icon: '💼',
    },
  ]

  const comparableExits = [
    { name: 'Carvana', exit: 'IPO', valuation: '€8B', year: '2017' },
    { name: 'Cazoo', exit: 'SPAC', valuation: '€3B', year: '2021' },
    { name: 'Vroom', exit: 'IPO', valuation: '€2.5B', year: '2020' },
  ]

  const timeline = [
    { year: '2025-2026', milestone: 'Baltijos rinkos ekspansija', status: 'in-progress' },
    { year: '2026-2027', milestone: 'Profitability + Scale', status: 'planned' },
    { year: '2027-2030', milestone: 'Exit Event', status: 'planned' },
  ]

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-black via-black/95 to-black/90 text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <LottieAnimation
          animationUrl="/animations/minimalist-car.json"
          className="w-full h-full scale-150"
          loop={true}
          autoplay={true}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-1 bg-white/10 rounded-full text-sm font-medium mb-4">
              💰 Exit Strategy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Investuotojų Grąžos Kelias
            </h2>
            <p className="text-lg text-white/70 max-w-3xl mx-auto">
              Aiški strategija investicijos grąžinimui per 3-5 metus su potencialia 10x+ grąža
            </p>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Calendar className="w-5 h-5 text-white/60" />
              <h3 className="text-xl font-bold">Exit Timeline</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 rounded-lg border ${
                    item.status === 'in-progress'
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        item.status === 'in-progress' ? 'bg-green-500 animate-pulse' : 'bg-white/30'
                      }`}
                    />
                    <span className="text-sm font-medium text-white/60">{item.year}</span>
                  </div>
                  <div className="font-bold text-lg">{item.milestone}</div>
                  {index < timeline.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-0.5 bg-white/20" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Target Acquirers */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-5 h-5 text-white/60" />
              <h3 className="text-xl font-bold">Potencialūs Pirkėjai</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {targetAcquirers.map((acquirer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 p-6 rounded-lg border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {acquirer.icon}
                  </div>
                  <h4 className="text-xl font-bold mb-2">{acquirer.name}</h4>
                  <p className="text-white/60 text-sm mb-2">{acquirer.description}</p>
                  <p className="text-white/80 font-medium">{acquirer.valuation}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Comparable Exits */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-white/60" />
              <h3 className="text-xl font-bold">Panašūs Išėjimai</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {comparableExits.map((exit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 p-6 rounded-lg border border-white/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{exit.name}</h4>
                      <p className="text-white/60 text-sm">{exit.exit}</p>
                    </div>
                    <span className="px-2 py-1 bg-white/10 rounded text-xs">{exit.year}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{exit.valuation}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Investor Returns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-8 text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <DollarSign className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold">Projected Investor Returns</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
              <div>
                <div className="text-white/60 text-sm mb-2">Exit Valuation</div>
                <div className="text-3xl font-bold text-green-400">€10-15M</div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-2">Timeframe</div>
                <div className="text-3xl font-bold">3-5 metai</div>
              </div>
              <div>
                <div className="text-white/60 text-sm mb-2">Potential ROI</div>
                <div className="text-3xl font-bold text-green-400">10x+</div>
              </div>
            </div>
            <p className="mt-6 text-white/70 text-sm max-w-2xl mx-auto">
              Realistinis scenarijus remiantis Baltijos rinkos dinamika ir panašių automotive tech
              įmonių vertinimais. Multiple exit options suteikia lankstumą investuotojams.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
