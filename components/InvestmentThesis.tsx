interface ThesisCard {
  heading: string
  body: string
}

const thesisCards: ThesisCard[] = [
  {
    heading: 'Problema',
    body: 'Naudotų auto rinka išskaidyta, lėta ir neskaidri.',
  },
  {
    heading: 'Sprendimas',
    body: 'Wheelstreet: 24 h atsiskaitymas, skaidrumas ir AI valdoma ekosistema.',
  },
  {
    heading: 'Kodėl dabar',
    body: 'EV augimas ir tech adopcija Baltijos šalyse sukuria tobulą laiką.',
  },
]

export default function InvestmentThesis() {
  return (
    <section className="my-12 md:my-16">
      <h2 className="text-2xl font-bold mb-8 text-center">Investment Thesis</h2>

      <div className="thesis-grid">
        {thesisCards.map((card) => (
          <div key={card.heading} className="thesis-card">
            <h3 className="label-caps text-black mb-4 text-base">{card.heading}</h3>
            <p className="text-sm leading-relaxed text-black/80">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
