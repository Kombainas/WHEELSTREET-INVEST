'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useState } from 'react'
import { faqs, faqCategories, type FAQItem } from '@/content/faq'

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState<FAQItem['category'] | 'all'>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const filteredFAQs = selectedCategory === 'all'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="py-20 bg-black/[0.02]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="label-caps text-black/60">Investitor ių Klausimai</span>
          <h2 className="text-3xl font-bold mt-2 mb-3">
            Dažniausiai Užduodami Klausimai
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Atsakymai į pagrindinius klausimus apie WheelStreet, modelį, traction, ir perspektyvas
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-black text-white'
                : 'bg-white text-black border border-black/20 hover:border-black'
            }`}
          >
            Visi ({faqs.length})
          </button>
          {faqCategories.map((category) => {
            const count = faqs.filter(f => f.category === category.id).length
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white'
                    : 'bg-white text-black border border-black/20 hover:border-black'
                }`}
              >
                <span className="mr-1">{category.icon}</span>
                {category.label} ({count})
              </button>
            )
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {filteredFAQs.map((faq, index) => {
              const isOpen = openIndex === index
              const categoryInfo = faqCategories.find(c => c.id === faq.category)

              return (
                <motion.div
                  key={`${selectedCategory}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white border border-black/10 rounded-lg overflow-hidden hover:border-black/30 transition-colors"
                >
                  {/* Question */}
                  <button
                    onClick={() => toggleQuestion(index)}
                    className="w-full text-left p-6 flex items-start justify-between gap-4 hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {categoryInfo && (
                          <span className="text-xs px-2 py-1 bg-black/5 rounded-full text-black/60">
                            {categoryInfo.icon} {categoryInfo.label}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-lg pr-4">
                        {faq.question}
                      </h3>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 text-2xl text-black/40"
                    >
                      ↓
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-black/70 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-8 bg-white border border-black/10 rounded-lg">
          <h3 className="text-xl font-bold mb-3">Dar turite klausimų?</h3>
          <p className="text-black/60 mb-6">
            Susisiekite su mumis ir aptarsime bet kokius papildomus klausimus apie investiciją
          </p>
          <a
            href="mailto:invest@wheelstreet.lt?subject=Investment Questions"
            className="inline-block px-8 py-3 bg-black text-white font-medium hover:bg-black/90 transition-colors rounded"
          >
            Susisiekti su komanda →
          </a>
        </div>
      </div>
    </div>
  )
}
