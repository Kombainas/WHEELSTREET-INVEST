interface AICard {
  title: string
  description: string
}

const aiCards: AICard[] = [
  {
    title: 'Dinaminių kainų variklis',
    description: 'Realiojo laiko kainodara pagal paklausą, sezoną ir konkurentų kainas.',
  },
  {
    title: 'Lead scoring',
    description: 'Modelis nuspėja, kurie užklausimai konvertuos, ir paskirsto prioritetus.',
  },
  {
    title: 'Sukčiavimo prevencija',
    description: 'CV/nuotraukų anomalijų aptikimas, istorijos neatitikimų žymėjimas.',
  },
  {
    title: 'Predictive maintenance',
    description: 'Telematikos duomenys prognozuoja priežiūrą ir mažina grįžimus.',
  },
]

const techNotes: string[] = [
  'Real-time scoring pipeline (RSC + queue)',
  'Modelių versijavimas ir audit trail',
  'Privacy-first: anonimizavimas ir teisėti pagrindai',
]

export default function WheelstreetAI() {
  return (
    <section className="my-12 md:my-16" aria-labelledby="ai-section-heading">
      {/* Section Heading */}
      <h2 id="ai-section-heading" className="text-2xl font-bold mb-4 text-center">
        Wheelstreet.AI — platformos smegenys
      </h2>

      {/* Intro Sentence */}
      <p className="text-center text-black/70 mb-8 max-w-3xl mx-auto">
        AI variklis, valdantis kainodarą, lead prioritetus, sukčiavimo prevenciją ir priežiūros
        prognozes.
      </p>

      {/* 4 AI Cards */}
      <div className="ai-grid">
        {aiCards.map((card) => (
          <div key={card.title} className="ai-card">
            <h3 className="label-caps text-black mb-3">{card.title}</h3>
            <p className="text-sm text-black/70 leading-relaxed">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Inline SVG Diagram */}
      <div className="ai-diagram" aria-hidden="true">
        <svg
          viewBox="0 0 800 120"
          className="w-full h-auto max-w-4xl mx-auto"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Data Sources Box */}
          <rect x="20" y="40" width="140" height="40" rx="4" className="fill-none stroke-black/30" />
          <text x="90" y="65" textAnchor="middle" className="text-xs fill-black" fontSize="12">
            Data sources
          </text>

          {/* Arrow 1 */}
          <line x1="160" y1="60" x2="220" y2="60" className="stroke-black/30" />
          <polygon points="220,60 215,57 215,63" className="fill-black/30 stroke-none" />

          {/* AI Core Box */}
          <rect x="220" y="40" width="120" height="40" rx="4" className="fill-black/5 stroke-black" />
          <text x="280" y="65" textAnchor="middle" className="text-xs fill-black font-semibold" fontSize="12">
            AI Core
          </text>

          {/* Arrow 2 */}
          <line x1="340" y1="60" x2="400" y2="60" className="stroke-black/30" />
          <polygon points="400,60 395,57 395,63" className="fill-black/30 stroke-none" />

          {/* Output Boxes */}
          {/* Pricing */}
          <rect x="400" y="10" width="90" height="30" rx="3" className="fill-none stroke-black/20" />
          <text x="445" y="29" textAnchor="middle" className="text-xs fill-black/70" fontSize="11">
            Pricing
          </text>

          {/* Leads */}
          <rect x="400" y="45" width="90" height="30" rx="3" className="fill-none stroke-black/20" />
          <text x="445" y="64" textAnchor="middle" className="text-xs fill-black/70" fontSize="11">
            Leads
          </text>

          {/* Fraud */}
          <rect x="510" y="10" width="90" height="30" rx="3" className="fill-none stroke-black/20" />
          <text x="555" y="29" textAnchor="middle" className="text-xs fill-black/70" fontSize="11">
            Fraud
          </text>

          {/* Maintenance */}
          <rect x="510" y="45" width="100" height="30" rx="3" className="fill-none stroke-black/20" />
          <text x="560" y="64" textAnchor="middle" className="text-xs fill-black/70" fontSize="11">
            Maintenance
          </text>

          {/* Connecting lines from AI Core to outputs */}
          <line x1="340" y1="60" x2="370" y2="25" className="stroke-black/20" />
          <line x1="370" y1="25" x2="400" y2="25" className="stroke-black/20" />

          <line x1="340" y1="60" x2="400" y2="60" className="stroke-black/20" />

          <line x1="340" y1="60" x2="480" y2="25" className="stroke-black/20" />
          <line x1="480" y1="25" x2="510" y2="25" className="stroke-black/20" />

          <line x1="340" y1="60" x2="480" y2="60" className="stroke-black/20" />
          <line x1="480" y1="60" x2="510" y2="60" className="stroke-black/20" />
        </svg>
      </div>

      {/* Tech Notes */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h3 className="label-caps text-black/60 mb-3">Tech notes</h3>
        <ul className="space-y-2 text-sm text-black/70">
          {techNotes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-black/40 mt-0.5">–</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
