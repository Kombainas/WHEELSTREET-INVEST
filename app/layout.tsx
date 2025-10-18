import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GridBackground from '@/components/GridBackground'
import NoiseOverlay from '@/components/NoiseOverlay'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import SkipLink from '@/components/SkipLink'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WheelStreet Invest',
  description: 'Investment platform',
  icons: {
    icon: '/wheel-street-logo.png',
  },
  openGraph: {
    title: 'WheelStreet Invest',
    description: 'Investment platform',
    images: ['/wheel-street-logo.png'],
  },
  robots: {
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkipLink />
        <GridBackground />
        <NoiseOverlay />
        <Nav />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
