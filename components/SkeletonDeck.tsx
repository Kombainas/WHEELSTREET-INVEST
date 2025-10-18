export default function SkeletonDeck() {
  return (
    <div className="max-w-4xl animate-pulse" aria-live="polite" aria-busy="true">
      {/* Label line */}
      <div className="sk sk-line mb-6" style={{ width: '240px', height: '12px' }} />

      {/* Summary cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <div className="sk sk-card" />
        <div className="sk sk-card" />
        <div className="sk sk-card" />
        <div className="sk sk-card" />
      </div>

      {/* Paragraph blocks */}
      <div className="space-y-8 mb-12">
        <div className="space-y-3">
          <div className="sk sk-line" style={{ width: '100%', height: '16px' }} />
          <div className="sk sk-line" style={{ width: '95%', height: '16px' }} />
          <div className="sk sk-line" style={{ width: '88%', height: '16px' }} />
        </div>

        <div className="space-y-3">
          <div className="sk sk-line" style={{ width: '92%', height: '16px' }} />
          <div className="sk sk-line" style={{ width: '100%', height: '16px' }} />
          <div className="sk sk-line" style={{ width: '85%', height: '16px' }} />
        </div>

        <div className="space-y-3">
          <div className="sk sk-line" style={{ width: '100%', height: '16px' }} />
          <div className="sk sk-line" style={{ width: '90%', height: '16px' }} />
        </div>
      </div>

      {/* Wide table bar */}
      <div className="sk rounded-lg" style={{ width: '100%', height: '200px' }} />
    </div>
  )
}
