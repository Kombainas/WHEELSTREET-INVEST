import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Admin Panel | WheelStreet Invest',
  description: 'Admin panel for managing investor portal content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Simple Admin Navigation */}
      <nav className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-lg font-bold hover:opacity-70 transition-opacity"
            >
              🏠 Back to Site
            </Link>
            <span className="text-black/40">|</span>
            <span className="text-lg font-bold">🛠️ Admin Panel</span>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="min-h-screen bg-white">
        {children}
      </div>
    </>
  )
}
