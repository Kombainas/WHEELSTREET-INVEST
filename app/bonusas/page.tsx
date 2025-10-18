import { Metadata } from 'next'
import Section from '@/components/Section'
import BonusHero from '@/components/BonusHero'
import BonusProjectCard from '@/components/BonusProjectCard'
import { bonusProjects } from '@/content/bonusas-projects'

export const metadata: Metadata = {
  title: 'Bonusas Projektai | WheelStreet Invest',
  description: '5 papildomi investavimo atvejai ir strateginės iniciatyvos',
  robots: 'noindex, nofollow',
}

export default function BonusasPage() {
  return (
    <>
      <BonusHero />

      <Section className="pb-24">
        <div className="container mx-auto px-4">
          {/* Grid of project cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {bonusProjects.map((project, index) => (
              <BonusProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-16 text-center">
            <p className="text-sm text-black/40 max-w-2xl mx-auto">
              Šie projektai yra papildoma informacija investuotojams. Detalūs planai
              ir finansinės prognozės prieinamos atskiruose dokumentuose.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
