import { MDXRemote } from 'next-mdx-remote/rsc'
import { readFile } from 'fs/promises'
import { join } from 'path'
import Image from 'next/image'
import Section from '@/components/Section'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Suspense } from 'react'
import { useMDXComponents } from '@/components/mdx-components'
import { extractSummaryMetrics, type SummaryMetric } from '@/lib/extractSummaryMetrics'
import { getLastUpdated } from '@/lib/lastUpdated'
import DeckTOC from '@/components/DeckTOC'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import DeckHero from '@/components/DeckHero'
import SkeletonDeck from '@/components/SkeletonDeck'
import TractionTimeline from '@/components/TractionTimeline'

interface TocItem {
  id: string
  title: string
  number: number
}

function extractTocFromMdx(source: string): TocItem[] {
  const h2Regex = /^##\s+(.+)$/gm
  const toc: TocItem[] = []
  let match
  let number = 0

  while ((match = h2Regex.exec(source)) !== null) {
    number++
    const title = match[1].trim()
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    toc.push({ id, title, number })
  }

  return toc
}

function SummaryStrip({ metrics }: { metrics: SummaryMetric[] }) {
  if (metrics.length === 0) return null

  return (
    <div className="summary-strip">
      {metrics.map((metric, idx) => (
        <div key={idx} className="summary-card">
          <div className="label-caps text-black/40 mb-2">{metric.label}</div>
          <div className="summary-value">{metric.value}</div>
          {metric.sublabel && (
            <div className="text-xs text-black/40 uppercase tracking-wide mt-1">
              {metric.sublabel}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

async function MDXContent() {
  try {
    const contentPath = join(process.cwd(), 'content', 'business-plan.mdx')
    const source = await readFile(contentPath, 'utf8')

    // Extract TOC from h2 headings
    const toc = extractTocFromMdx(source)

    // Extract summary metrics from Key Highlights
    const summaryMetrics = extractSummaryMetrics(source)

    // Get last updated info from Git
    const lastUpdated = getLastUpdated('content/business-plan.mdx')

    // Check if MDX already has confidential label
    const hasConfidentialLabel = source.includes('**CONFIDENTIAL')

    return (
      <>
        <ScrollProgress />
        <BackToTop />

        {/* Hero Section */}
        <DeckHero />

        {/* Main Article Anchor */}
        <div id="main-article" className="scroll-mt-28" />

        <div className="deck-layout">
          {/* Sidebar TOC - hidden on mobile, sticky on desktop */}
          <aside className="deck-sidebar">
            <DeckTOC items={toc} />
          </aside>

          {/* Main content */}
          <div className="deck-main">
            {/* Centered logo - hidden in print */}
            <Image
              className="deck-logo"
              src="/wheel-street-logo.png"
              alt="Wheelstreet logo"
              width={120}
              height={120}
              priority
            />

            {!hasConfidentialLabel && (
              <div className="mb-2">
                <span className="label-caps text-black/40">
                  CONFIDENTIAL — WheelStreet Invest — {new Date().toISOString().split('T')[0]}
                </span>
              </div>
            )}

            {/* Version info badge */}
            <div className="mb-6">
              <span className="label-caps text-black/40">
                Last updated: v{lastUpdated.date} • {lastUpdated.hash}
              </span>
            </div>

            {/* Summary strip with key metrics */}
            <SummaryStrip metrics={summaryMetrics} />

            {/* Traction Timeline */}
            <TractionTimeline />

            <article className="prose prose-lg prose-deck">
              <MDXRemote source={source} components={useMDXComponents({})} />
            </article>
          </div>
        </div>
      </>
    )
  } catch (error) {
    console.error('Failed to load business plan:', error)
    return (
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold mb-4">Deck Not Available</h1>
        <p className="text-lg text-black/60">
          The business plan document could not be loaded. Please contact support.
        </p>
      </div>
    )
  }
}

export default function DeckPage() {
  return (
    <ErrorBoundary>
      <Section className="pt-6 pb-16">
        <Suspense fallback={<SkeletonDeck />}>
          <MDXContent />
        </Suspense>
      </Section>
    </ErrorBoundary>
  )
}
