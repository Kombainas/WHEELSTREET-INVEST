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

          {/* Contact CTA */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-2xl p-8 md:p-12 shadow-2xl text-center">
              <div className="text-5xl mb-6">🤖💰</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Papildomi AI milijonai
              </h2>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Norite sužinoti daugiau apie šiuos projektus ir investavimo galimybes?
              </p>

              {/* Phone number display */}
              <div className="mb-6">
                <div className="text-sm text-white/60 mb-2">Skambinti:</div>
                <div className="text-2xl font-bold mb-6">Jonas +370 615 88214</div>
              </div>

              {/* Call button */}
              <a
                href="tel:+37061588214"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-white/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="text-2xl">📞</span>
                Skambinti dabar
              </a>

              {/* Footer note */}
              <p className="mt-8 text-sm text-white/60">
                Detalūs planai ir finansinės prognozės prieinamos telefonu
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
