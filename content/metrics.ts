export interface Metric {
  label: string
  value: number
  format: 'currency' | 'percentage' | 'number' | 'ratio'
  decimals?: number
  prefix?: string
  suffix?: string
}

export const metrics: Metric[] = [
  {
    label: 'Monthly Recurring Revenue',
    value: 208000,
    format: 'currency',
    decimals: 0,
  },
  {
    label: 'Gross Margin',
    value: 68.5,
    format: 'percentage',
    decimals: 1,
  },
  {
    label: 'YoY Growth',
    value: 150,
    format: 'percentage',
    decimals: 0,
  },
  {
    label: 'CAC / LTV Ratio',
    value: 14.8,
    format: 'ratio',
    decimals: 1,
  },
]

export function formatMetric(metric: Metric): string {
  const { value, format, decimals = 0, prefix, suffix } = metric

  switch (format) {
    case 'currency':
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)
      return prefix ? `${prefix}${formatted}` : formatted

    case 'percentage':
      const pct = value.toFixed(decimals)
      return `${prefix || ''}${pct}%${suffix || ''}`

    case 'ratio':
      const ratio = value.toFixed(decimals)
      return `1 : ${ratio}`

    case 'number':
      const num = value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      return `${prefix || ''}${num}${suffix || ''}`

    default:
      return value.toString()
  }
}
