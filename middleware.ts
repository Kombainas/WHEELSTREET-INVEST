import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/', '/deck', '/data-room', '/updates', '/book-a-call']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const session = request.cookies.get('investor_session')
  const validToken = process.env.SESSION_TOKEN

  if (!validToken) {
    console.error('SESSION_TOKEN not configured')
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (session?.value === validToken) {
    const response = NextResponse.next()

    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('Referrer-Policy', 'no-referrer')
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self'; frame-src 'self' https://calendly.com;"
    )

    return response
  }

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('next', pathname)

  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/((?!api/login|api/logout|_next/static|_next/image|favicon.ico|noise.png|files).*)',
  ],
}
