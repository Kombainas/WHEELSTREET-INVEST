import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '@/lib/auth'
import LogoutButton from './LogoutButton'

export default async function Nav() {
  const session = await getSession()
  const isLoggedIn = session === process.env.SESSION_TOKEN

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-black/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black rounded"
          aria-label="Wheelstreet - Home"
        >
          <Image
            src="/wheel-street-logo.png"
            alt="Wheelstreet logo"
            width={140}
            height={40}
            priority
            className="h-auto w-auto max-h-10"
          />
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                href="/deck"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Deck
              </Link>
              <Link
                href="/data-room"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Data Room
              </Link>
              <Link
                href="/updates"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Updates
              </Link>
              <Link
                href="/book-a-call"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Book a Call
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
