import { NextResponse } from 'next/server'

const MAX_ATTEMPTS = 5
const LOCKOUT_TIME = 15 * 60 * 1000
const attempts = new Map<string, { count: number; lastAttempt: number }>()

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown'
}

function constantTimeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false
  }
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export async function POST(request: Request) {
  const clientIP = getClientIP(request)
  const now = Date.now()

  const attemptData = attempts.get(clientIP)
  if (attemptData) {
    if (now - attemptData.lastAttempt < LOCKOUT_TIME && attemptData.count >= MAX_ATTEMPTS) {
      return NextResponse.json(
        { error: 'Too many attempts. Please try again later.' },
        { status: 429 }
      )
    }
    if (now - attemptData.lastAttempt >= LOCKOUT_TIME) {
      attempts.delete(clientIP)
    }
  }

  try {
    const body = await request.json()
    const { pwd } = body

    if (!pwd || typeof pwd !== 'string' || pwd.length > 100) {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    const validPassword = process.env.INVESTOR_PASSWORD
    const sessionToken = process.env.SESSION_TOKEN

    if (!validPassword || !sessionToken) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const isValid = constantTimeCompare(pwd, validPassword)

    if (!isValid) {
      const current = attempts.get(clientIP) || { count: 0, lastAttempt: 0 }
      attempts.set(clientIP, {
        count: current.count + 1,
        lastAttempt: now,
      })

      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }

    attempts.delete(clientIP)

    const response = NextResponse.json({ success: true })

    response.cookies.set('investor_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    )
  }
}
