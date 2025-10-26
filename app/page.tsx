import Section from '@/components/Section'
import Hero from '@/components/Hero'
import DiagonalConnector from '@/components/DiagonalConnector'
import KPICard from '@/components/KPICard'
import WhyWheelStreet from '@/components/WhyWheelStreet'
import InvestmentHighlight from '@/components/InvestmentHighlight'
import LatestUpdate from '@/components/LatestUpdate'
import RevenueChart from '@/components/RevenueChart'
import CompetitiveTable from '@/components/CompetitiveTable'
import SocialMediaStats from '@/components/SocialMediaStats'
import ExitStrategy from '@/components/ExitStrategy'
import FinancialModel from '@/components/FinancialModel'
import InvestmentCalculator from '@/components/InvestmentCalculator'
import { metrics } from '@/content/metrics'
import { loadProject } from '@/lib/projects/loader'
import { ProjectProvider } from '@/lib/projects/ProjectContext'

export default async function Home({
  searchParams,
}: {
  searchParams: { project?: string }
}) {
  // Load project data based on URL parameter
  // Defaults to 'wheelstreet' if no parameter provided
  const projectSlug = searchParams.project || 'wheelstreet'
  const project = await loadProject(projectSlug)
  return (
    <ProjectProvider project={project}>
      <Hero />

      <DiagonalConnector fromId="hero" toId="investment" />

      {/* Investment Highlight Section */}
      <Section id="investment" className="py-16 lg:py-20 bg-white">
        <InvestmentHighlight />
      </Section>

      {/* Metrics Section */}
      <Section id="metrics" className="border-t border-black/10 py-16 lg:py-20">
        <div className="mb-12 text-center">
          <span className="label-caps text-black/60">Pagrindiniai veiklos rodikliai</span>
          <h2 className="text-3xl font-bold mt-2">Traction & Momentum</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <KPICard key={metric.label} metric={metric} index={index} />
          ))}
        </div>
      </Section>

      {/* Revenue Growth Chart */}
      <Section className="py-16 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevenueChart />
        </div>
      </Section>

      {/* Social Media Stats */}
      <SocialMediaStats />

      {/* Latest Update Section */}
      <Section className="py-12 md:py-16 bg-white">
        <LatestUpdate />
      </Section>

      {/* Competitive Advantage Table */}
      <Section className="py-16 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <CompetitiveTable />
        </div>
      </Section>

      {/* Exit Strategy */}
      <ExitStrategy />

      {/* Financial Model */}
      <FinancialModel />

      {/* Investment Calculator */}
      <InvestmentCalculator />

      <WhyWheelStreet />
    </ProjectProvider>
  )
}
