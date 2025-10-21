import Link from 'next/link'
import Image from 'next/image'
import SearchButton from './SearchButton'
import MobileNav from './MobileNav'

export default function Nav() {
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
          <SearchButton />
          <a
            href="/pitch-deck.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Pitch Deck ↗
          </a>
          <Link
            href="/deck"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Verslo planas
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
            href="/partners"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Partneriai
          </Link>
          <Link
            href="/bonusas"
            className="text-sm hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded"
          >
            Bonusas ⭐
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </nav>
  )
}
