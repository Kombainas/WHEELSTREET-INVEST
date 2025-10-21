'use client'

import { motion } from 'motion/react'

interface CompetitorData {
  name: string
  settlement: string
  margin: string
  payment: string
  inventory: string
  socialReach: string
  isWheelStreet?: boolean
}

const competitors: CompetitorData[] = [
  {
    name: 'WheelStreet',
    settlement: '24h',
    margin: '€1250',
    payment: 'Same day',
    inventory: '70',
    socialReach: '750K+ (88% organic)',
    isWheelStreet: true,
  },
  {
    name: 'Deals on Wheels',
    settlement: '48-72h',
    margin: '€600-700',
    payment: '3-5 days',
    inventory: '50-100',
    socialReach: '~20K',
  },
  {
    name: 'BRC',
    settlement: '72h+',
    margin: '€500',
    payment: '5-7 days',
    inventory: 'Marketplace',
    socialReach: '~300K',
  },
  {
    name: 'Carspot',
    settlement: '3-5 days',
    margin: '€700-900',
    payment: '90 days',
    inventory: '100-150',
    socialReach: '~30K',
  },
]

const features = [
  { key: 'settlement', label: 'Atsiskaitymo greitis', icon: '⚡' },
  { key: 'margin', label: 'Vidutinė marža', icon: '💰' },
  { key: 'payment', label: 'Mokėjimo laikas', icon: '💳' },
  { key: 'inventory', label: 'Inventorius', icon: '📦' },
  { key: 'socialReach', label: 'Social Media Reach (90d)', icon: '📱' },
]

export default function CompetitiveTable() {
  return (
    <div className="bg-white border border-black/10 rounded-lg p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <span className="label-caps text-black/60">Konkurencinė Pozicija</span>
        <h3 className="text-3xl font-bold mt-2 mb-3">
          Kodėl WheelStreet Išsiskiria
        </h3>
        <p className="text-black/60 max-w-2xl mx-auto">
          Lyginame pagrindinius rodiklius su tradiciniais konkurentais rinkoje
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-4 px-4 font-bold">Parametras</th>
              {competitors.map((competitor, i) => (
                <th
                  key={i}
                  className={`text-center py-4 px-4 font-bold ${
                    competitor.isWheelStreet ? 'bg-black text-white' : ''
                  }`}
                >
                  {competitor.name}
                  {competitor.isWheelStreet && (
                    <div className="text-xs font-normal mt-1 text-white/80">
                      (Mes)
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, featureIndex) => (
              <motion.tr
                key={feature.key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: featureIndex * 0.1 }}
                className="border-b border-black/10 hover:bg-black/[0.02] transition-colors"
              >
                <td className="py-4 px-4 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{feature.icon}</span>
                    <span>{feature.label}</span>
                  </div>
                </td>
                {competitors.map((competitor, i) => {
                  const value = competitor[feature.key as keyof CompetitorData] as string
                  const isWheelStreet = competitor.isWheelStreet
                  const isBest = isWheelStreet && feature.key !== 'inventory' // All our metrics are best except inventory is just different

                  return (
                    <td
                      key={i}
                      className={`py-4 px-4 text-center ${
                        isWheelStreet ? 'bg-black/[0.02] font-semibold' : ''
                      }`}
                    >
                      <div className="relative">
                        {value}
                        {isBest && (
                          <span className="ml-2 text-green-600">✓</span>
                        )}
                      </div>
                    </td>
                  )
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-6">
        {competitors.map((competitor, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`border rounded-lg p-6 ${
              competitor.isWheelStreet
                ? 'border-black bg-black text-white'
                : 'border-black/10'
            }`}
          >
            <h4 className="text-xl font-bold mb-4">
              {competitor.name}
              {competitor.isWheelStreet && (
                <span className="ml-2 text-sm font-normal text-white/80">
                  (Mes)
                </span>
              )}
            </h4>
            <div className="space-y-3">
              {features.map((feature) => {
                const value = competitor[feature.key as keyof CompetitorData] as string
                return (
                  <div
                    key={feature.key}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-2">
                      <span>{feature.icon}</span>
                      <span className={competitor.isWheelStreet ? 'text-white/90' : 'text-black/60'}>
                        {feature.label}
                      </span>
                    </div>
                    <span className="font-semibold">{value}</span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
          <span className="text-2xl">🎯</span>
          Pagrindiniai Pranašumai
        </h4>
        <ul className="space-y-2 text-green-900">
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>3x greičiau:</strong> 24h atsiskaitymas vs 48-72h konkurentų</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Aukštesnė marža:</strong> €950 per sandorį vs €500-800 rinkoje</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Viral growth:</strong> 400K+ social reach (88% organic) - 10x daugiau nei konkurentai</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Inventory ambicija:</strong> 200-300 automobilių tikslas 2025</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
