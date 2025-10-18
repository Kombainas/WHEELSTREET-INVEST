import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-black/10 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} WheelStreet Invest. Visos teisės saugomos.
          </p>
          <div className="flex gap-6">
            <a href="mailto:invest@wheelstreet.lt" className="text-sm text-black/60 hover:text-black transition-colors">
              Kontaktai
            </a>
            <Link href="/privacy" className="text-sm text-black/60 hover:text-black transition-colors">
              Privatumas
            </Link>
            <Link href="/terms" className="text-sm text-black/60 hover:text-black transition-colors">
              Sąlygos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
