'use client'

import { useEffect, useState } from 'react'

export default function BonusHero() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    // Trigger vault unlock animation after mount
    const timer = setTimeout(() => {
      setIsUnlocked(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      {/* Vault overlay - fades out */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-1000 ${
          isUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="text-white text-center">
            <div className="text-6xl mb-4">🔓</div>
            <p className="label-caps text-white/60">Unlocking...</p>
          </div>
        </div>
      </div>

      {/* Content - vault reveal */}
      <div
        className={`bonus-vault-content ${
          isUnlocked ? 'bonus-vault-unlocked' : 'bonus-vault-locked'
        }`}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Star icon */}
            <div className="text-5xl mb-6">⭐</div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              Bonusas Projektai
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-black/70 mb-8 max-w-2xl mx-auto">
              5 papildomi investavimo atvejai ir strateginės iniciatyvos
            </p>

            {/* Description */}
            <p className="text-base text-black/60 max-w-xl mx-auto">
              Šie projektai parodo WheelStreet ekosistemos plėtros potencialą
              ir papildomas growth opportunities investuotojams.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
