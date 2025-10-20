export interface FAQItem {
  question: string
  answer: string
  category: 'business' | 'market' | 'financials' | 'tech' | 'team'
}

export const faqs: FAQItem[] = [
  {
    question: 'Kodėl automotive marketplace dabar?',
    answer: 'Baltijos automobilių rinka yra €10B dydžio, bet vis dar labai fragmentuota ir neefektyvi. Traditional dealeriai dirba su застарыми procesais, lėtu atsiskaitymu (3-5 dienos), ir žema marža. WheelStreet keičia tai su 24h atsiskaitymu, aukštesne marža (€950 vs €600-700), ir tech-driven operacijomis. COVID pagreitino e-commerce įsiskverbimą į automotive – žmonės dabar perka automobilius online. Mes gaudome šį momentumą.',
    category: 'market',
  },
  {
    question: 'Kaip konkuruojate su tradiciniais dealeriais?',
    answer: 'Mūsų konkurencinis pranašumas yra greitis ir efektyvumas. Traditional dealeriai moka po 48-72h, mes – per 24h. Tai kritiškai svarbu pardavėjams, kuriems reikia greito cash flow. Be to, turime aukštesnę maržą (€950 vs €600-800) dėl optimizuotos supply chain ir žemesnių overhead costs. Taip pat turime viral social media presence (400K+ views, 88% organic), kurio dealeriai neturi. Galutinis rezultatas: greitesnis inventory turnover, didesnis seller satisfaction, ir stipresnis brand.',
    category: 'business',
  },
  {
    question: 'Koks jūsų revenue modelis?',
    answer: 'Gauname komisiją iš kiekvieno automobilio pardavimo (~€950 vidutiniškai). Papildomai gauname revenue iš attached services: warranties (~€800/deal, 20% attach rate), leasing solutions (~€300/deal, 30% attach rate), ir WSInsurance draudimo paketų. Targeting €250-330K mėnesinių pajamų per 24 mėnesius su 200-300 automobilių inventory ir 80 cars/month sales velocity Lietuvoje.',
    category: 'financials',
  },
  {
    question: 'Kokia jūsų expansion strategija?',
    answer: 'Phase 1 (2024-2025): Dominate Lietuvos rinka su 200-300 inventory. Phase 2 (2025 Q4): Latvijos market entry. Phase 3 (2025+): Kinijos importo programa – 120 cars/year direct import, higher margins. Phase 4 (2026+): Estonia expansion, full Baltic coverage. Kiekviename etape didinant inventory, komandą (15-20 žmonių), ir tech capabilities.',
    category: 'business',
  },
  {
    question: 'Kuo skiriasi jūsų tech platforma?',
    answer: 'Built modern tech stack (React/Next.js, Node.js, AI-powered matching). Key features: instant online valuations, 24h settlement automation, inventory management system, integrated financing/insurance marketplace, viral social media automation. Investuojame 10% lėšų (€100K) į AI ir automation, kad scale\'intume be proporcinio komandos augimo. Tikslas: procesai kurie dealeriams užtrunka savaites, mums – valandos.',
    category: 'tech',
  },
  {
    question: 'Ar turite traction?',
    answer: 'Taip! Dabartinės mėnesinės pajamos: €15-25K. Social media: 400K+ views per 90 dienų, 88% organic (viral growth be reklamos). Top Reels pasiekė 121K peržiūrų. Settlement speed: 24h (greičiausi rinkoje). Vidutinė marža: €950 per deal. Q3 augimas: +35%. Tai įrodo product-market fit ir viral brand potential.',
    category: 'business',
  },
  {
    question: 'Kas yra jūsų komandoje?',
    answer: 'Core team: CEO su 10+ metų automotive experience, CTO su tech & product expertise, COO su supply chain & operations background, CMO su viral marketing skills. Plus advisors iš automotive ir tech industry. Planuojame išaugti iki 15-20 žmonių komandą 2025 metais, fokusas operations, sales, ir tech roles.',
    category: 'team',
  },
  {
    question: 'Kokie yra pagrindiniai riskai?',
    answer: 'Market risk: Automotive rinka yra cikliška, ekonominiai nuosmukiai gali sumažinti demand. Competition: Existing dealeriai gali bandyti kopijuoti modelį. Regulatory: Automotive industry turi strict reguliacijas (licensing, safety, warranties). Execution risk: Scaling operations greitai reikalauja strong operational excellence. Mitigacija: Diversifikacija į Kinijos importą, strong cash reserves, regulatory compliance, experienced team. Žr. Risk Disclosures skirsnį pilnam sąrašui.',
    category: 'business',
  },
  {
    question: 'Kokia timeline iki exit?',
    answer: 'Target: 3-5 metai iki Series A arba acquisition. Realistinis scenario: dominate Baltic market (LT, LV, EE), pasiekti €3-5M ARR, tada strategic acquisition arba Series A round su major automotive/fintech player. Exit valuation target: €15-25M. Investitoriai gali tikėtis 5-10x return per 4-5 metus, jei execution sėkmingas.',
    category: 'financials',
  },
  {
    question: 'Kaip panaudosite €1M?',
    answer: 'Strateginis paskirstymas: 40% (€400K) inventory expansion iki 200-300 cars, 30% (€300K) komandos plėtra iki 15-20 žmonių, 20% (€200K) geographic expansion (Latvija) + Kinijos import program, 10% (€100K) tech & AI/automation. Tikslas: pasiekti break-even per 12-18 mėnesių ir €250-330K MRR per 24 mėnesius.',
    category: 'financials',
  },
]

export function getFAQsByCategory(category: FAQItem['category']) {
  return faqs.filter(faq => faq.category === category)
}

export const faqCategories = [
  { id: 'business' as const, label: 'Business Model', icon: '💼' },
  { id: 'market' as const, label: 'Market & Competition', icon: '🎯' },
  { id: 'financials' as const, label: 'Financials & ROI', icon: '💰' },
  { id: 'tech' as const, label: 'Technology', icon: '💻' },
  { id: 'team' as const, label: 'Team', icon: '👥' },
]
