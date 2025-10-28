import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import type { ProjectConfig } from '@/lib/projects/types'

export async function POST(request: NextRequest) {
  try {
    const { projectConfig, pitchText }: { projectConfig: ProjectConfig; pitchText?: string } = await request.json()

    // Validate required fields
    if (!projectConfig.id || !projectConfig.name || !projectConfig.slug) {
      return NextResponse.json(
        { error: 'Missing required fields: id, name, or slug' },
        { status: 400 }
      )
    }

    // Create project directory
    const projectPath = join(process.cwd(), 'content', 'projects', projectConfig.slug)

    // Check if project already exists
    if (existsSync(projectPath)) {
      return NextResponse.json(
        { error: `Project '${projectConfig.slug}' already exists. Please choose a different name.` },
        { status: 409 }
      )
    }

    // Create directory
    await mkdir(projectPath, { recursive: true })

    // Write config.json
    const configPath = join(projectPath, 'config.json')
    await writeFile(
      configPath,
      JSON.stringify(projectConfig, null, 2),
      'utf-8'
    )

    // Write pitch-deck.txt if provided
    if (pitchText && pitchText.trim()) {
      const pitchPath = join(projectPath, 'pitch-deck.txt')
      await writeFile(pitchPath, pitchText.trim(), 'utf-8')
    }

    // Write metadata.json
    const metadata = {
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      version: 1,
    }
    const metadataPath = join(projectPath, 'metadata.json')
    await writeFile(
      metadataPath,
      JSON.stringify(metadata, null, 2),
      'utf-8'
    )

    return NextResponse.json({
      success: true,
      message: `Project '${projectConfig.name}' created successfully!`,
      slug: projectConfig.slug,
      url: `/?project=${projectConfig.slug}`,
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      {
        error: 'Failed to create project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
