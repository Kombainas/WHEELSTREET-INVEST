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
  subheadline: 'Keičiame €10B automobilių rinką su technologija ir ekosistemos modeliu',
  fundraise: {
    amount: '€1,000,000',
    equity: 'už 20-30% equity',
  },
  valuation: {
    amount: '€3.3-5M',
    label: 'Post-money valuation',
  },
  target: {
    label: '24 mėn tikslas',
    amount: '€250-330K',
    sublabel: 'Mėnesinės pajamos',
  },
  useOfFunds: [
    {
      emoji: '📦',
      title: 'Inventorius (40%)',
      description: '200-300 automobilių atsargos',
    },
    {
      emoji: '👥',
      title: 'Komanda (30%)',
      description: '15-20 specialistų',
    },
    {
      emoji: '🌍',
      title: 'Plėtra (20%)',
      description: 'Latvija, Kinijos importas',
    },
    {
      emoji: '💻',
      title: 'Technologijos (10%)',
      description: 'AI, automatizacija',
    },
  ],
}
