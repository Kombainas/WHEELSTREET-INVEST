'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

interface SocialStat {
  label: string
  value: number
  suffix: string
  description: string
  color: string
  icon: string
}

const socialStats: SocialStat[] = [
  {
    label: 'Total Views (90d)',
    value: 750,
    suffix: 'K+',
    description: '88% organic reach - viral content without ads',
    color: '#E4405F', // Instagram gradient color
    icon: '👁️',
  },
  {
    label: 'Top Reel Views',
    value: 398,
    suffix: 'K',
    description: 'Single post reached 398K views',
    color: '#C13584',
    icon: '🎬',
  },
  {
    label: 'Organic Reach',
    value: 88,
    suffix: '%',
    description: 'Most content is discovered organically, not from followers',
    color: '#833AB4',
    icon: '🌱',
  },
  {
    label: 'Accounts Reached',
    value: 219,
    suffix: 'K',
    description: '↑377% growth in reach month-over-month',
    color: '#FD1D1D',
    icon: '📱',
  },
]

export default function SocialMediaStats() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<number[]>(socialStats.map(() => 0))

  useEffect(() => {
    if (isVisible) {
      socialStats.forEach((stat, index) => {
        const duration = 2000
        const steps = 60
        const stepValue = stat.value / steps
        let currentStep = 0

        const interval = setInterval(() => {
          currentStep++
          setAnimatedValues(prev => {
            const newValues = [...prev]
            newValues[index] = Math.min(currentStep * stepValue, stat.value)
            return newValues
          })

          if (currentStep >= steps) {
            clearInterval(interval)
          }
        }, duration / steps)
      })
    }
  }, [isVisible])

  return (
    <div className="py-20 bg-gradient-to-br from-black via-black/95 to-black/90 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-caps text-white/60">Viral Growth</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">
            Social Media Traction
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Pasiekiame 100,000s žmonių organically per Instagram – įrodymas brand strength ir viral potential
          </p>
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          onViewportEnter={() => setIsVisible(true)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {socialStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              style={{
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Icon */}
              <div className="text-4xl mb-3">{stat.icon}</div>

              {/* Value */}
              <div className="mb-2">
                <motion.span
                  className="text-4xl font-bold"
                  style={{ color: stat.color }}
                >
                  {Math.round(animatedValues[index])}
                </motion.span>
                <span className="text-2xl font-bold text-white/80">{stat.suffix}</span>
              </div>

              {/* Label */}
              <div className="text-sm font-medium text-white/90 mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-xs text-white/60 leading-relaxed">
                {stat.description}
              </div>

              {/* Visual bar */}
              <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: stat.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Insight */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Growth Chart Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>📈</span>
              Monthly Growth Trajectory
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-white/70">August 2024</span>
                  <span className="font-semibold">~10K views</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-white/30 to-white/50 rounded-full w-[7%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-white/70">September 2024</span>
                  <span className="font-semibold text-green-400">147K views (↑15x)</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full w-[100%]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span className="text-white/70">Oct-Nov 2024</span>
                  <span className="font-semibold text-purple-400">400K+ sustained</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-purple-500 rounded-full w-[100%]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Key Insights */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-6"
            style={{
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
            }}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>💡</span>
              Why This Matters for Investors
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Low CAC:</strong>
                  <span className="text-white/70"> 88% organic reach means near-zero customer acquisition cost</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Brand Power:</strong>
                  <span className="text-white/70"> Viral content creates strong brand recognition in target market</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Scalability:</strong>
                  <span className="text-white/70"> Proven ability to create viral content = free marketing at scale</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                <div>
                  <strong className="text-white">Competitive Moat:</strong>
                  <span className="text-white/70"> Traditional dealeriai don't have this viral reach (typically ~20K)</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Instagram CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://instagram.com/wheelstreet.lt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl"
          >
            <span className="text-xl">📸</span>
            Žiūrėti WheelStreet Instagram
            <span className="text-sm opacity-80">(400K+ views)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
