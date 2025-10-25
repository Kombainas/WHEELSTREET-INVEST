'use client'

import Lottie from 'lottie-react'
import { useEffect, useState, useRef } from 'react'

interface LottieAnimationProps {
  animationUrl: string
  className?: string
  loop?: boolean
  autoplay?: boolean
}

export default function LottieAnimation({
  animationUrl,
  className = '',
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [error, setError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Intersection Observer to only load when visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    fetch(animationUrl)
      .then((res) => res.json())
      .then((data) => {
        setAnimationData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load Lottie animation:', err)
        setError(true)
        setIsLoading(false)
      })
  }, [animationUrl, isVisible])

  if (!isVisible || isLoading) {
    return (
      <div ref={containerRef} className={`flex items-center justify-center ${className}`}>
        <div className="text-black/20 text-sm">
          {!isVisible ? '' : 'Loading animation...'}
        </div>
      </div>
    )
  }

  if (error || !animationData) {
    return null
  }

  return (
    <div ref={containerRef} className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid meet',
          progressiveLoad: true,
        }}
      />
    </div>
  )
}
