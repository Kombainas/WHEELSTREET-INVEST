import { NextRequest, NextResponse } from 'next/server'
import { listProjects } from '@/lib/projects/loader'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const slugs = listProjects()
    const projects = []

    for (const slug of slugs) {
      const projectPath = join(process.cwd(), 'content', 'projects', slug)
      const configPath = join(projectPath, 'config.json')
      const metadataPath = join(projectPath, 'metadata.json')

      if (existsSync(configPath)) {
        const config = JSON.parse(readFileSync(configPath, 'utf-8'))
        const metadata = existsSync(metadataPath)
          ? JSON.parse(readFileSync(metadataPath, 'utf-8'))
          : null

        projects.push({
          slug,
          name: config.name,
          fundraise: config.fundraise,
          equity: config.equity,
          createdAt: metadata?.createdAt,
          lastModified: metadata?.lastModified,
        })
      }
    }

    // Sort by creation date (newest first)
    projects.sort((a, b) => {
      if (!a.createdAt) return 1
      if (!b.createdAt) return -1
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })

    return NextResponse.json({ projects })
  } catch (error) {
    console.error('Error listing projects:', error)
    return NextResponse.json(
      {
        error: 'Failed to list projects',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
