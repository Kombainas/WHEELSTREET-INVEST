'use client'

import { motion } from 'motion/react'
import Image from 'next/image'

export default function PitchDeckHero() {
  return (
    <section className="relative bg-white border-b border-black/10">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Image
              src="/wheel-street-logo.png"
              alt="WheelStreet"
              width={300}
              height={100}
              priority
              className="mx-auto h-auto w-auto max-w-[300px]"
            />
          </motion.div>

          {/* Subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm md:text-base font-light tracking-[0.3em] uppercase text-black/60 mb-8"
          >
            Investicinis Pasiūlymas
          </motion.h1>

          {/* Investment Ask - BIG */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <div className="text-7xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight">
              200 000 €
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base md:text-lg text-black/60 max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Paspartinti augimą ir įsitvirtinti rinkoje prieš plėtrą į Baltijos šalis
          </motion.p>

          {/* Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-sm text-black/40 tracking-wide"
          >
            Spalis 2025
          </motion.div>
        </div>
      </div>
    </section>
  )
}
