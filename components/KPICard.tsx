'use client'

import { useEffect, useRef, useState } from 'react'
import type { Metric } from '@/content/metrics'
import { formatMetric } from '@/content/metrics'

interface KPICardProps {
  metric: Metric
  index?: number
}

function easeOutQuad(t: number): number {
  return t * (2 - t)
}

export default function KPICard({ metric, index = 0 }: KPICardProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number>()
  const startTimeRef = useRef<number>()
  const observerRef = useRef<IntersectionObserver>()

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      setDisplayValue(metric.value)
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '-50px',
      }
    )

    if (cardRef.current) {
      observerRef.current.observe(cardRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setDisplayValue(metric.value)
      return
    }

    const duration = 1200
    const startValue = 0
    const endValue = metric.value

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutQuad(progress)
      const currentValue = startValue + (endValue - startValue) * easedProgress

      setDisplayValue(currentValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, metric.value])

  const formattedValue = formatMetric({
    ...metric,
    value: displayValue,
  })

  return (
    <div
      ref={cardRef}
      className="border border-black/10 p-8 hover:border-black transition-colors focus-within:ring-2 focus-within:ring-black"
      role="region"
      aria-label={`${metric.label}: ${formattedValue}`}
    >
      <div className="mb-4">
        <span className="label-caps text-black/60">{metric.label}</span>
      </div>
      <div className="kpi-number" aria-live="polite" aria-atomic="true">
        {formattedValue}
      </div>
    </div>
  )
}
