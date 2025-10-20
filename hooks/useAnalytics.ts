import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function useAnalytics() {
  const trackEvent = async (
    type: 'page_view' | 'search' | 'download' | 'section_view',
    data?: Record<string, any>
  ) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type, data }),
      })
    } catch (error) {
      // Silently fail - analytics should not break user experience
      console.debug('Analytics tracking failed:', error)
    }
  }

  return { trackEvent }
}

// Hook to automatically track page views
export function usePageView() {
  const pathname = usePathname()
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    if (pathname) {
      trackEvent('page_view', { page: pathname })
    }
  }, [pathname])
}

// Hook to track when elements come into view (e.g., deck sections)
export function useInViewTracking(
  elementRef: React.RefObject<HTMLElement>,
  data: Record<string, any>
) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent('section_view', data)
            observer.disconnect() // Track only once
          }
        })
      },
      { threshold: 0.5 } // 50% visible
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [elementRef, data])
}
