import Section from '@/components/Section'

export default function BookACallPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_BOOK_URL || 'https://calendly.com/your-link'

  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Suplanuoti pokalbį</h1>
        <p className="text-lg text-black/70 mb-12">
          Pasirinkite laiką aptarti investavimo galimybes
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">Ko tikėtis</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• 30 minučių įvadinis skambutis</li>
              <li>• Išsami verslo modelio apžvalga</li>
              <li>• Klausimų ir atsakymų sesija</li>
              <li>• Investavimo proceso pristatymas</li>
            </ul>
          </div>

          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">Su kuo susitiksite</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Įkūrėjų komandos nariai</li>
              <li>• Investuotojų santykių vadovas</li>
              <li>• Techninė vadovybė (jei reikia)</li>
            </ul>
          </div>

          <div className="border border-black/10 p-6">
            <h3 className="font-bold mb-3">Kiti žingsniai</h3>
            <ul className="space-y-2 text-sm text-black/70">
              <li>• Prieiga prie duomenų kambario</li>
              <li>• Papildoma medžiaga</li>
              <li>• Sąlygų aptarimas</li>
              <li>• Due diligence procesas</li>
            </ul>
          </div>
        </div>

        <div className="border border-black/10 p-2">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="700"
            frameBorder="0"
            title="Suplanuoti pokalbį"
            className="w-full"
          />
        </div>
      </div>
    </Section>
  )
}
