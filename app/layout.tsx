import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import GridBackground from '@/components/GridBackground'
import NoiseOverlay from '@/components/NoiseOverlay'
import ConditionalNav from '@/components/ConditionalNav'
import Footer from '@/components/Footer'
import SkipLink from '@/components/SkipLink'
import PageTransitions from '@/components/PageTransitions'
import GarageMode from '@/components/GarageMode'
import ScrollProgress from '@/components/ScrollProgress'
import NDAAcceptance from '@/components/NDAAcceptance'
import TopLoadingBar from '@/components/TopLoadingBar'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'optional', // Prevents layout shift during font loading
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

export const metadata: Metadata = {
  title: {
    default: 'WheelStreet Invest | Automobilių ateitis Baltijos šalyse',
    template: '%s | WheelStreet Invest',
  },
  description: '€10B Baltijos automobilių rinka. 24h atsiskaitymas. 88% organinis social media reach. Investuokite į integruotą automobilių prekybos ekosistemą.',
  keywords: ['investicijos', 'automobiliai', 'Baltijos šalys', 'startup', 'fintech', 'marketplace'],
  authors: [{ name: 'WheelStreet' }],
  creator: 'WheelStreet',
  publisher: 'WheelStreet',
  icons: {
    icon: '/wheel-street-logo.png',
    shortcut: '/wheel-street-logo.png',
    apple: '/wheel-street-logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'lt_LT',
    siteName: 'WheelStreet Invest',
    title: 'WheelStreet Invest | Automobilių ateitis Baltijos šalyse',
    description: '€10B Baltijos automobilių rinka. 24h atsiskaitymas. 88% organinis social media reach. Investuokite į integruotą automobilių prekybos ekosistemą.',
    images: ['/wheel-street-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WheelStreet Invest | Automobilių ateitis Baltijos šalyse',
    description: '€10B Baltijos automobilių rinka. 24h atsiskaitymas. 88% organinis social media reach.',
    images: ['/wheel-street-logo.png'],
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="lt">
      <body className={inter.className}>
        <LoadingScreen />
        <TopLoadingBar />
        <SkipLink />
        <ScrollProgress />
        <NDAAcceptance />
        <GridBackground />
        <NoiseOverlay />
        <GarageMode />
        <ConditionalNav />
        <main id="main-content" className="min-h-screen">
          <PageTransitions>{children}</PageTransitions>
        </main>
        <Footer />
      </body>
    </html>
  )
}
