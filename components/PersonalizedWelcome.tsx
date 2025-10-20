'use client'

import { motion } from 'motion/react'
import { useInvestorProfile } from '@/hooks/useInvestorProfile'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PersonalizedWelcome() {
  const { profile, isNewVisit } = useInvestorProfile()
  const [timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setTimeOfDay('Labas rytas')
    else if (hour < 18) setTimeOfDay('Laba diena')
    else setTimeOfDay('Labas vakaras')
  }, [])

  if (!profile) return null

  const lastVisitDate = new Date(profile.lastVisit)
  const daysSinceLastVisit = Math.floor(
    (new Date().getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  const getLastViewedPage = () => {
    const lastPage = profile.pagesVisited[profile.pagesVisited.length - 2] // Second to last (current is last)
    const pageNames: Record<string, string> = {
      '/deck': 'Verslo planas',
      '/data-room': 'Duomenų kambarys',
      '/updates': 'Naujienos',
      '/partners': 'Partneriai',
      '/bonusas': 'Bonusas projektai',
    }
    return pageNames[lastPage || '/'] || 'Pradžia'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-black to-black/90 text-white px-6 py-4 mb-8 rounded-lg border border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Greeting */}
          <div>
            <h2 className="text-2xl font-bold mb-1">
              {timeOfDay}, {profile.name}! 👋
            </h2>
            <p className="text-white/70 text-sm">
              {isNewVisit && daysSinceLastVisit > 0 ? (
                <>
                  Praėjo <span className="font-medium text-white">{daysSinceLastVisit} d.</span>{' '}
                  nuo paskutinio apsilankymo
                </>
              ) : profile.visitCount === 1 ? (
                <>Sveiki atvykę į WheelStreet investuotojos portalą</>
              ) : (
                <>
                  Jūsų {profile.visitCount}-as apsilankymas •{' '}
                  <span className="font-medium text-white">
                    {profile.pagesVisited.length} puslapių peržiūrėta
                  </span>
                </>
              )}
            </p>
          </div>

          {/* Right: Quick Stats & Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {profile.pagesVisited.length > 1 && (
              <div className="text-sm">
                <span className="text-white/60">Paskutinė peržiūra:</span>{' '}
                <span className="font-medium">{getLastViewedPage()}</span>
              </div>
            )}
            <Link
              href="/deck"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-sm font-medium rounded transition-colors"
            >
              Tęsti verslo planą →
            </Link>
          </div>
        </div>

        {/* What's New Section (if returning visitor) */}
        {isNewVisit && daysSinceLastVisit > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mt-4 pt-4 border-t border-white/10"
          >
            <div className="text-sm">
              <span className="text-white/60">🆕 Kas naujo nuo jūsų paskutinio apsilankymo:</span>
              <ul className="mt-2 space-y-1 text-white/80">
                <li>• Atnaujintos finansinės prognozės (2025 Q1)</li>
                <li>• Pridėta nauja partnerystė su draudimo kompanija</li>
                <li>• 3 nauji projektai "Bonusas" skiltyje</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
