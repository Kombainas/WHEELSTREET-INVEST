// Type definitions for multi-project system

export interface ProjectConfig {
  id: string
  name: string
  slug: string
  industry: string
  tagline: string
  logo: string
  status: 'draft' | 'active'
  fundraise: {
    amount: string
    equity: string
    valuation: string
    structure: string
  }
  target: {
    timeframe: string
    mrr: string
    arr: string
    breakEven: string
  }
  theme: {
    primaryColor: string
    accentColor: string
    gradient: string
  }
  features: {
    showLoadingScreen: boolean
    showRevenueChart: boolean
    showSocialMediaStats: boolean
    showPartnerSection: boolean
    showCompetitiveTable: boolean
    showFinancialModel: boolean
    showInvestmentCalculator: boolean
    showExitStrategy: boolean
  }
}

export interface ProjectMetric {
  label: string
  value: number
  format: 'currency' | 'percentage' | 'number' | 'ratio'
  decimals?: number
  prefix?: string
  suffix?: string
  growth?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface ProjectTeamMember {
  name: string
  role: string
  linkedin?: string
  image?: string
  bio?: string
}

export interface ProjectFinancials {
  revenue: {
    current: number
    target: number
    history: Array<{
      month: string
      revenue: number
      label?: string
    }>
  }
  costs: {
    cogs: number
    team: number
    marketing: number
    opex: number
  }
  projections?: {
    month: string
    revenue: number
    label?: string
  }[]
}

export interface Project {
  config: ProjectConfig
  metrics?: ProjectMetric[]
  team?: ProjectTeamMember[]
  financials?: ProjectFinancials
}
