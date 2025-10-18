'use client'

import { useState } from 'react'
import Section from '@/components/Section'

const files = [
  {
    name: 'Business Plan',
    type: 'PDF',
    size: '2.4 MB',
    path: '/files/business-plan.pdf',
  },
  {
    name: 'Financial Model',
    type: 'XLSX',
    size: '1.8 MB',
    path: '/files/financial-model.xlsx',
  },
  {
    name: 'Product Demo',
    type: 'MP4',
    size: '15.3 MB',
    path: '/files/demo.mp4',
  },
]

export default function DataRoomPage() {
  const [ndaAccepted, setNdaAccepted] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)

  const handleDownload = async (path: string, name: string) => {
    if (!ndaAccepted) return

    setIsDownloading(name)

    try {
      const logResponse = await fetch('/api/log-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: name, ndaAccepted: true }),
      })

      if (!logResponse.ok) {
        throw new Error('Download logging failed')
      }

      const link = document.createElement('a')
      link.href = path
      link.download = name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <Section className="pt-16 pb-24">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Data Room</h1>
        <p className="text-lg text-black/70 mb-12">
          Access confidential documents and materials
        </p>

        <div className="border border-black/10 p-6 mb-8" role="region" aria-label="NDA Agreement">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={ndaAccepted}
              onChange={(e) => setNdaAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 border border-black focus:ring-2 focus:ring-black"
              aria-describedby="nda-description"
            />
            <div className="text-sm">
              <span className="font-medium">I agree to the Non-Disclosure Agreement</span>
              <p id="nda-description" className="text-black/60 mt-1">
                By checking this box, I acknowledge that all materials in this data room are
                confidential and proprietary. I agree not to disclose, copy, or distribute any
                information without prior written consent.
              </p>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file.path}
              className="border border-black/10 p-6 hover:border-black/30 transition-colors"
            >
              <div className="mb-4">
                <span className="label-caps text-black/40">{file.type}</span>
              </div>
              <h3 className="text-lg font-medium mb-2">{file.name}</h3>
              <p className="text-sm text-black/60 mb-4">{file.size}</p>
              <button
                onClick={() => handleDownload(file.path, file.name)}
                disabled={!ndaAccepted || isDownloading === file.name}
                aria-label={`Download ${file.name}`}
                className={`w-full py-2 px-4 border border-black font-medium transition-colors ${
                  ndaAccepted && isDownloading !== file.name
                    ? 'hover:bg-black hover:text-white'
                    : 'opacity-40 cursor-not-allowed'
                }`}
              >
                {isDownloading === file.name ? 'Downloading...' : 'Download'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
