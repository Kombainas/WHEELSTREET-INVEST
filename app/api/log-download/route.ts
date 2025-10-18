import { NextResponse } from 'next/server'

export async function POST(request: Request) {
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
    const { fileName, ndaAccepted } = body

    if (!fileName || typeof fileName !== 'string' || !ndaAccepted) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '')

    console.log(`[DOWNLOAD LOG] ${new Date().toISOString()} - File: ${sanitizedFileName} - IP: ${request.headers.get('x-forwarded-for') || 'unknown'}`)

    return NextResponse.json({ success: true, canDownload: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
}
