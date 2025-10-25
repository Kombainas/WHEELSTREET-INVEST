'use client'

import { motion } from 'framer-motion'
import { TrendingUp, DollarSign, PieChart, Target } from 'lucide-react'

interface FinancialMetric {
  label: string
  current: string
  target: string
  description: string
}

const REVENUE_ASSUMPTIONS: FinancialMetric[] = [
  {
    label: 'Automobiliai per mėnesį',
    current: '26 vnt',
    target: '280 vnt',
    description: 'Vidutinė marža €950/vnt',
  },
  {
    label: 'Pagrindinės pajamos (komisiniai)',
    current: '€25K',
    target: '€265K',
    description: '280 automobilių × €950 marža',
  },
  {
    label: 'Cross-sell (draudimas, lizingas)',
    current: '€2K',
    target: '€45K',
    description: '15-20% penetracija',
  },
  {
    label: 'Importas iš Kinijos',
    current: '€0',
    target: '€20K',
    description: 'Nauja kryptis, €500 marža/vnt',
  },
]

const COST_STRUCTURE = [
  {
    category: 'COGS',
    percentage: 0,
    amount: '€0',
    description: 'Tik brokerystė - automobiliai nepriklauso mums',
  },
  {
    category: 'Komanda',
    percentage: 40,
    amount: '€132K',
    description: '20 žmonių × €6.6K vidutinė alga',
  },
  {
    category: 'Marketing',
    percentage: 12,
    amount: '€40K',
    description: 'CAC €50-100, organinis 88%',
  },
  {
    category: 'Operacinės išlaidos',
    percentage: 18,
    amount: '€60K',
    description: 'Biuras, tech, legal, apskaita',
  },
]

const PROFIT_BREAKDOWN = {
  revenue: '€330K',
  totalCosts: '€232K',
  netProfit: '€98K',
  netMargin: '30%',
}

export default function FinancialModel() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-black/5 text-black text-sm font-medium rounded-full mb-4">
              📊 Financial Model
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Finansinės projekcijos (24 mėnesiai)
            </h2>
            <p className="text-black/60 text-lg max-w-2xl mx-auto">
              Realistiškos pajamų ir išlaidų projekcijos su detaliais assumptions
            </p>
          </div>

          {/* Revenue Assumptions */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6 text-green-600" />
              <h3 className="text-2xl font-bold">Pajamų Assumptions</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {REVENUE_ASSUMPTIONS.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200"
                >
                  <h4 className="font-semibold text-lg mb-3">{metric.label}</h4>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-black/60 text-sm">Dabar:</span>
                    <span className="text-2xl font-bold text-black">{metric.current}</span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-green-600 text-sm">24 mėn:</span>
                    <span className="text-2xl font-bold text-green-600">{metric.target}</span>
                  </div>

                  <p className="text-sm text-black/60 leading-relaxed">
                    {metric.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Total MRR Target */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 bg-green-600 text-white rounded-lg p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-green-100 mb-1">Target Mėnesinės Pajamos (MRR)</p>
                  <p className="text-4xl md:text-5xl font-bold">€330K</p>
                </div>
                <div className="text-right">
                  <p className="text-green-100 mb-1">Metinės pajamos (ARR)</p>
                  <p className="text-3xl md:text-4xl font-bold">€4M+</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Cost Structure */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold">Išlaidų struktūra (€330K MRR)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COST_STRUCTURE.map((cost, index) => (
                <motion.div
                  key={cost.category}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 border border-black/10 hover:border-black/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{cost.category}</h4>
                    <span className="text-2xl font-bold text-blue-600">
                      {cost.percentage}%
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${cost.percentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xl font-bold text-black mb-2">{cost.amount}</p>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {cost.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* P&L Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-black to-black/90 text-white rounded-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-6 h-6" />
              <h3 className="text-2xl font-bold">P&L Summary (24 mėn projekcija)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-white/80">Mėnesinės pajamos</span>
                  <span className="text-2xl font-bold text-green-400">
                    {PROFIT_BREAKDOWN.revenue}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-4 border-b border-white/20">
                  <span className="text-white/80">Total išlaidos</span>
                  <span className="text-2xl font-bold text-red-400">
                    -{PROFIT_BREAKDOWN.totalCosts}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-white font-semibold">Grynasis pelnas</span>
                  <span className="text-3xl font-bold text-green-400">
                    {PROFIT_BREAKDOWN.netProfit}
                  </span>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-center items-center bg-white/10 rounded-lg p-6">
                <p className="text-white/80 mb-2">Net Margin</p>
                <p className="text-5xl font-bold text-green-400 mb-2">
                  {PROFIT_BREAKDOWN.netMargin}
                </p>
                <p className="text-sm text-white/60 text-center">
                  Sveika net margin brokerystės modeliui
                </p>
              </div>
            </div>

            {/* Key Assumptions Note */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-white/60 leading-relaxed">
                <strong>Key assumptions:</strong> 280 automobilių per mėnesį @ €950 vidutinė marža
                + 15-20% cross-sell draudimas/lizingas + Kinijos importo pradžia. 0% COGS nes
                brokerystės modelis (automobiliai nepriklauso mums). OpEx optimizuotas: 88% organinis
                marketing (žemas CAC €50-100), efektyvi komanda 20 žmonių.
              </p>
            </div>
          </motion.div>

          {/* Break-Even Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200"
          >
            <div className="flex items-start gap-4">
              <div className="bg-blue-600 text-white rounded-full p-3">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-lg mb-2">Break-Even Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-black/60 mb-1">Current burn rate</p>
                    <p className="text-xl font-bold text-black">~€15K/mėn</p>
                  </div>
                  <div>
                    <p className="text-black/60 mb-1">Break-even point</p>
                    <p className="text-xl font-bold text-blue-600">€60K MRR</p>
                    <p className="text-xs text-black/60">~65 automobiliai/mėn</p>
                  </div>
                  <div>
                    <p className="text-black/60 mb-1">Target break-even</p>
                    <p className="text-xl font-bold text-green-600">2026 Q2</p>
                    <p className="text-xs text-black/60">~8-10 mėnesių</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
