'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'motion/react'
import { useMagnetic } from '@/hooks/useMagnetic'

// Dynamic import for Lottie animation
const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-black/20 text-sm">Loading...</div>
    </div>
  ),
})

export default function Hero() {
  const { elementRef, position } = useMagnetic<HTMLAnchorElement>({ strength: 12 })
  const { scrollY } = useScroll()
  // Reduce parallax on mobile for performance (only 20px movement)
  const y = useTransform(scrollY, [0, 300], [0, 20])

  return (
    <section id="hero" className="relative overflow-hidden bg-white">
      {/* Content with subtle parallax */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 pt-16 sm:pt-32 pb-6 sm:pb-12 relative z-10"
        style={{ y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl">
          {/* Left: Content */}
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Investor Badge */}
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
                🚀 Investor Portal
              </span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1]"
              style={{ letterSpacing: '-0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="block text-black">Investuokite į</span>
              <span className="inline-block bg-[#111] text-white px-6 py-2 mt-3 shadow-xl">
                automobilių ateitį
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-black/70 mb-10 leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              €7B Baltijos automobilių rinka. 24h atsiskaitymas. 88% organinis social media reach.
              Integruota ekosistema nuo pardavimo su garantija iki draudimo ir priežiūros
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  ref={elementRef}
                  href="/deck"
                  aria-label="Peržiūrėti investicinį planą"
                  className="inline-block px-8 py-5 md:py-4 bg-black text-white font-medium text-lg hover:bg-white hover:text-black border-2 border-black transition-all duration-300 touch-manipulation active:scale-95 md:active:scale-100 min-h-[56px] md:min-h-0"
                  style={{
                    transform: typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
                      ? `translate(${position.x}px, ${position.y}px)`
                      : 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)',
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.08), 0 8px 10px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.02)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  Peržiūrėti planą
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right: Lottie Animation */}
          <motion.div
            className="hidden lg:block relative h-[500px] w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <LottieAnimation
              animationUrl="/animations/car-driving-road.lottie"
              className="w-full h-full"
              loop={true}
              autoplay={true}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
