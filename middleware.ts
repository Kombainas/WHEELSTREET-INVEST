import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// LOGIN DISABLED - OPEN ACCESS FOR INVESTORS
export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers only
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

export const config = {
  matcher: [
    '/((?!api/login|api/logout|_next/static|_next/image|favicon.ico|noise.png|files).*)',
  ],
}
