'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
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

  return (
    <section id="hero" className="container mx-auto px-4 pt-32 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl">
        {/* Left: Content */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="block text-black">Keičiame</span>
            <span className="inline-block bg-[#111] text-white px-6 py-2 mt-2">
              automobilių rinką
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black/70 mb-10">
            Pirmaujanti automobilių pirkimo ir pardavimo platforma Baltijos šalyse.
            Greičiausias atsiskaitymas. Skaidrus procesas. Integruota ekosistema.
          </p>

          <Link
            ref={elementRef}
            href="/deck"
            aria-label="Peržiūrėti investicinį planą"
            className="inline-block px-8 py-4 bg-black text-white font-medium text-lg hover:bg-white hover:text-black border border-black transition-colors"
            style={{
              transform: `translate(${position.x}px, ${position.y}px)`,
            }}
          >
            Peržiūrėti planą
          </Link>
        </div>

        {/* Right: Lottie Animation */}
        <div className="hidden lg:block relative h-[500px] w-full">
          <LottieAnimation
            animationUrl="/animations/moving-car.json"
            className="w-full h-full"
            loop={true}
            autoplay={true}
          />
        </div>
      </div>
    </section>
  )
}
