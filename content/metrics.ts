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
    label: 'Mėnesinės pajamos',
    value: 20000,
    format: 'currency',
    decimals: 0,
  },
  {
    label: 'Vidutinė marža',
    value: 950,
    format: 'currency',
    decimals: 0,
  },
  {
    label: 'Atsiskaitymas',
    value: 24,
    format: 'number',
    decimals: 0,
    suffix: 'h',
  },
  {
    label: 'Peržiūros (90d)',
    value: 400,
    format: 'number',
    decimals: 0,
    suffix: 'K+',
  },
]

export function formatMetric(metric: Metric): string {
  const { value, format, decimals = 0, prefix, suffix } = metric

  switch (format) {
    case 'currency':
      const formatted = new Intl.NumberFormat('lt-LT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)
      const result = prefix ? `${prefix}${formatted}` : formatted
      return suffix ? `${result}${suffix}` : result

    case 'percentage':
      const pct = value.toFixed(decimals)
      return `${prefix || ''}${pct}%${suffix || ''}`

    case 'ratio':
      const ratio = value.toFixed(decimals)
      return `1 : ${ratio}`

    case 'number':
      const num = value.toLocaleString('lt-LT', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      return `${prefix || ''}${num}${suffix || ''}`

    default:
      return value.toString()
  }
}
