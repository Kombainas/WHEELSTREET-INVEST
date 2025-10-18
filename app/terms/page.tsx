import Section from '@/components/Section'

export default function TermsPage() {
  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">Naudojimo sąlygos</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-black/70 mb-8">
            Paskutinį kartą atnaujinta: {new Date().toLocaleDateString('lt-LT')}
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Bendrosios nuostatos</h2>
          <p className="mb-4">
            Šios naudojimo sąlygos reglamentuoja prieigą prie WheelStreet Invest investuotojų platformos
            ir jos naudojimą. Naudodamiesi platforma, sutinkate su šiomis sąlygomis.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Prieigos teisės</h2>
          <p className="mb-4">
            Prieiga prie platformos suteikiama tik patvirtintiems ir kvalifikuotiems investuotojams.
            WheelStreet Invest pasilieka teisę bet kuriuo metu apriboti ar nutraukti prieigą.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Konfidencialumas</h2>
          <p className="mb-4">
            Visa informacija, pateikta šioje platformoje, yra konfidenciali ir skirta tik asmeniniam
            naudojimui. Draudžiama:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Dalintis prieigos duomenimis su trečiosiomis šalimis</li>
            <li>Kopijuoti ar platinti verslo planą ir finansinę informaciją</li>
            <li>Naudoti informaciją komerciniais tikslais be raštiško sutikimo</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Investavimo rizikos</h2>
          <p className="mb-4">
            Investavimas į WheelStreet apima riziką. Praeiti rezultatai negarantuoja būsimų rezultatų.
            Investuokite tik tas lėšas, kurias galite leisti prarasti.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Intelektinė nuosavybė</h2>
          <p className="mb-4">
            Visos teisės į platformos turinį, įskaitant tekstą, grafikus, logotipus ir programinę įrangą,
            priklauso WheelStreet Invest arba jos licenciatams.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Atsakomybės apribojimas</h2>
          <p className="mb-4">
            WheelStreet Invest nėra atsakinga už nuostolius, kylančius dėl platformos naudojimo ar
            investavimo sprendimų. Visa informacija teikiama "kaip yra" be jokių garantijų.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Sąlygų pakeitimai</h2>
          <p className="mb-4">
            WheelStreet Invest pasilieka teisę bet kuriuo metu pakeisti šias sąlygas. Esminiai pakeitimai
            bus pranešti el. paštu.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Taikoma teisė</h2>
          <p className="mb-4">
            Šioms sąlygoms taikoma Lietuvos Respublikos teisė. Ginčai sprendžiami Lietuvos Respublikos
            teismuose.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">9. Kontaktai</h2>
          <p className="mb-4">
            Dėl klausimų apie naudojimo sąlygas kreipkitės:{' '}
            <a href="mailto:invest@wheelstreet.lt" className="text-black underline hover:opacity-70">
              invest@wheelstreet.lt
            </a>
          </p>
        </div>
      </div>
    </Section>
  )
}
