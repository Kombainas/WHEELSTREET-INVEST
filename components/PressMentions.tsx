'use client'

import { motion } from 'motion/react'
import { pressMentions } from '@/content/press-mentions'

const typeLabels = {
  article: '📰 Straipsnis',
  podcast: '🎙️ Podcast',
  video: '🎥 Video',
  feature: '⭐ Feature',
}

const typeColors = {
  article: 'bg-blue-50 text-blue-700 border-blue-200',
  podcast: 'bg-purple-50 text-purple-700 border-purple-200',
  video: 'bg-red-50 text-red-700 border-red-200',
  feature: 'bg-yellow-50 text-yellow-700 border-yellow-200',
}

export default function PressMentions() {
  if (pressMentions.length === 0) return null

  return (
    <section className="py-20 bg-black/[0.02]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="label-caps text-black/60">Medijų aprėptis</span>
          <h2 className="text-3xl font-bold mt-2">Spaudoje apie mus</h2>
          <p className="text-black/60 mt-2 max-w-2xl mx-auto">
            Išoriniai šaltiniai ir ekspertai apie WheelStreet augimą ir inovacijas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressMentions.map((mention, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-black/10 rounded-lg p-6 hover:border-black/20 hover:shadow-lg transition-all duration-200"
            >
              {/* Type badge */}
              <div className="mb-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                    typeColors[mention.type]
                  }`}
                >
                  {typeLabels[mention.type]}
                </span>
              </div>

              {/* Outlet name */}
              <div className="font-bold text-lg mb-3">{mention.outlet}</div>

              {/* Quote */}
              <blockquote className="text-black/70 italic mb-4 border-l-4 border-black/10 pl-4">
                "{mention.quote}"
              </blockquote>

              {/* Metadata */}
              <div className="flex items-center justify-between text-sm text-black/40">
                {mention.author && <span>{mention.author}</span>}
                <span>{mention.date}</span>
              </div>

              {/* Read link */}
              {mention.url && (
                <a
                  href={mention.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  Skaityti daugiau
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </div>

        {/* Call to action for journalists */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-white border border-black/10 rounded-lg p-6 max-w-2xl">
            <p className="text-black/60 mb-3">
              <strong>Žurnalistams ir medijoms:</strong> Dėl interviu, komentarų ar papildomos informacijos susisiekite su mumis.
            </p>
            <a
              href="mailto:press@wheelstreet.lt?subject=Media Inquiry"
              className="inline-flex items-center gap-2 px-6 py-2 bg-black text-white font-medium hover:bg-black/90 transition-colors rounded"
            >
              📧 press@wheelstreet.lt
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
