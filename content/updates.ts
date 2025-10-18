export interface Update {
  date: string
  title: string
  body: string
  pinned?: boolean
}

export const updates: Update[] = [
  {
    date: '2025-01-15',
    title: 'Investicinio plano atnaujinimas ir 2025 metų tikslai',
    body: `Pasiruošę naujam augimo etapui su aiškia strategija plėstis Baltijos šalyse ir didinti importo apimtis iš Kinijos.

Pagrindiniai rodikliai:
- Mėnesinės pajamos: 15,000-25,000 EUR (paskutiniai 3 mėn)
- Vidutinė marža: ~950 EUR per sandorį
- Socialinės medijos pasiekimas: ↑400K+ organinių peržiūrų (90d)
- Atsiskaitymo greitis: 24h (greičiausi rinkoje)

2025 metų fokusas:
- Pasiekti 200-300 automobilių inventorių
- 80 automobilių pardavimai/mėn (Lietuva)
- Kinijos importo programos plėtra (120 auto/metai)
- Latvijos rinkos paruošimas (startas Q4)
- Komandos plėtra: 15-20 žmonių`,
    pinned: true,
  },
  {
    date: '2024-10-15',
    title: 'Socialinių medijų proveržis ir organinis augimas',
    body: `Spalio mėnesį pasiekėme rekordinius socialinius rodiklius, įrodydami platformos virusinį potencialą be didelių reklamos biudžetų.

Instagram rezultatai (90 dienų):
- 271,921 peržiūra (88.4% organinės)
- Populiariausias Reels: 121K peržiūrų
- 119,872 paskyros pasiektos (↑377% augimas)
- 84% peržiūrų iš ne-sekėjų

Rugsėjo proveržis:
- 147K peržiūrų (x15 kartų daugiau nei rugpjūtį)
- 750 sekėjų (615 naujų)
- Keletas Reels pasiekė ↑400K+ peržiūrų

Tai patvirtina komandos retą gebėjimą kurti virusinio pobūdžio turinį, kuris yra milžiniškas konkurencinis pranašumas automobilių rinkoje.`,
  },
  {
    date: '2024-09-01',
    title: 'WSInsurance ir lizingo sprendimų integracija',
    body: `Sėkmingai integravome papildomas paslaugas į Wheelstreet ekosistemą, didindami vidutinę pajamą per sandorį.

Produktų prisijungimo rodikliai:
- Garantijos: 20% attach rate (800 EUR/sandoris)
- Lizingo sprendimai: 30% attach rate (~300 EUR/sandoris)
- WSInsurance draudimo paketai aktyviai siūlomi klientams
- Kombinuotas vidutinis komisas: ~950 EUR per automobilį

Tikslas 2025:
- WSInsurance attach rate padidinti iki 25%+
- Išplėsti lizingo partnerystes su 2-3 naujais tiekėjais
- Vieno langelio aptarnavimo modelis - nuo įvertinimo iki pinigų gavimo`,
  },
]
