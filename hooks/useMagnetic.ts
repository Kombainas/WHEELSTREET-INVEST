import { useEffect, useRef, useState } from 'react'

interface MagneticOptions {
  strength?: number
}

export function useMagnetic<T extends HTMLElement>(options: MagneticOptions = {}) {
  const { strength = 12 } = options
  const elementRef = useRef<T>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const targetPosition = useRef({ x: 0, y: 0 })
  const animationActive = useRef(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = e.clientX - centerX
      const deltaY = e.clientY - centerY

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const maxDistance = Math.max(rect.width, rect.height)

      if (distance < maxDistance) {
        const factor = 1 - distance / maxDistance
        targetPosition.current = {
          x: (deltaX / maxDistance) * strength * factor,
          y: (deltaY / maxDistance) * strength * factor,
        }
      } else {
        targetPosition.current = { x: 0, y: 0 }
      }

      if (!animationActive.current) {
        animationActive.current = true
        animate()
      }
    }

    const handleMouseLeave = () => {
      targetPosition.current = { x: 0, y: 0 }
    }

    const animate = () => {
      setPosition((prev) => {
        const dx = targetPosition.current.x - prev.x
        const dy = targetPosition.current.y - prev.y

        const newX = prev.x + dx * 0.1
        const newY = prev.y + dy * 0.1

        if (Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01) {
          rafRef.current = requestAnimationFrame(animate)
        } else {
          animationActive.current = false
        }

        return { x: newX, y: newY }
      })
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      animationActive.current = false
    }
  }, [strength])

  return { elementRef, position }
}
