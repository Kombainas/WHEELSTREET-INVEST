'use client'

import Spline from '@splinetool/react-spline'
import { Suspense } from 'react'

interface Spline3DSceneProps {
  sceneUrl: string
  className?: string
}

export default function Spline3DScene({ sceneUrl, className = '' }: Spline3DSceneProps) {
  return (
    <div className={`relative ${className}`}>
      <Suspense
        fallback={
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-black/20 text-sm">Loading 3D...</div>
          </div>
        }
      >
        <Spline
          scene={sceneUrl}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Suspense>
    </div>
  )
}
