'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function TopLoadingBar() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Start loading on pathname change
    setIsLoading(true)
    setProgress(0)

    // Simulate progress
    const timer1 = setTimeout(() => setProgress(30), 50)
    const timer2 = setTimeout(() => setProgress(60), 100)
    const timer3 = setTimeout(() => setProgress(90), 150)

    // Complete loading
    const completeTimer = setTimeout(() => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 200)
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(completeTimer)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: `${progress}%`, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            width: { duration: 0.2, ease: 'easeOut' },
            opacity: { duration: 0.15 }
          }}
          style={{
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
          }}
        />
      )}
    </AnimatePresence>
  )
}
