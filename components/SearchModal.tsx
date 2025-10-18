'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  excerpt: string
  url: string
  type: 'deck' | 'update'
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const router = useRouter()

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Search function
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }

    const searchContent = async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
      } catch (error) {
        console.error('Search failed:', error)
        setResults([])
      }
    }

    const debounce = setTimeout(searchContent, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleResultClick = (url: string) => {
    router.push(url)
    onClose()
    setQuery('')
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center pt-20 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="p-4 border-b border-black/10">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ieškoti verslo plane ir naujienose..."
            autoFocus
            className="w-full px-4 py-3 text-lg border border-black/20 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="p-8 text-center text-black/40 text-sm">
              Įveskite bent 2 simbolius paieškai
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-black/40 text-sm">
              Rezultatų nerasta pagal &quot;{query}&quot;
            </div>
          ) : (
            <div className="divide-y divide-black/10">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full text-left p-4 hover:bg-black/5 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="label-caps text-black/40">{result.type === 'deck' ? 'Planas' : 'Naujiena'}</span>
                  </div>
                  <h3 className="font-medium mb-1">{result.title}</h3>
                  <p className="text-sm text-black/60 line-clamp-2">{result.excerpt}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-black/10 flex items-center justify-between text-xs text-black/40">
          <span>ESC uždaryti</span>
          <span>ENTER pasirinkti</span>
        </div>
      </div>
    </div>
  )
}
