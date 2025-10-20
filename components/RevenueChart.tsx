'use client'

import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { revenueHistory, projectedRevenue, calculateGrowth } from '@/content/revenue-history'

export default function RevenueChart() {
  const [isVisible, setIsVisible] = useState(false)
  const allData = [...revenueHistory, ...projectedRevenue]
  const maxRevenue = Math.max(...allData.map(d => d.revenue))
  const minRevenue = Math.min(...revenueHistory.map(d => d.revenue))
  const growth = calculateGrowth(revenueHistory)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // SVG dimensions
  const width = 1000
  const height = 400
  const padding = { top: 40, right: 40, bottom: 60, left: 80 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Scale functions
  const xScale = (index: number) => {
    return (index / (allData.length - 1)) * chartWidth + padding.left
  }

  const yScale = (value: number) => {
    const range = maxRevenue - minRevenue
    const normalized = (value - minRevenue) / range
    return height - padding.bottom - (normalized * chartHeight)
  }

  // Generate path for historical data
  const historicalPath = revenueHistory
    .map((d, i) => {
      const x = xScale(i)
      const y = yScale(d.revenue)
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  // Generate path for projected data
  const projectedPath = [...revenueHistory.slice(-1), ...projectedRevenue]
    .map((d, i) => {
      const realIndex = revenueHistory.length - 1 + i
      const x = xScale(realIndex)
      const y = yScale(d.revenue)
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
    })
    .join(' ')

  // Grid lines
  const yGridLines = [0, 0.25, 0.5, 0.75, 1].map(ratio => {
    const value = minRevenue + (maxRevenue - minRevenue) * ratio
    return {
      y: yScale(value),
      label: `€${Math.round(value / 1000)}K`,
    }
  })

  return (
    <div className="bg-white border border-black/10 rounded-lg p-8">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold mb-2">Pajamų Augimas</h3>
        <p className="text-black/60">Mėnesinės pajamos 2024 metais</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/[0.02] p-4 rounded-lg">
          <div className="text-sm text-black/60 mb-1">Iš viso augimas</div>
          <div className="text-2xl font-bold text-green-600">+{growth.totalGrowth}%</div>
        </div>
        <div className="bg-black/[0.02] p-4 rounded-lg">
          <div className="text-sm text-black/60 mb-1">Q3 augimas</div>
          <div className="text-xl font-bold">+{growth.q3Growth}%</div>
        </div>
        <div className="bg-black/[0.02] p-4 rounded-lg">
          <div className="text-sm text-black/60 mb-1">Q4 augimas</div>
          <div className="text-xl font-bold">+{growth.q4Growth}%</div>
        </div>
        <div className="bg-black/[0.02] p-4 rounded-lg">
          <div className="text-sm text-black/60 mb-1">Dabartinis MRR</div>
          <div className="text-xl font-bold">€20K</div>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto"
          style={{ minWidth: '600px' }}
        >
          {/* Y-axis grid lines */}
          {yGridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={padding.left}
                y1={line.y}
                x2={width - padding.right}
                y2={line.y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 10}
                y={line.y}
                textAnchor="end"
                alignmentBaseline="middle"
                className="text-xs fill-black/40"
              >
                {line.label}
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {allData.map((d, i) => {
            // Show every other month for readability
            if (i % 2 !== 0) return null
            return (
              <text
                key={i}
                x={xScale(i)}
                y={height - padding.bottom + 20}
                textAnchor="middle"
                className="text-xs fill-black/60"
              >
                {d.label}
              </text>
            )
          })}

          {/* Historical line */}
          <motion.path
            d={historicalPath}
            fill="none"
            stroke="#000"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isVisible ? 1 : 0 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          />

          {/* Projected line (dashed) */}
          <motion.path
            d={projectedPath}
            fill="none"
            stroke="#22c55e"
            strokeWidth="3"
            strokeDasharray="8 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isVisible ? 1 : 0 }}
            transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {revenueHistory.map((d, i) => (
            <motion.circle
              key={i}
              cx={xScale(i)}
              cy={yScale(d.revenue)}
              r="5"
              fill="#000"
              initial={{ scale: 0 }}
              animate={{ scale: isVisible ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 2 + i * 0.05 }}
            />
          ))}

          {/* Projected data points */}
          {projectedRevenue.map((d, i) => {
            const realIndex = revenueHistory.length + i
            return (
              <motion.circle
                key={i}
                cx={xScale(realIndex)}
                cy={yScale(d.revenue)}
                r="5"
                fill="#22c55e"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 2.5 + i * 0.1 }}
              />
            )
          })}

          {/* Current point highlight */}
          <motion.circle
            cx={xScale(revenueHistory.length - 1)}
            cy={yScale(revenueHistory[revenueHistory.length - 1].revenue)}
            r="8"
            fill="#000"
            initial={{ scale: 0 }}
            animate={{ scale: isVisible ? [1, 1.2, 1] : 0 }}
            transition={{ duration: 0.6, delay: 3, repeat: Infinity, repeatDelay: 2 }}
          />
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-black"></div>
          <span className="text-black/60">Faktinės pajamos</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="32" height="2">
            <line x1="0" y1="1" x2="32" y2="1" stroke="#22c55e" strokeWidth="2" strokeDasharray="4 2" />
          </svg>
          <span className="text-black/60">Projekcija</span>
        </div>
      </div>
    </div>
  )
}
