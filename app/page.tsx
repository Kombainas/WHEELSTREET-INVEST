import Section from '@/components/Section'
import Hero from '@/components/Hero'
import DiagonalConnector from '@/components/DiagonalConnector'
import KPICard from '@/components/KPICard'
import WhyWheelStreet from '@/components/WhyWheelStreet'
import InvestmentHighlight from '@/components/InvestmentHighlight'
import LatestUpdate from '@/components/LatestUpdate'
import PersonalizedWelcome from '@/components/PersonalizedWelcome'
import RevenueChart from '@/components/RevenueChart'
import CompetitiveTable from '@/components/CompetitiveTable'
import UseOfFundsChart from '@/components/UseOfFundsChart'
import SocialMediaStats from '@/components/SocialMediaStats'
import { metrics } from '@/content/metrics'

export default function Home() {
  return (
    <>
      <Hero />

      {/* Personalized Welcome Banner */}
      <Section className="pt-8">
        <PersonalizedWelcome />
      </Section>

      <DiagonalConnector fromId="hero" toId="investment" />

      {/* Investment Highlight Section */}
      <Section id="investment" className="py-20 bg-white">
        <InvestmentHighlight />
      </Section>

      {/* Metrics Section */}
      <Section id="metrics" className="border-t border-black/10 py-20">
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
      <Section className="py-20 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <RevenueChart />
        </div>
      </Section>

      {/* Social Media Stats */}
      <SocialMediaStats />

      {/* Latest Update Section */}
      <Section className="py-20 bg-white">
        <LatestUpdate />
      </Section>

      {/* Competitive Advantage Table */}
      <Section className="py-20 bg-black/[0.02]">
        <div className="max-w-6xl mx-auto">
          <CompetitiveTable />
        </div>
      </Section>

      {/* Use of Funds Chart */}
      <Section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <UseOfFundsChart />
        </div>
      </Section>

      <WhyWheelStreet />
    </>
  )
}
