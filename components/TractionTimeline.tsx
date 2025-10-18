interface Milestone {
  year: string
  label: string
  value: string
}

const milestones: Milestone[] = [
  { year: '2022', label: 'Startas', value: 'Platforma paleista' },
  { year: '2023', label: 'Trauka', value: '€15–25K MRR' },
  { year: '2024', label: 'Importas', value: '20–30% maržų segmentas' },
  { year: '2025', label: 'Latvija', value: 'Rinkos įėjimas' },
  { year: '2026', label: 'Series A', value: 'Tikslas €150K MRR' },
]

export default function TractionTimeline() {
  return (
    <section className="my-12 md:my-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Traction Timeline</h2>

      <div className="timeline-wrapper">
        <div className="timeline">
          {milestones.map((milestone, idx) => (
            <div key={milestone.year} className="timeline-item">
              {/* Connecting line (hidden for first item) */}
              {idx > 0 && (
                <div className="timeline-connector" aria-hidden="true">
                  <div className="timeline-line-horizontal" />
                </div>
              )}

              {/* Year label */}
              <div className="label-caps text-black/60 mb-2">{milestone.year}</div>

              {/* Node */}
              <div className="timeline-node" aria-hidden="true" />

              {/* Vertical line */}
              <div className="timeline-line" aria-hidden="true" />

              {/* Label */}
              <div className="font-semibold text-sm mb-1">{milestone.label}</div>

              {/* Value */}
              <div className="text-xs text-black/60">{milestone.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
