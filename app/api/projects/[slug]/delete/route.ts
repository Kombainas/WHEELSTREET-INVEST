import { NextRequest, NextResponse } from 'next/server'
import { rm, existsSync } from 'fs'
import { join } from 'path'
import { promisify } from 'util'

const rmAsync = promisify(rm)

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    // Prevent deletion of the main WheelStreet project
    if (slug === 'wheelstreet') {
      return NextResponse.json(
        { error: 'Cannot delete the main WheelStreet project' },
        { status: 403 }
      )
    }

    const projectPath = join(process.cwd(), 'content', 'projects', slug)

    // Check if project exists
    if (!existsSync(projectPath)) {
      return NextResponse.json(
        { error: `Project '${slug}' not found` },
        { status: 404 }
      )
    }

    // Delete the entire project directory
    await rmAsync(projectPath, { recursive: true, force: true })

    return NextResponse.json({
      success: true,
      message: `Project '${slug}' deleted successfully`,
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      {
        error: 'Failed to delete project',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
