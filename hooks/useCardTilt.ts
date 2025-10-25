import { useMotionValue, useSpring, useTransform } from 'motion/react'
import { RefObject } from 'react'

interface UseCardTiltOptions {
  maxTilt?: number
  perspective?: number
  scale?: number
}

export function useCardTilt(options: UseCardTiltOptions = {}) {
  const { maxTilt = 10, perspective = 1000, scale = 1.02 } = options

  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 400,
    damping: 30
  })
  
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 400,
    damping: 30
  })

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    
    const newX = (event.clientX - rect.left) / rect.width
    const newY = (event.clientY - rect.top) / rect.height
    
    x.set(newX)
    y.set(newY)
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return {
    handleMouseMove,
    handleMouseLeave,
    transform: {
      rotateX,
      rotateY,
      scale,
    },
    style: {
      transformStyle: 'preserve-3d' as const,
      perspective,
    }
  }
}
