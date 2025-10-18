'use client'

import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  title: string
  number: number
}

interface DeckTOCProps {
  items: TocItem[]
}

export default function DeckTOC({ items }: DeckTOCProps) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-20% 0px -35% 0px',
        threshold: 0,
      }
    )

    const headings = items.map((item) => document.getElementById(item.id)).filter(Boolean)
    headings.forEach((heading) => {
      if (heading) observer.observe(heading)
    })

    return () => {
      headings.forEach((heading) => {
        if (heading) observer.unobserve(heading)
      })
    }
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="toc sticky top-24">
      <div className="toc-scroll">
        <nav aria-label="Table of contents" className="space-y-1">
          <div className="label-caps text-black/40 mb-4">On this page</div>
          <ul className="space-y-1 text-sm">
            {items.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? 'true' : 'false'}
                  className="toc-link group flex items-start gap-3 py-2 px-3 rounded text-black/60 hover:text-black hover:bg-black/5 transition-colors"
                >
                  <span className="section-badge shrink-0 mt-0.5">{item.number}</span>
                  <span className="flex-1">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
