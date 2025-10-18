'use client'

import React, { useState } from 'react'

interface DisclosureProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="disclosure-container my-8 border border-black/10 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="disclosure-button w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-black/[0.02] transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      >
        <span className="font-semibold text-base md:text-lg">{title}</span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`disclosure-icon transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="M6 8l4 4 4-4" />
        </svg>
      </button>
      <div
        className={`disclosure-content overflow-hidden transition-all ${
          isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 border-t border-black/10">
          {children}
        </div>
      </div>
    </div>
  )
}
