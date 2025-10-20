import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const dynamic = 'force-dynamic'

interface AnalyticsEvent {
  timestamp: string
  type: 'page_view' | 'search' | 'download' | 'section_view'
  data: {
    page?: string
    query?: string
    filename?: string
    section?: string
    [key: string]: any
  }
  sessionId: string
}

export async function POST(request: NextRequest) {
  try {
    const session = request.cookies.get('investor_session')
    const validToken = process.env.SESSION_TOKEN

    if (!session || session.value !== validToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { type, data } = body

    if (!type) {
      return NextResponse.json(
        { error: 'Event type is required' },
        { status: 400 }
      )
    }

    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      type,
      data: data || {},
      sessionId: session.value,
    }

    // Store analytics in data/analytics.json
    const dataDir = join(process.cwd(), 'data')
    const analyticsPath = join(dataDir, 'analytics.json')

    // Ensure data directory exists
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true })
    }

    // Read existing analytics or create new array
    let analytics: AnalyticsEvent[] = []
    if (existsSync(analyticsPath)) {
      try {
        const content = await readFile(analyticsPath, 'utf-8')
        analytics = JSON.parse(content)
      } catch (error) {
        console.error('Failed to read analytics file:', error)
      }
    }

    // Add new event
    analytics.push(event)

    // Keep only last 10000 events to prevent file from growing too large
    if (analytics.length > 10000) {
      analytics = analytics.slice(-10000)
    }

    // Write back to file
    await writeFile(analyticsPath, JSON.stringify(analytics, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve analytics (for admin/debugging)
export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get('investor_session')
    const validToken = process.env.SESSION_TOKEN

    if (!session || session.value !== validToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const analyticsPath = join(process.cwd(), 'data', 'analytics.json')

    if (!existsSync(analyticsPath)) {
      return NextResponse.json({ events: [] })
    }

    const content = await readFile(analyticsPath, 'utf-8')
    const analytics = JSON.parse(content)

    // Get summary stats
    const stats = {
      total: analytics.length,
      byType: analytics.reduce((acc: any, event: AnalyticsEvent) => {
        acc[event.type] = (acc[event.type] || 0) + 1
        return acc
      }, {}),
      topSearches: analytics
        .filter((e: AnalyticsEvent) => e.type === 'search')
        .map((e: AnalyticsEvent) => e.data.query)
        .reduce((acc: any, query: string) => {
          acc[query] = (acc[query] || 0) + 1
          return acc
        }, {}),
      topPages: analytics
        .filter((e: AnalyticsEvent) => e.type === 'page_view')
        .map((e: AnalyticsEvent) => e.data.page)
        .reduce((acc: any, page: string) => {
          acc[page] = (acc[page] || 0) + 1
          return acc
        }, {}),
    }

    return NextResponse.json({ stats, events: analytics.slice(-100) })
  } catch (error) {
    console.error('Analytics retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve analytics' },
      { status: 500 }
    )
  }
}
