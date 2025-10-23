'use client'

import Section from '@/components/Section'
import { motion } from 'motion/react'
import { Star, MapPin, Phone, Mail, Clock, Award, Users, Sparkles } from 'lucide-react'

interface Partner {
  name: string
  category: string
  description: string
  logo: string
  impact?: string
}

const ecosystemPartners: Partner[] = [
  {
    name: 'Draudimo partneris',
    category: 'Draudimas',
    description: 'Integruotas automobilių draudimo sprendimas. Klientai gauna draudimo pasiūlymus iš karto pirkimo metu.',
    logo: '🛡️',
    impact: '+23% konversija'
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
    impact: 'Greitesnis vertinimas'
  }
]

export default function PartnersPage() {
  return (
    <Section className="pt-16 pb-24">
      {/* Hero */}
      <div className="max-w-4xl mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-2 bg-black/5 rounded-full mb-6">
            <span className="text-sm font-medium">✨ Strateginė partnerystė</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Kartu kuriame<br />automobilių ekosistemą
          </h1>
          <p className="text-xl text-black/70 leading-relaxed">
            WheelStreet + Premium Auto Spa: viskas nuo automobilio pirkimo iki priežiūros vienoje vietoje.
            Mes parduodame automobilius, jie juos prižiūri ir išlaiko Premium būklėje.
          </p>
        </motion.div>
      </div>

      {/* Featured Partner: Premium Auto Spa */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-24"
      >
        <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -z-0"></div>

          <div className="relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="text-6xl mb-4">🚗</div>
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Premium Auto Spa</h2>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-lg font-semibold">4.9/5</span>
                  <span className="text-white/60">(127 atsiliepimai)</span>
                </div>
                <p className="text-xl text-white/90 leading-relaxed max-w-2xl">
                  <strong>#1 Detailing ekspertai Vilniuje</strong> – premium automobilių priežiūra,
                  nuo rankinio plovimo iki keramikos dangų ir PPF filmų. 1 minutė nuo oro uosto.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <Award className="w-12 h-12 mb-3 text-yellow-400" />
                <div className="text-2xl font-bold mb-1">Premium</div>
                <div className="text-sm text-white/70">Strateginis partneris</div>
              </div>
            </div>

            {/* Contact Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <MapPin className="w-5 h-5 mb-2 text-white/70" />
                <div className="text-sm text-white/60 mb-1">Adresas</div>
                <div className="font-medium">Rodūnios kl. 5, Vilnius</div>
                <div className="text-xs text-white/60">1 min nuo oro uosto</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Phone className="w-5 h-5 mb-2 text-white/70" />
                <div className="text-sm text-white/60 mb-1">Telefonas</div>
                <div className="font-medium">+370 690 77997</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Mail className="w-5 h-5 mb-2 text-white/70" />
                <div className="text-sm text-white/60 mb-1">El. paštas</div>
                <div className="font-medium text-sm">info@premiumautospa.lt</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Clock className="w-5 h-5 mb-2 text-white/70" />
                <div className="text-sm text-white/60 mb-1">Darbo laikas</div>
                <div className="font-medium text-sm">Pr–Pn: 9:00–18:00</div>
                <div className="text-xs text-white/60">Šeštadieniais: 9:00–15:00</div>
              </div>
            </div>

            {/* Services */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Paslaugos</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Premium detailing',
                  'Rankinis plovimas',
                  'Poliravimas',
                  'Salono valymas',
                  'Keramikos dangos',
                  'PPF apsauginės plėvelės',
                  'Parkavimas oro uoste'
                ].map((service) => (
                  <span
                    key={service}
                    className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium border border-white/20"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.premiumautospa.lt/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition-all duration-200"
              >
                Apsilankyti svetainėje
                <span>→</span>
              </a>
              <a
                href="tel:+37069077997"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                Skambinti
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Partnership Vision */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-24"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Kodėl ši partnerystė unikali?</h2>

        {/* Customer Journey */}
        <div className="bg-gradient-to-br from-black/5 to-black/10 rounded-2xl p-8 md:p-12 mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Kliento kelionė</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border-2 border-black/10 shadow-lg">
                <div className="text-4xl mb-3">🚗</div>
                <div className="text-xs text-black/40 uppercase tracking-wide mb-2">1. WheelStreet</div>
                <h4 className="text-xl font-bold mb-2">Nusiperka automobilį</h4>
                <p className="text-black/70">Greitas sandoris, 24h atsiskaitymas, garantija</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <div className="text-3xl">→</div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border-2 border-black/10 shadow-lg">
                <div className="text-4xl mb-3">✨</div>
                <div className="text-xs text-black/40 uppercase tracking-wide mb-2">2. Premium Auto Spa</div>
                <h4 className="text-xl font-bold mb-2">Priežiūra + detailing</h4>
                <p className="text-black/70">15% nuolaida WheelStreet klientams</p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                <div className="text-3xl">→</div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-white rounded-xl p-6 border-2 border-black/10 shadow-lg">
                <div className="text-4xl mb-3">🔄</div>
                <div className="text-xs text-black/40 uppercase tracking-wide mb-2">3. Lojalumas</div>
                <h4 className="text-xl font-bold mb-2">Ilgalaikis santykis</h4>
                <p className="text-black/70">Klientas grįžta į ekosistemą dėl kito auto</p>
              </div>
            </div>
          </div>
        </div>

        {/* Partnership Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white border border-black/10 rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Users className="w-12 h-12 mb-4 text-black" />
            <h4 className="text-xl font-bold mb-3">Cross-sell galimybės</h4>
            <p className="text-black/70">Kiekvienas WheelStreet klientas – potencialus Premium Auto Spa klientas. ~150 naujų klientų per metus.</p>
          </div>

          <div className="bg-white border border-black/10 rounded-xl p-6 shadow-lg hover:-translate-y-1 transition-all duration-300">
            <Sparkles className="w-12 h-12 mb-4 text-black" />
            <h4 className="text-xl font-bold mb-3">Premium pozicionavimas</h4>
            <p className="text-black/70">Abu brandai premium segmente. Sinergija stiprina poziciją rinkoje – "ne tik parduodame, bet ir prižiūrime".</p>
          </div>
        </div>
      </motion.div>

      {/* Growth Roadmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-24"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Augimo planas</h2>

        <div className="space-y-6">
          {/* 2025 Q4 */}
          <div className="bg-white border-2 border-black/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white rounded-lg px-4 py-2 font-bold text-sm whitespace-nowrap">
                2025 Q4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Pilotinė partnerystė</h3>
                <ul className="space-y-1 text-black/70">
                  <li>• 15% nuolaida visiems WheelStreet klientams</li>
                  <li>• Bendras marketing'as: Instagram, email kampanijos</li>
                  <li>• Tikslus: 30+ klientų per ketvirtį</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2026 Q1-Q2 */}
          <div className="bg-white border-2 border-black/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white rounded-lg px-4 py-2 font-bold text-sm whitespace-nowrap">
                2026 Q1-Q2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Integruota platforma</h3>
                <ul className="space-y-1 text-black/70">
                  <li>• Detailing užsakymas tiesiogiai per WheelStreet platformą</li>
                  <li>• Automatinis nuolaidų kodų generavimas</li>
                  <li>• Bendras lojalumo programos kūrimas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2026 Q3-Q4 */}
          <div className="bg-white border-2 border-black/10 rounded-xl p-6 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="bg-black text-white rounded-lg px-4 py-2 font-bold text-sm whitespace-nowrap">
                2026 Q3-Q4
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Plėtra į Baltijos šalis</h3>
                <ul className="space-y-1 text-black/70">
                  <li>• Bendras plėtros planas: Rygoje ir Taline</li>
                  <li>• Strateginiai partneriai vietinius detailing centrus</li>
                  <li>• Tikslus: +300 klientų per metus visose rinkose</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Partnership Impact Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-24"
      >
        <h2 className="text-4xl font-bold mb-12 text-center">Partnerystės poveikis (2026 projekcija)</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold mb-2">150+</div>
            <div className="text-sm text-white/70">Naujų klientų iš WheelStreet per metus</div>
          </div>

          <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold mb-2">€15K+</div>
            <div className="text-sm text-white/70">Papildomas revenue per metus (abiem)</div>
          </div>

          <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold mb-2">25%</div>
            <div className="text-sm text-white/70">Didesnė kliento lifetime value</div>
          </div>

          <div className="bg-gradient-to-br from-black to-black/90 text-white rounded-xl p-6 shadow-lg">
            <div className="text-4xl font-bold mb-2">5x</div>
            <div className="text-sm text-white/70">Konkurencinis pranašumas prieš rinką</div>
          </div>
        </div>
      </motion.div>

      {/* Ecosystem Partners */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold mb-8">Kiti ekosistemos partneriai</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ecosystemPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
              className="p-6 border border-black/10 rounded-xl bg-white hover:border-black/20 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="text-4xl mb-3">{partner.logo}</div>
              <div className="text-xs text-black/40 uppercase tracking-wide mb-1">
                {partner.category}
              </div>
              <h3 className="text-lg font-bold mb-2">{partner.name}</h3>
              <p className="text-sm text-black/70 mb-3 leading-relaxed">{partner.description}</p>
              {partner.impact && (
                <div className="inline-block px-3 py-1 bg-black/5 rounded text-xs font-medium">
                  📈 {partner.impact}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Ecosystem Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-3xl mx-auto text-center bg-gradient-to-br from-black to-black/90 text-white p-12 rounded-2xl shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6">Kodėl ekosistema — mūsų konkurencinis pranašumas?</h2>
        <p className="text-lg text-white/90 leading-relaxed mb-8">
          Konkurentai parduoda tik automobilius. <strong>Mes kuriame pilną ekosistemą</strong> — nuo pirkimo iki
          priežiūros, nuo draudimo iki finansavimo. Premium Auto Spa partnerystė užbaigia pilną customer journey.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-4xl mb-3">💰</div>
            <div className="font-bold mb-2 text-lg">Didesnis revenue</div>
            <div className="text-sm text-white/70">Cross-sell į detailing, draudimą, finansavimą</div>
          </div>
          <div>
            <div className="text-4xl mb-3">🔒</div>
            <div className="font-bold mb-2 text-lg">Lock-in efektas</div>
            <div className="text-sm text-white/70">Klientai lieka ekosistemoje ilgam</div>
          </div>
          <div>
            <div className="text-4xl mb-3">🚀</div>
            <div className="font-bold mb-2 text-lg">One-stop-shop</div>
            <div className="text-sm text-white/70">Viskas vienoje vietoje — WOW efektas</div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
