import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const session = request.headers.get('cookie')

  if (!session?.includes('investor_session')) {
    return NextResponse.json(
      { error: 'No active session' },
      { status: 400 }
    )
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set('investor_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })

  return response
}
