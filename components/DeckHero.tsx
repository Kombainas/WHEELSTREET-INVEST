'use client'

import { useEffect, useState } from 'react'

export default function DeckHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger fade-in after mount
    setIsVisible(true)
  }, [])

  const handleScrollToArticle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('main-article')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handlePrint = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    window.print()
  }

  return (
    <div
      className={`hero-wrap transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-labelledby="hero-heading"
    >
      <div className="flex flex-col items-center text-center">
        {/* Headline */}
        <h1 id="hero-heading" className="hero-breathe text-5xl md:text-6xl font-bold tracking-tighter mb-4">
          Investuotojų pristatymas 2025
        </h1>

        {/* Subline */}
        <p className="text-xl md:text-2xl text-black/60 mb-12 max-w-2xl">
          Wheelstreet — Verslo planas
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#main-article"
            onClick={handleScrollToArticle}
            className="btn"
            aria-label="Slinkti į verslo planą"
          >
            Peržiūrėti planą
          </a>
          <button
            onClick={handlePrint}
            className="btn"
            aria-label="Spausdinti arba išsaugoti PDF formatu"
          >
            Spausdinti / PDF
          </button>
        </div>
      </div>
    </div>
  )
}
