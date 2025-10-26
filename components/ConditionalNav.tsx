'use client'

import { usePathname } from 'next/navigation'
import Nav from './Nav'

export default function ConditionalNav() {
  const pathname = usePathname()

  // Don't show main site navigation on admin pages
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return <Nav />
}
