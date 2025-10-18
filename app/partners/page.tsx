import Section from '@/components/Section'
import { motion } from 'motion/react'

interface Partner {
  name: string
  category: string
  description: string
  logo: string
  impact?: string
}

interface Event {
  title: string
  date: string
  partner: string
  attendees: string
  description: string
}

const partners: Partner[] = [
  {
    name: 'Draudimo partneris',
    category: 'Draudimas',
    description: 'Integruotas automobilių draudimo sprendimas. Klientai gauna draudimo pasiūlymus iš karto pirkimo metu.',
    logo: '🛡️',
    impact: '+23% konversija su draudimo pasiūlymu'
  },
  {
    name: 'Lizingo kompanija',
    category: 'Finansavimas',
    description: 'Lizingo finansavimas automobilių pirkimui. Greitas patvirtinimas ir lanksčios sąlygos.',
    logo: '💳',
    impact: '~40% pirkimų su lizingu'
  },
  {
    name: 'Kinijos importas',
    category: 'Logistika',
    description: 'Automobilių importas iš Kinijos. Tiesioginiai ryšiai su gamintojais, greitas pristatymas.',
    logo: '🚢',
    impact: 'Nauja rinkos niša'
  },
  {
    name: 'Tech partneris',
    category: 'Technologijos',
    description: 'Automobilių būklės tikrinimo ir vertinimo technologijos. AI-powered inspections.',
    logo: '🔧',
    impact: 'Greitesnis vertinimo procesas'
  }
]

const events: Event[] = [
  {
    title: 'Automobilių verslo konferencija 2024',
    date: '2024-09',
    partner: 'Baltijos verslo asociacija',
    attendees: '150+',
    description: 'Pristatėme platformą verslo partneriams ir potencialiems investuotojams.'
  },
  {
    title: 'FinTech meetup Vilnius',
    date: '2024-08',
    partner: 'Lizingo kompanija',
    attendees: '80+',
    description: 'Bendras renginys apie finansavimo inovacijas automobilių sektoriuje.'
  },
  {
    title: 'Community test drive day',
    date: '2024-07',
    partner: 'Draudimo partneris',
    attendees: '200+',
    description: 'Community event su test drive\'ais ir draudimo konsultacijomis.'
  }
]

export default function PartnersPage() {
  return (
    <Section className="pt-16 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Partneriai & Ekosistema</h1>
        <p className="text-xl text-black/70 leading-relaxed">
          WheelStreet - tai ne tik platforma, bet integruota ekosistema. Kartu su partneriais
          kuriame pilną automobilių pirkimo ir pardavimo sprendimą: nuo finansavimo iki draudimo,
          nuo importo iki tech inovacijų.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-4xl font-bold mb-2">4+</div>
          <div className="text-sm text-black/60 uppercase tracking-wide">Strateginiai partneriai</div>
        </div>
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-4xl font-bold mb-2">430+</div>
          <div className="text-sm text-black/60 uppercase tracking-wide">Event dalyviai (2024)</div>
        </div>
        <div className="p-6 border border-black/10 rounded-lg bg-white">
          <div className="text-4xl font-bold mb-2">100%</div>
          <div className="text-sm text-black/60 uppercase tracking-wide">Ekosistemos padengimas</div>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Ekosistemos partneriai</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className="p-8 border border-black/10 rounded-lg bg-white hover:border-black/20 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-5xl">{partner.logo}</div>
                <div className="flex-1">
                  <div className="text-xs text-black/40 uppercase tracking-wide mb-1">
                    {partner.category}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{partner.name}</h3>
                </div>
              </div>
              <p className="text-black/70 mb-4 leading-relaxed">{partner.description}</p>
              {partner.impact && (
                <div className="inline-block px-3 py-1 bg-black/5 rounded text-sm font-medium">
                  📈 {partner.impact}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8">Bendri eventai ir iniciatyvos</h2>
        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={event.title}
              className="p-6 border border-black/10 rounded-lg bg-white hover:border-black/20 transition-all duration-200"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                  <div className="text-sm text-black/60">
                    {event.date} • Kartu su {event.partner}
                  </div>
                </div>
                <div className="px-3 py-1 bg-black/5 rounded text-sm font-medium">
                  {event.attendees} dalyvių
                </div>
              </div>
              <p className="text-black/70 leading-relaxed">{event.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Ecosystem Matters */}
      <div className="max-w-3xl mx-auto text-center bg-black/5 p-12 rounded-lg">
        <h2 className="text-3xl font-bold mb-6">Kodėl ekosistema svarbi?</h2>
        <p className="text-lg text-black/70 leading-relaxed mb-4">
          Konkurentai parduoda tik automobilius. Mes kuriame pilną ekosistemą - nuo pirkimo iki
          draudimo, nuo finansavimo iki importo. Tai reiškia:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div>
            <div className="text-3xl mb-2">💰</div>
            <div className="font-bold mb-1">Didesnis revenue</div>
            <div className="text-sm text-black/60">Per cross-sell opportunities</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-bold mb-1">Lock-in efektas</div>
            <div className="text-sm text-black/60">Klientai lieka ekosistemoje</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🚀</div>
            <div className="font-bold mb-1">Konkurencinis pranašumas</div>
            <div className="text-sm text-black/60">One-stop-shop modelis</div>
          </div>
        </div>
      </div>
    </Section>
  )
}
