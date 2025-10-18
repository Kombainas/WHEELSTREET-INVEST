import Link from 'next/link'
import Image from 'next/image'
import { getSession } from '@/lib/auth'
import LogoutButton from './LogoutButton'
import SearchButton from './SearchButton'
import MobileNav from './MobileNav'

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

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <SearchButton />
              <Link
                href="/deck"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Planas
              </Link>
              <Link
                href="/data-room"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Duomenys
              </Link>
              <Link
                href="/updates"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Naujienos
              </Link>
              <Link
                href="/bonusas"
                className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
              >
                Bonusas ⭐
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
            >
              Prisijungti
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        {isLoggedIn && <MobileNav />}
        {!isLoggedIn && (
          <Link
            href="/login"
            className="lg:hidden text-sm px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Prisijungti
          </Link>
        )}
      </div>
    </nav>
  )
}
