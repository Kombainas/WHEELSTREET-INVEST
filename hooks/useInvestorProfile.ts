'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export interface InvestorProfile {
  name: string
  firstVisit: string
  lastVisit: string
  visitCount: number
  pagesVisited: string[]
  lastViewedSection?: string
}

const INVESTORS = {
  kastytis: 'Kastytis',
  andrius: 'Andrius',
}

export function useInvestorProfile() {
  const [profile, setProfile] = useState<InvestorProfile | null>(null)
  const [isNewVisit, setIsNewVisit] = useState(false)
  const pathname = usePathname()

  // Load profile from localStorage
  useEffect(() => {
    const storedProfile = localStorage.getItem('investorProfile')
    if (storedProfile) {
      const parsed = JSON.parse(storedProfile)
      setProfile(parsed)

      // Check if it's a new visit (more than 1 hour since last visit)
      const lastVisit = new Date(parsed.lastVisit)
      const now = new Date()
      const hoursSinceLastVisit = (now.getTime() - lastVisit.getTime()) / (1000 * 60 * 60)
      setIsNewVisit(hoursSinceLastVisit > 1)
    }
  }, [])

  // Track page visits
  useEffect(() => {
    if (profile && pathname) {
      const updatedProfile = {
        ...profile,
        lastVisit: new Date().toISOString(),
        pagesVisited: Array.from(new Set([...profile.pagesVisited, pathname])),
        visitCount: isNewVisit ? profile.visitCount + 1 : profile.visitCount,
      }
      setProfile(updatedProfile)
      localStorage.setItem('investorProfile', JSON.stringify(updatedProfile))
      setIsNewVisit(false)
    }
  }, [pathname])

  const selectInvestor = (investorKey: 'kastytis' | 'andrius') => {
    const newProfile: InvestorProfile = {
      name: INVESTORS[investorKey],
      firstVisit: new Date().toISOString(),
      lastVisit: new Date().toISOString(),
      visitCount: 1,
      pagesVisited: [pathname || '/'],
    }
    setProfile(newProfile)
    localStorage.setItem('investorProfile', JSON.stringify(newProfile))
    setIsNewVisit(true)
  }

  const updateLastViewedSection = (section: string) => {
    if (profile) {
      const updatedProfile = {
        ...profile,
        lastViewedSection: section,
      }
      setProfile(updatedProfile)
      localStorage.setItem('investorProfile', JSON.stringify(updatedProfile))
    }
  }

  const clearProfile = () => {
    localStorage.removeItem('investorProfile')
    setProfile(null)
  }

  return {
    profile,
    isNewVisit,
    selectInvestor,
    updateLastViewedSection,
    clearProfile,
  }
}
