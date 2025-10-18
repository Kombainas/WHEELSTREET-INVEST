interface Benefit {
  title: string
  description: string
  icon: string
}

const benefits: Benefit[] = [
  {
    title: '24h atsiskaitymas',
    description: 'Greičiausias atsiskaitymas rinkoje - pinigai per 24 valandas, kai konkurentai laiko 14-60 dienų.',
    icon: '⚡',
  },
  {
    title: 'Skaidrus 4% komisas',
    description: 'Fiksuotas ir aiškus komisas be paslėptų mokesčių. Žinote tikslią kainą nuo pat pradžių.',
    icon: '💎',
  },
  {
    title: 'Integruota ekosistema',
    description: 'Brokerystė, draudimas, lizingas ir Kinijos importas - vieno langelio aptarnavimas visam procesui.',
    icon: '🔗',
  },
  {
    title: 'Organinis augimas',
    description: '400K+ socialinės medijos peržiūrų per 90 dienų be didelių reklamos biudžetų. Tikras community.',
    icon: '📈',
  },
]

export default function WhyWheelStreet() {
  return (
    <section id="why" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Kodėl WheelStreet?
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Keturios pagrindinės priežastys, kodėl keičiame automobilių pirkimo ir pardavimo rinką Baltijos šalyse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="border border-white/20 p-8 hover:border-white/40 hover:bg-white/5 transition-all duration-200"
              >
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-white/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
