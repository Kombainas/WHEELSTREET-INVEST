'use client'

import { useState, useMemo } from 'react'
import Section from '@/components/Section'
import { updates } from '@/content/updates'

// Extract delta badges from text like "+15%", "-25%", "↑150%"
function extractDeltas(text: string): Array<{ value: string; type: 'up' | 'down' }> {
  const deltaRegex = /([+\-↑↓]?\d+(?:\.\d+)?%)/g
  const matches = text.match(deltaRegex) || []

  return matches.map((match): { value: string; type: 'up' | 'down' } => {
    const isNegative = match.startsWith('-') || match.startsWith('↓')
    const cleanValue = match.replace(/[+\-↑↓]/, '')
    return {
      value: cleanValue,
      type: isNegative ? 'down' : 'up',
    }
  }).slice(0, 3) // Limit to 3 badges per update
}

// Convert body text to 2-3 bullet points
function bodyToBullets(body: string): string[] {
  const lines = body.split('\n').filter((line) => line.trim().startsWith('-'))

  if (lines.length > 0) {
    return lines.slice(0, 3).map((line) => line.replace(/^-\s*/, '').trim())
  }

  // Fallback: take first 2 sentences
  const sentences = body.split('.').filter((s) => s.trim().length > 0)
  return sentences.slice(0, 2).map((s) => s.trim() + '.')
}

export default function UpdatesPage() {
  const [selectedYear, setSelectedYear] = useState<string>('Visi')

  // Extract unique years from updates
  const years = useMemo(() => {
    const uniqueYears = Array.from(
      new Set(updates.map((update) => new Date(update.date).getFullYear()))
    ).sort((a, b) => b - a)
    return ['Visi', ...uniqueYears.map(String)]
  }, [])

  // Filter updates by selected year
  const filteredUpdates = useMemo(() => {
    if (selectedYear === 'Visi') {
      return updates
    }
    return updates.filter((update) => {
      const year = new Date(update.date).getFullYear().toString()
      return year === selectedYear
    })
  }, [selectedYear])

  // Separate pinned and regular updates
  const pinnedUpdate = filteredUpdates.find((update) => update.pinned)
  const regularUpdates = filteredUpdates.filter((update) => !update.pinned)

  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Investuotojų atnaujinimai</h1>
          <p className="text-lg text-black/70">
            Reguliarūs atnaujinimai apie kompanijos pažangą, pasiekimus ir rezultatus
          </p>
        </div>

        {/* Year Filter */}
        <div className="mb-8">
          <label htmlFor="year-filter" className="label-caps text-black/60 mb-2 block">
            Filtruoti pagal metus
          </label>
          <select
            id="year-filter"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-black/20 rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Updates List */}
        <div className="space-y-6">
          {/* Pinned Update */}
          {pinnedUpdate && (
            <article className="update-card update-card-pinned">
              <div className="flex items-center gap-2 mb-3">
                <span className="pinned-badge">Prisegta</span>
                <span className="label-caps text-black/40">
                  {new Date(pinnedUpdate.date).toLocaleDateString('lt-LT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).toUpperCase()}
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-4">{pinnedUpdate.title}</h2>

              {/* Delta Badges */}
              {extractDeltas(pinnedUpdate.body).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {extractDeltas(pinnedUpdate.body).map((delta, idx) => (
                    <span
                      key={idx}
                      className={`delta-badge ${delta.type === 'up' ? 'delta-up' : 'delta-down'}`}
                    >
                      {delta.type === 'up' ? '↑' : '↓'}
                      {delta.value}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullets */}
              <ul className="space-y-2">
                {bodyToBullets(pinnedUpdate.body).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-black/80">
                    <span className="text-black/40 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* Regular Updates */}
          {regularUpdates.map((update, index) => (
            <article key={index} className="update-card">
              <div className="mb-3">
                <span className="label-caps text-black/40">
                  {new Date(update.date).toLocaleDateString('lt-LT', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).toUpperCase()}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-4">{update.title}</h2>

              {/* Delta Badges */}
              {extractDeltas(update.body).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {extractDeltas(update.body).map((delta, idx) => (
                    <span
                      key={idx}
                      className={`delta-badge ${delta.type === 'up' ? 'delta-up' : 'delta-down'}`}
                    >
                      {delta.type === 'up' ? '↑' : '↓'}
                      {delta.value}
                    </span>
                  ))}
                </div>
              )}

              {/* Bullets */}
              <ul className="space-y-2">
                {bodyToBullets(update.body).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-black/80">
                    <span className="text-black/40 mt-1">•</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredUpdates.length === 0 && (
          <div className="text-center py-12 text-black/60">
            <p>Nerasta atnaujinimų pasirinktam laikotarpiui.</p>
          </div>
        )}
      </div>
    </Section>
  )
}
