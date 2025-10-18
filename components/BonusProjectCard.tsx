'use client'

import type { BonusProject } from '@/content/bonusas-projects'

interface BonusProjectCardProps {
  project: BonusProject
  index: number
}

export default function BonusProjectCard({ project, index }: BonusProjectCardProps) {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="bonus-card border border-black/10 rounded-lg p-8 bg-white transition-all duration-200 hover:border-black/20 hover:-translate-y-1 shadow-sm hover:shadow-lg"
      style={{
        animationDelay: `${0.1 * (index + 1)}s`,
      }}
    >
      {/* Project number badge */}
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
          {project.id}
        </div>
        <span className="label-caps text-black/40">{project.category}</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-3 leading-tight">{project.title}</h3>

      {/* Description */}
      <p className="text-black/70 text-sm leading-relaxed mb-6">
        {project.description}
      </p>

      {/* Metric (if exists) */}
      {project.metric && (
        <div className="mb-6 p-4 bg-black/[0.02] rounded border border-black/5">
          <span className="label-caps text-black/40 block mb-1">
            {project.metric.label}
          </span>
          <span className="text-2xl font-bold tabular-nums">
            {project.metric.value}
          </span>
        </div>
      )}

      {/* Action button */}
      <button
        onClick={handlePrint}
        className="w-full px-6 py-3 border-2 border-black bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-200"
      >
        Spausdinti PDF
      </button>
    </div>
  )
}
