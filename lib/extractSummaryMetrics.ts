export interface SummaryMetric {
  label: string
  value: string
  sublabel?: string
}

export function extractSummaryMetrics(mdxSource: string): SummaryMetric[] {
  // Try to extract from "Key Highlights" section
  const keyHighlightsMatch = mdxSource.match(/## Key Highlights\s*([\s\S]*?)(?=\n##|\n---|\z)/i)

  if (!keyHighlightsMatch) {
    return []
  }

  const highlightsContent = keyHighlightsMatch[1]
  const metrics: SummaryMetric[] = []

  // Extract MRR Range
  const mrrMatch = highlightsContent.match(/MRR Range:\*\*\s*([\d,]+-[\d,]+)\s*EUR\s*\(current\)/i)
  if (mrrMatch) {
    metrics.push({
      label: 'Monthly Revenue',
      value: `${mrrMatch[1]} EUR`,
      sublabel: 'current'
    })
  }

  // Extract Gross Margin
  const marginMatch = highlightsContent.match(/Gross Margin:\*\*\s*(\d+%[^(]*)/i)
  if (marginMatch) {
    const margin = marginMatch[1].includes('brokerage')
      ? '4% / 20-30%'
      : marginMatch[1].trim()
    metrics.push({
      label: 'Gross Margin',
      value: margin,
      sublabel: 'broker / import'
    })
  }

  // Extract 24-Month Target for growth
  const targetMatch = highlightsContent.match(/24-Month Target:\*\*\s*([\d,]+-[\d,]+)\s*EUR\/month/i)
  if (targetMatch) {
    // Calculate rough growth multiple
    const currentLow = parseInt(mrrMatch?.[1].split('-')[0].replace(/,/g, '') || '20000')
    const targetLow = parseInt(targetMatch[1].split('-')[0].replace(/,/g, '') || '250000')
    const growthMultiple = Math.round((targetLow / currentLow) * 10) / 10

    metrics.push({
      label: '24M Growth',
      value: `${growthMultiple}x`,
      sublabel: 'target multiple'
    })
  }

  // Extract Import Margins
  const importMatch = highlightsContent.match(/Import Margins:\*\*\s*([\d-]+%)/i)
  if (importMatch) {
    metrics.push({
      label: 'Import Margin',
      value: importMatch[1],
      sublabel: 'avg per vehicle'
    })
  }

  return metrics.slice(0, 4) // Return max 4 metrics
}
