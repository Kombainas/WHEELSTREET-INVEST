import Section from '@/components/Section'

export default function PrivacyPage() {
  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Privatumo politika</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-black/70 mb-8">
            Paskutinį kartą atnaujinta: {new Date().toLocaleDateString('lt-LT')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Informacijos rinkimas</h2>
          <p className="mb-4">
            WheelStreet Invest renka ir tvarko asmens duomenis laikydamasi BDAR (Bendro duomenų apsaugos reglamento)
            reikalavimų. Renkame tik būtiną informaciją investavimo proceso vykdymui.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Surinktų duomenų naudojimas</h2>
          <p className="mb-4">
            Jūsų pateikti duomenys naudojami:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Investavimo galimybių vertinimui</li>
            <li>Komunikacijai su investuotojais</li>
            <li>Teisinių reikalavimų vykdymui</li>
            <li>Platformos saugumo užtikrinimui</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Duomenų saugumas</h2>
          <p className="mb-4">
            Naudojame šiuolaikines saugumo priemones jūsų duomenų apsaugai. Prieiga prie konfidencialios
            informacijos yra ribojama ir kontroliuojama.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Jūsų teisės</h2>
          <p className="mb-4">
            Turite teisę:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Susipažinti su savo duomenimis</li>
            <li>Prašyti ištaisyti netikslius duomenis</li>
            <li>Prašyti ištrinti savo duomenis</li>
            <li>Atšaukti sutikimą duomenų tvarkymui</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Slapukai (Cookies)</h2>
          <p className="mb-4">
            Naudojame būtinus slapukus platformos funkcionalumui užtikrinti. Analitiniai slapukai
            naudojami tik gavus jūsų sutikimą.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Kontaktai</h2>
          <p className="mb-4">
            Dėl duomenų apsaugos klausimų kreipkitės:{' '}
            <a href="mailto:invest@wheelstreet.lt" className="text-black underline hover:opacity-70">
              invest@wheelstreet.lt
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
