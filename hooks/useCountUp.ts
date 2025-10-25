import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  separator = ',',
  prefix = '',
  suffix = '',
}: UseCountUpOptions) {
  const [count, setCount] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)

            const startTime = Date.now()
            const startValue = 0

            const animate = () => {
              const now = Date.now()
              const progress = Math.min((now - startTime) / duration, 1)

              // Easing function (easeOutQuart)
              const easeProgress = 1 - Math.pow(1 - progress, 4)

              const currentCount = startValue + (end - startValue) * easeProgress
              setCount(currentCount)

              if (progress < 1) {
                requestAnimationFrame(animate)
              } else {
                setCount(end)
              }
            }

            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasStarted])

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')

    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)

    return prefix + parts.join('.') + suffix
  }

  return { count: formatNumber(count), ref }
}
