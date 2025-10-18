'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LottieAnimation = dynamic(() => import('./LottieAnimation'), {
  ssr: false,
  loading: () => <div className="w-full h-full"></div>,
})

export default function BonusHero() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  useEffect(() => {
    // Trigger vault unlock after 1.5s
    const timer = setTimeout(() => {
      setIsUnlocked(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative overflow-hidden py-24 md:py-32">
      {/* Vault overlay with premium animation */}
      <AnimatePresence>
        {!isUnlocked && (
          <motion.div
            className="fixed inset-0 bg-black z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              backdropFilter: 'blur(10px)',
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
          >
            <div className="text-white text-center">
              {/* Lock icon with pulse animation */}
              <motion.div
                className="text-7xl mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.1, 1],
                  opacity: 1,
                  rotate: [0, -5, 5, 0]
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  scale: {
                    times: [0, 0.6, 1],
                    duration: 1
                  }
                }}
              >
                🔓
              </motion.div>

              <motion.p
                className="label-caps text-white/60"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                Unlocking Premium Content...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content - luxury reveal with spring physics */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={isUnlocked ? {
          opacity: 1,
          scale: 1,
          y: 0
        } : {}}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: [0.34, 1.56, 0.64, 1], // Smooth spring curve
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Trophy Lottie Animation */}
            <motion.div
              className="w-[250px] h-[250px] mx-auto mb-6"
              initial={{ rotate: -15, scale: 0, opacity: 0 }}
              animate={isUnlocked ? {
                rotate: 0,
                scale: 1,
                opacity: 1
              } : {}}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <LottieAnimation
                animationUrl="/animations/trophy-animation.json"
                className="w-full h-full"
                loop={true}
                autoplay={true}
              />
            </motion.div>

            {/* Heading with blur fade */}
            <motion.h1
              className="text-5xl md:text-6xl font-bold mb-6 tracking-tight"
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={isUnlocked ? {
                opacity: 1,
                filter: 'blur(0px)',
                y: 0
              } : {}}
              transition={{
                delay: 0.6,
                duration: 0.7,
                ease: "easeOut"
              }}
            >
              Bonusas Projektai
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-xl md:text-2xl text-black/70 mb-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isUnlocked ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              5 papildomi investavimo atvejai ir strateginės iniciatyvos
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-base text-black/60 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={isUnlocked ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0, duration: 0.6 }}
            >
              Šie projektai parodo WheelStreet ekosistemos plėtros potencialą
              ir papildomas growth opportunities investuotojams.
            </motion.p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
