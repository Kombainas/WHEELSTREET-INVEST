'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

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
  const [error, setError] = useState(false)

  useEffect(() => {
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
  }, [animationUrl])

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-black/20 text-sm">Loading animation...</div>
      </div>
    )
  }

  if (error || !animationData) {
    return null
  }

  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
