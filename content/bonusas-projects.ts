export interface BonusProject {
  id: string
  title: string
  description: string
  pdfPath: string
  category: string
  metric?: {
    label: string
    value: string
  }
}

export const bonusProjects: BonusProject[] = [
  {
    id: '1',
    title: 'Elektrinių paspirtukų tinklas Vilniuje',
    description: 'Pilnas e-mobility ekosistemos plėtros planas sostinėje. Aprėpia infrastructure, partnerybes su savivaldybe ir revenue projections.',
    pdfPath: '/files/bonusas/projektas-1.pdf',
    category: 'Mobility',
    metric: {
      label: 'Projected IRR',
      value: '34%'
    }
  },
  {
    id: '2',
    title: 'Micro-hub logistikos centrai',
    description: 'Last-mile delivery sprendimas per decentralizuotus logistikos hub\'us. Integruojasi su WheelStreet marketplace platform.',
    pdfPath: '/files/bonusas/projektas-2.pdf',
    category: 'Logistics',
    metric: {
      label: 'Break-even',
      value: '18 mėn.'
    }
  },
  {
    id: '3',
    title: 'AI-powered dalių diagnostika',
    description: 'Machine learning sistema prognozuojanti techninės priežiūros poreikius. Sumažina downtime iki 40% ir optimizuoja inventory.',
    pdfPath: '/files/bonusas/projektas-3.pdf',
    category: 'Technology',
    metric: {
      label: 'Cost reduction',
      value: '-40%'
    }
  },
  {
    id: '4',
    title: 'Corporate mobility programos',
    description: 'B2B employee benefit paketas integruojantis shared mobility į darbuotojų kompensacijas. Pilotinis projektas su 3 Fortune 500 įmonėmis.',
    pdfPath: '/files/bonusas/projektas-4.pdf',
    category: 'B2B Services',
    metric: {
      label: 'Contract value',
      value: '€420K'
    }
  },
  {
    id: '5',
    title: 'Green financing partnerystė',
    description: 'Sustainability-linked finansavimo schema su EU Green Deal alignment. Inkorporuoja carbon credits ir ESG reporting framework.',
    pdfPath: '/files/bonusas/projektas-5.pdf',
    category: 'Finance',
    metric: {
      label: 'EU funding',
      value: '€1.2M'
    }
  }
]
