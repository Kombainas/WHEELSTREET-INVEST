'use client'

import Link from 'next/link'
import { useMagnetic } from '@/hooks/useMagnetic'

export default function Hero() {
  const { elementRef, position } = useMagnetic<HTMLAnchorElement>({ strength: 12 })

  return (
    <section id="hero" className="container mx-auto px-4 pt-32 pb-24">
      <div className="max-w-5xl">
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-12 leading-tight">
          <span className="block text-black">Building the future</span>
          <span className="inline-block bg-[#111] text-white px-6 py-2 mt-2">
            of mobility investment
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-black/70 mb-12 max-w-2xl">
          Institutional-grade investment opportunities in the rapidly growing micro-mobility sector.
        </p>

        <Link
          ref={elementRef}
          href="/deck"
          aria-label="View our investment deck"
          className="inline-block px-8 py-4 bg-black text-white font-medium text-lg hover:bg-white hover:text-black border border-black transition-colors"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
          }}
        >
          View Deck
        </Link>
      </div>
    </section>
  )
}
