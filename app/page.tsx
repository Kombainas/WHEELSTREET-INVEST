import Section from '@/components/Section'
import Hero from '@/components/Hero'
import DiagonalConnector from '@/components/DiagonalConnector'
import KPICard from '@/components/KPICard'
import { metrics } from '@/content/metrics'

export default function Home() {
  return (
    <>
      <Hero />

      <DiagonalConnector fromId="hero" toId="metrics" />

      <Section id="metrics" className="border-t border-black/10">
        <div className="mb-8">
          <span className="label-caps text-black/60">Key Performance Indicators</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <KPICard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </Section>
    </>
  )
}
