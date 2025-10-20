'use client'

import { motion } from 'motion/react'
import { useState } from 'react'

interface Risk {
  title: string
  description: string
  severity: 'high' | 'medium' | 'low'
  mitigation: string
  icon: string
}

const risks: Risk[] = [
  {
    title: 'Market Risk',
    description: 'Automotive rinka yra cikliška ir priklauso nuo ekonominių sąlygų. Ekonominis nuosmukis gali sumažinti automobilių paklausą ir paveikti mūsų revenue.',
    severity: 'medium',
    mitigation: 'Diversifikuojame į kelias geografijas (LT, LV, EE) ir revenue streams (sales, warranties, insurance, financing). Taip pat targetiname used car segment, kuris yra atsparesnis recesijoms nei naujų automobilių rinka.',
    icon: '📉',
  },
  {
    title: 'Competition Risk',
    description: 'Tradiciniai dealeriai ir kiti online marketplaces gali bandyti kopijuoti mūsų greito atsiskaitymo modelį arba compete agresyviau kainomis.',
    severity: 'high',
    mitigation: 'Mūsų competitive moat: tech platform, viral brand (400K+ social reach), operational efficiency, ir network effects. First-mover advantage greito settlement space Baltijos šalyse. Continuous investment į tech ir customer experience.',
    icon: '⚔️',
  },
  {
    title: 'Regulatory Risk',
    description: 'Automotive industry turi griežtas reguliacijas: licensing requirements, safety standards, warranty obligations, consumer protection laws. Regulatory changes gali increase compliance costs.',
    severity: 'medium',
    mitigation: 'Turime experienced automotive professionals, kurie išmano regulatory landscape. Dirbame su legal advisors, darome proactive compliance audits, ir užtikriname proper licensing visuose markets.',
    icon: '⚖️',
  },
  {
    title: 'Execution Risk',
    description: 'Scaling operations greitai (200-300 inventory, 15-20 komanda, 3 geografijos) reikalauja strong operational excellence. Execution klaidos gali slow down growth arba increase costs.',
    severity: 'high',
    mitigation: 'Experienced leadership team su track record automotive ir scaling startups. Phased expansion approach – master Lithuania prieš moving to Latvia. Investment į process automation ir systems. Regular KPI monitoring ir agile decision making.',
    icon: '⚡',
  },
  {
    title: 'Inventory Risk',
    description: 'Laikant 200-300 automobilių inventory yra capital-intensive ir risky. Automobilių vertės gali kristi (depreciation), inventory gali "застрять" (slow-moving), arba gali būti quality issues.',
    severity: 'high',
    mitigation: 'Data-driven inventory management: AI pricing models, demand forecasting, fast turnover strategy (targeting <30 dienų average hold time). Thorough vehicle inspections, warranties backing. Partnership su financing providers sumažina working capital needs.',
    icon: '📦',
  },
  {
    title: 'Technology Risk',
    description: 'Platform downtime, security breaches, arba data loss gali pakenkti operations ir brand reputation. Dependency nuo tech infrastructure.',
    severity: 'medium',
    mitigation: 'Investment į robust tech infrastructure: cloud hosting (scalable, reliable), regular backups, security audits, GDPR compliance. DevOps best practices, monitoring systems, disaster recovery plans.',
    icon: '💻',
  },
  {
    title: 'Key Person Risk',
    description: 'Priklausomybė nuo key founders ir vadovų. Jų loss gali disrupt operations ir investor confidence.',
    severity: 'low',
    mitigation: 'Building strong second-tier management, documentation processes, cross-training team members. Advisors ir board members provide continuity ir expertise backup.',
    icon: '👤',
  },
  {
    title: 'Funding Risk',
    description: 'Gali prireikti papildomo funding round prieš reaching profitability. Market conditions gali pablogėti, making fundraising harder.',
    severity: 'medium',
    mitigation: 'Conservative cash management, targeting break-even per 12-18 mėnesių. Multiple revenue streams reduce dependency on single source. Relationship su investors for follow-on rounds. Scenario planning for different funding environments.',
    icon: '💰',
  },
]

export default function RiskDisclosures() {
  const [expandedRisk, setExpandedRisk] = useState<number | null>(null)

  const getSeverityColor = (severity: Risk['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-red-200 bg-red-50'
      case 'medium':
        return 'border-yellow-200 bg-yellow-50'
      case 'low':
        return 'border-green-200 bg-green-50'
    }
  }

  const getSeverityLabel = (severity: Risk['severity']) => {
    switch (severity) {
      case 'high':
        return { label: 'High Risk', color: 'text-red-700 bg-red-100' }
      case 'medium':
        return { label: 'Medium Risk', color: 'text-yellow-700 bg-yellow-100' }
      case 'low':
        return { label: 'Low Risk', color: 'text-green-700 bg-green-100' }
    }
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <span className="label-caps text-black/60">Skaidrumas & Atsakingumas</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">
            Risk Disclosures
          </h2>
          <p className="text-black/60 max-w-2xl">
            Kaip kiekviena startup investicija, WheelStreet turi rizikų. Čia atvirai aprašome pagrindinius risks ir kaip juos mitigat'iname.
          </p>
        </div>

        {/* Important Notice */}
        <div className="mb-8 p-6 bg-black/[0.02] border-l-4 border-black rounded">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <h4 className="font-bold mb-2">Investment Warning</h4>
              <p className="text-sm text-black/70">
                Investicijos į ankstyvos fazės startup'us yra high-risk ir gali rezultuoti pilnu kapitalo praradimu.
                Investuokite tik tiek, kiek galite sau leisti prarasti. Past performance nėra garantija future results.
                Consult su financial advisor prieš making investment decision.
              </p>
            </div>
          </div>
        </div>

        {/* Risk List */}
        <div className="space-y-4">
          {risks.map((risk, index) => {
            const isExpanded = expandedRisk === index
            const severityInfo = getSeverityLabel(risk.severity)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                  isExpanded ? getSeverityColor(risk.severity) : 'border-black/10 bg-white'
                }`}
              >
                {/* Risk Header */}
                <button
                  onClick={() => setExpandedRisk(isExpanded ? null : index)}
                  className="w-full text-left p-6 hover:bg-black/[0.02] transition-colors flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <span className="text-3xl flex-shrink-0">{risk.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-lg">{risk.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityInfo.color}`}>
                          {severityInfo.label}
                        </span>
                      </div>
                      <p className="text-black/70 text-sm">{risk.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 text-2xl text-black/40"
                  >
                    ↓
                  </motion.div>
                </button>

                {/* Mitigation */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <div className="pl-14">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <span>🛡️</span>
                        Mitigation Strategy:
                      </h4>
                      <p className="text-black/70 text-sm leading-relaxed">
                        {risk.mitigation}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="mt-12 p-6 bg-black text-white rounded-lg">
          <h3 className="font-bold text-lg mb-3">Risk Management Philosophy</h3>
          <p className="text-white/80 text-sm leading-relaxed">
            WheelStreet team atvirai pripažįsta visus risks ir aktyviai dirba prie jų mitigavimo.
            Mūsų approach: <strong>transparency, proactive planning, continuous monitoring, ir agile adaptation</strong>.
            Regular reporting investitoriams, quarterly risk reviews, scenario planning įvairių market conditions.
            Mūsų tikslas – ne eliminate visas rizikas (tai neįmanoma startup'ui), bet manage jas responsible ir strategic'iškai.
          </p>
        </div>
      </div>
    </div>
  )
}
