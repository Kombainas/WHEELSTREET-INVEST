import { NextRequest, NextResponse } from 'next/server'
import { readFileSync, existsSync, cpSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import { join } from 'path'
import type { ProjectConfig } from '@/lib/projects/types'

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const sourceProjectPath = join(process.cwd(), 'content', 'projects', slug)

    // Check if source project exists
    if (!existsSync(sourceProjectPath)) {
      return NextResponse.json(
        { error: `Project '${slug}' not found` },
        { status: 404 }
      )
    }

    // Read source config
    const sourceConfigPath = join(sourceProjectPath, 'config.json')
    const sourceConfig: ProjectConfig = JSON.parse(
      readFileSync(sourceConfigPath, 'utf-8')
    )

    // Generate new slug and name
    let copyNumber = 1
    let newSlug = `${slug}-copy`
    let newName = `${sourceConfig.name} (Copy)`

    // Find unique slug
    while (existsSync(join(process.cwd(), 'content', 'projects', newSlug))) {
      copyNumber++
      newSlug = `${slug}-copy-${copyNumber}`
      newName = `${sourceConfig.name} (Copy ${copyNumber})`
    }

    const newProjectPath = join(process.cwd(), 'content', 'projects', newSlug)

    // Create new project directory
    await mkdir(newProjectPath, { recursive: true })

    // Copy all files from source to destination
    cpSync(sourceProjectPath, newProjectPath, { recursive: true })

    // Update config.json with new slug and name
    const newConfig: ProjectConfig = {
      ...sourceConfig,
      id: newSlug,
      slug: newSlug,
      name: newName,
    }

    const newConfigPath = join(newProjectPath, 'config.json')
    await writeFile(
      newConfigPath,
      JSON.stringify(newConfig, null, 2),
      'utf-8'
    )

    // Update metadata.json with new timestamps
    const metadataPath = join(newProjectPath, 'metadata.json')
    if (existsSync(metadataPath)) {
      const metadata = JSON.parse(readFileSync(metadataPath, 'utf-8'))
      metadata.createdAt = new Date().toISOString()
      metadata.lastModified = new Date().toISOString()
      metadata.version = 1
      metadata.duplicatedFrom = slug

      await writeFile(
        metadataPath,
        JSON.stringify(metadata, null, 2),
        'utf-8'
      )
    }

    return NextResponse.json({
      success: true,
      message: `Project duplicated successfully as '${newName}'`,
      slug: newSlug,
      url: `/?project=${newSlug}`,
    })
  } catch (error) {
    console.error('Error duplicating project:', error)
    return NextResponse.json(
      {
        error: 'Failed to duplicate project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
