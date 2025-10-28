import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const projectPath = join(process.cwd(), 'content', 'projects', slug)

    // Check if project exists
    if (!existsSync(projectPath)) {
      return NextResponse.json(
        { error: `Project '${slug}' not found` },
        { status: 404 }
      )
    }

    // Read pitch-deck.txt if exists
    const pitchPath = join(projectPath, 'pitch-deck.txt')
    if (!existsSync(pitchPath)) {
      return NextResponse.json(
        { error: `No pitch deck saved for project '${slug}'` },
        { status: 404 }
      )
    }

    const pitchText = readFileSync(pitchPath, 'utf-8')

    return NextResponse.json({
      success: true,
      pitchText,
      slug,
    })
  } catch (error) {
    console.error('Error retrieving pitch deck:', error)
    return NextResponse.json(
      {
        error: 'Failed to retrieve pitch deck',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
