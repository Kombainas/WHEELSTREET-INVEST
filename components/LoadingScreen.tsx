'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useProject } from '@/lib/projects/ProjectContext'

export default function LoadingScreen() {
  // Try to get project config, fall back to defaults if not available
  let projectConfig = { name: 'WheelStreet', logo: '/wheel-street-logo.png' }
  try {
    const context = useProject()
    if (context?.config) {
      projectConfig = context.config
    }
  } catch (e) {
    // Context not available (e.g., in layout), use defaults
  }

  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Check if user has seen loading screen before
    const hasSeenLoading = sessionStorage.getItem('hasSeenLoading')

    if (hasSeenLoading) {
      setIsLoading(false)
      return
    }

    // Simulate loading progress
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = 100 / steps
    const stepDuration = duration / steps

    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += increment
      if (currentProgress >= 100) {
        currentProgress = 100
        clearInterval(interval)
        setTimeout(() => {
          setIsLoading(false)
          sessionStorage.setItem('hasSeenLoading', 'true')
        }, 500)
      }
      setProgress(currentProgress)
    }, stepDuration)

    return () => clearInterval(interval)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-8"
          >
            <Image
              src={projectConfig.logo}
              alt={projectConfig.name}
              width={120}
              height={120}
              priority
              className="drop-shadow-2xl"
            />
          </motion.div>

          {/* Company Name */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-3xl md:text-4xl font-bold text-black mb-2"
          >
            {projectConfig.name}
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-black/60 text-lg mb-12"
          >
            Investor Portal
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-60 h-1 bg-black/10 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute top-0 left-0 h-full bg-black rounded-full"
              style={{
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1, ease: 'linear' }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-black/40 text-sm mt-4"
          >
            Loading... {Math.round(progress)}%
          </motion.p>

          {/* Animated Dots */}
          <div className="flex gap-2 mt-8">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-black/30 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
