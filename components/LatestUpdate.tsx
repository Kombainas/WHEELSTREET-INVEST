'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { updates } from '@/content/updates'

export default function LatestUpdate() {
  // Get the most recent pinned update or first update
  const latestUpdate = updates.find(u => u.pinned) || updates[0]

  if (!latestUpdate) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="max-w-5xl mx-auto"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Naujausia naujiena</h2>
        <Link
          href="/updates"
          className="text-sm hover:underline text-black/60 hover:text-black transition-colors"
        >
          Visos naujienos →
        </Link>
      </div>

      <div className="bg-white border-2 border-black/10 rounded-lg p-8 hover:border-black/20 transition-all duration-200 shadow-sm hover:shadow-md">
        {/* Date & Pinned Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm text-black/40">
            {new Date(latestUpdate.date).toLocaleDateString('lt-LT', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          {latestUpdate.pinned && (
            <span className="px-2 py-1 bg-black text-white text-xs font-medium rounded">
              SVARBU
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-4">{latestUpdate.title}</h3>

        {/* Body Preview */}
        <div className="text-black/70 leading-relaxed whitespace-pre-line">
          {latestUpdate.body.slice(0, 400)}
          {latestUpdate.body.length > 400 && '...'}
        </div>

        {/* Read More */}
        {latestUpdate.body.length > 400 && (
          <Link
            href="/updates"
            className="inline-block mt-4 text-sm font-medium hover:underline"
          >
            Skaityti daugiau →
          </Link>
        )}
      </div>
    </motion.div>
  )
}
