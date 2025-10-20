'use client'

import { motion } from 'motion/react'
import { useState } from 'react'
import { investmentPitch } from '@/content/investment-pitch'

interface FundAllocation {
  category: string
  percentage: number
  amount: string
  description: string
  color: string
  emoji: string
}

// Extract percentages from the useOfFunds data
const fundAllocations: FundAllocation[] = [
  {
    category: 'Inventorius',
    percentage: 40,
    amount: '€400K',
    description: investmentPitch.useOfFunds[0].description,
    color: '#000000',
    emoji: investmentPitch.useOfFunds[0].emoji,
  },
  {
    category: 'Komanda',
    percentage: 30,
    amount: '€300K',
    description: investmentPitch.useOfFunds[1].description,
    color: '#4b5563',
    emoji: investmentPitch.useOfFunds[1].emoji,
  },
  {
    category: 'Plėtra',
    percentage: 20,
    amount: '€200K',
    description: investmentPitch.useOfFunds[2].description,
    color: '#9ca3af',
    emoji: investmentPitch.useOfFunds[2].emoji,
  },
  {
    category: 'Technologijos',
    percentage: 10,
    amount: '€100K',
    description: investmentPitch.useOfFunds[3].description,
    color: '#d1d5db',
    emoji: investmentPitch.useOfFunds[3].emoji,
  },
]

export default function UseOfFundsChart() {
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null)

  // Calculate SVG paths for donut chart
  const size = 300
  const center = size / 2
  const radius = 100
  const innerRadius = 60
  const circumference = 2 * Math.PI * radius

  const createArcPath = (startAngle: number, endAngle: number, outerR: number, innerR: number) => {
    const startOuter = polarToCartesian(center, center, outerR, startAngle)
    const endOuter = polarToCartesian(center, center, outerR, endAngle)
    const startInner = polarToCartesian(center, center, innerR, endAngle)
    const endInner = polarToCartesian(center, center, innerR, startAngle)

    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

    return [
      'M', startOuter.x, startOuter.y,
      'A', outerR, outerR, 0, largeArcFlag, 1, endOuter.x, endOuter.y,
      'L', startInner.x, startInner.y,
      'A', innerR, innerR, 0, largeArcFlag, 0, endInner.x, endInner.y,
      'Z'
    ].join(' ')
  }

  function polarToCartesian(cx: number, cy: number, r: number, degrees: number) {
    const radians = (degrees - 90) * Math.PI / 180
    return {
      x: cx + r * Math.cos(radians),
      y: cy + r * Math.sin(radians)
    }
  }

  let currentAngle = 0
  const segments = fundAllocations.map((fund, index) => {
    const angle = (fund.percentage / 100) * 360
    const segment = {
      ...fund,
      startAngle: currentAngle,
      endAngle: currentAngle + angle,
      path: createArcPath(currentAngle, currentAngle + angle, radius, innerRadius),
    }
    currentAngle += angle
    return segment
  })

  return (
    <div className="bg-white border border-black/10 rounded-lg p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="label-caps text-black/60">Investicijų Paskirstymas</span>
        <h3 className="text-3xl font-bold mt-2 mb-3">
          Kaip Panaudosime €1M
        </h3>
        <p className="text-black/60 max-w-2xl mx-auto">
          Strateginis lėšų paskirstymas maksimaliam augimui ir ROI
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Donut Chart */}
        <div className="relative">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full h-auto max-w-sm mx-auto"
          >
            {segments.map((segment, index) => (
              <motion.path
                key={index}
                d={segment.path}
                fill={segment.color}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: selectedSegment === index ? 1 : selectedSegment === null ? 1 : 0.3,
                  scale: selectedSegment === index ? 1.05 : 1,
                }}
                whileHover={{ scale: 1.05, opacity: 1 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setSelectedSegment(index)}
                onMouseLeave={() => setSelectedSegment(null)}
                className="cursor-pointer"
              />
            ))}

            {/* Center text */}
            <text
              x={center}
              y={center - 10}
              textAnchor="middle"
              className="text-2xl font-bold fill-black"
            >
              €1M
            </text>
            <text
              x={center}
              y={center + 15}
              textAnchor="middle"
              className="text-sm fill-black/60"
            >
              Fundraise
            </text>
          </svg>

          {/* Selected segment details (mobile) */}
          {selectedSegment !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 p-4 bg-black/[0.02] rounded-lg text-center"
            >
              <div className="text-3xl mb-2">{segments[selectedSegment].emoji}</div>
              <div className="font-bold text-lg mb-1">
                {segments[selectedSegment].category}
              </div>
              <div className="text-2xl font-bold mb-2">
                {segments[selectedSegment].percentage}%
              </div>
              <div className="text-black/60 text-sm">
                {segments[selectedSegment].description}
              </div>
            </motion.div>
          )}
        </div>

        {/* Breakdown */}
        <div className="space-y-4">
          {fundAllocations.map((fund, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setSelectedSegment(index)}
              onMouseLeave={() => setSelectedSegment(null)}
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedSegment === index
                  ? 'border-black bg-black/[0.02] shadow-md'
                  : 'border-black/10 hover:border-black/30'
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Color indicator */}
                <div
                  className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                  style={{ backgroundColor: fund.color }}
                />

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{fund.emoji}</span>
                    <h4 className="font-bold text-lg">{fund.category}</h4>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-2xl font-bold">{fund.percentage}%</span>
                    <span className="text-black/60">({fund.amount})</span>
                  </div>

                  <p className="text-sm text-black/60">{fund.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ROI Context */}
      <div className="mt-8 p-6 bg-black/[0.02] rounded-lg border border-black/10">
        <h4 className="font-bold mb-3">💡 Investicijų Grąža (ROI) Projekcija</h4>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-black/60 mb-1">24 mėn tikslas</div>
            <div className="font-bold text-lg">€250-330K</div>
            <div className="text-xs text-black/60">Mėnesinės pajamos</div>
          </div>
          <div>
            <div className="text-black/60 mb-1">Break-even</div>
            <div className="font-bold text-lg">12-18 mėn</div>
            <div className="text-xs text-black/60">Numatomas laikas</div>
          </div>
          <div>
            <div className="text-black/60 mb-1">Target valuation</div>
            <div className="font-bold text-lg">€15-20M</div>
            <div className="text-xs text-black/60">2026 projekcija</div>
          </div>
        </div>
      </div>
    </div>
  )
}
