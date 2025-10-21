export interface InvestmentPitch {
  badge: string
  headline: string
  subheadline: string
  fundraise: {
    amount: string
    equity: string
  }
  valuation: {
    amount: string
    label: string
  }
  target: {
    label: string
    amount: string
    sublabel: string
  }
  useOfFunds: Array<{
    emoji: string
    title: string
    description: string
  }>
}

export const investmentPitch: InvestmentPitch = {
  badge: '💰 Investicinė galimybė',
  headline: 'Investuokite į greičiausiai augančią automobilių platformą Baltijos šalyse',
  subheadline: 'Keičiame €7B automobilių rinką su technologijomir aukščiausia kokybe',
  fundraise: {
    amount: '€X?',
    equity: 'už 20±% equity',
  },
  valuation: {
    amount: '€3.3-5M',
    label: 'Post-money valuation',
  },
  target: {
    label: '24 mėn tikslas',
    amount: '€250-330K',
    sublabel: 'Mėnesinės pajamos (Be importo) ',
  },
  useOfFunds: [
    {
      emoji: '📦',
      title: 'Inventorius (40%)',
      description: '200-300 automobilių atsargos',
    },
    {
      emoji: '👥',
      title: 'TOP LYGIO Komanda (15%)',
      description: '20 žmonių komanda',
    },
    {
      emoji: '🌍',
      title: 'Plėtra + Operacinės išlaidos (35%)',
      description: 'Latvija, Kinijos importas',
    },
    {
      emoji: '💻',
      title: 'Technologijos (5%)',
      description: 'AI, automatizacija',
    },
  ],
}
