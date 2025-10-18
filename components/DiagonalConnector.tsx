'use client'

import { useEffect, useState, useRef } from 'react'

interface DiagonalConnectorProps {
  fromId: string
  toId: string
}

interface LineCoordinates {
  x1: number
  y1: number
  x2: number
  y2: number
}

export default function DiagonalConnector({ fromId, toId }: DiagonalConnectorProps) {
  const [coords, setCoords] = useState<LineCoordinates | null>(null)
  const throttleRef = useRef<NodeJS.Timeout>()

  const calculateCoordinates = () => {
    const fromElement = document.getElementById(fromId)
    const toElement = document.getElementById(toId)

    if (!fromElement || !toElement) return

    const fromRect = fromElement.getBoundingClientRect()
    const toRect = toElement.getBoundingClientRect()

    setCoords({
      x1: fromRect.left + fromRect.width / 2,
      y1: fromRect.bottom,
      x2: toRect.left + toRect.width / 2,
      y2: toRect.top,
    })
  }

  useEffect(() => {
    calculateCoordinates()

    const handleUpdate = () => {
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }

      throttleRef.current = setTimeout(() => {
        calculateCoordinates()
      }, 100)
    }

    window.addEventListener('scroll', handleUpdate, { passive: true })
    window.addEventListener('resize', handleUpdate)

    return () => {
      window.removeEventListener('scroll', handleUpdate)
      window.removeEventListener('resize', handleUpdate)
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }
    }
  }, [fromId, toId])

  if (!coords) return null

  const svgWidth = Math.max(coords.x1, coords.x2) + 100
  const svgHeight = Math.max(coords.y1, coords.y2) + 100

  return (
    <svg
      className="fixed top-0 left-0 pointer-events-none -z-10"
      width={svgWidth}
      height={svgHeight}
      style={{ opacity: 0.15 }}
    >
      <line
        x1={coords.x1}
        y1={coords.y1}
        x2={coords.x2}
        y2={coords.y2}
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  )
}
