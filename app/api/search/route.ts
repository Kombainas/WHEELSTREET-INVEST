import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { updates } from '@/content/updates'

export const dynamic = 'force-dynamic'

interface SearchResult {
  title: string
  excerpt: string
  url: string
  type: 'deck' | 'update'
}

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

    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('q')?.toLowerCase() || ''

    if (query.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const results: SearchResult[] = []

    // Search in updates
    updates.forEach((update) => {
      const titleMatch = update.title.toLowerCase().includes(query)
      const bodyMatch = update.body.toLowerCase().includes(query)

      if (titleMatch || bodyMatch) {
        // Extract excerpt around the match
        let excerpt = update.body.substring(0, 150)
        if (bodyMatch && !titleMatch) {
          const matchIndex = update.body.toLowerCase().indexOf(query)
          const start = Math.max(0, matchIndex - 50)
          excerpt = '...' + update.body.substring(start, start + 150)
        }

        results.push({
          title: update.title,
          excerpt: excerpt.trim() + '...',
          url: '/updates',
          type: 'update'
        })
      }
    })

    // Search in deck content
    try {
      const deckPath = join(process.cwd(), 'content', 'business-plan.mdx')
      const deckContent = await readFile(deckPath, 'utf-8')

      // Extract headings and search
      const headingRegex = /^##\s+(.+)$/gm
      let match

      while ((match = headingRegex.exec(deckContent)) !== null) {
        const heading = match[1]
        const headingIndex = match.index

        // Get content after this heading (up to next heading or 500 chars)
        const nextHeadingMatch = headingRegex.exec(deckContent)
        const endIndex = nextHeadingMatch ? nextHeadingMatch.index : headingIndex + 500
        const sectionContent = deckContent.substring(headingIndex, endIndex)

        if (heading.toLowerCase().includes(query) || sectionContent.toLowerCase().includes(query)) {
          let excerpt = sectionContent.substring(0, 150).replace(/^##\s+.+$/m, '').trim()

          results.push({
            title: heading,
            excerpt: excerpt.substring(0, 150) + '...',
            url: '/deck',
            type: 'deck'
          })
        }
      }
    } catch (error) {
      console.error('Failed to search deck content:', error)
    }

    // Limit to top 10 results
    return NextResponse.json({ results: results.slice(0, 10) })
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    )
  }
}
