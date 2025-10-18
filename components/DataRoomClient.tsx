'use client'

import { useState } from 'react'

interface FileItem {
  name: string
  nameLT: string
  type: 'PDF' | 'XLSX' | 'MP4'
  path: string
  lastUpdated: string
}

interface DataRoomClientProps {
  files: FileItem[]
}

export default function DataRoomClient({ files }: DataRoomClientProps) {
  const [ndaAccepted, setNdaAccepted] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const handleDownload = async (path: string, name: string) => {
    if (!ndaAccepted) return

    setIsDownloading(name)

    try {
      // Log the download
      const logResponse = await fetch('/api/log-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileName: name,
          ndaAccepted: true,
          file: path,
          ts: new Date().toISOString(),
          ua: navigator.userAgent,
        }),
      })

      if (!logResponse.ok) {
        console.warn('Download logging failed, but proceeding with download')
      }

      // Extract filename from path (e.g., "/files/business-plan.pdf" -> "business-plan.pdf")
      const filename = path.split('/').pop() || name

      // Fetch the file as a blob for more reliable downloads
      const response = await fetch(path)
      if (!response.ok) {
        throw new Error('Failed to fetch file')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up the blob URL
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Atsisiuntimas nepavyko. Bandykite dar kartą.')
    } finally {
      setIsDownloading(null)
    }
  }

  const openVideoModal = () => setVideoModalOpen(true)
  const closeVideoModal = () => setVideoModalOpen(false)

  return (
    <>
      {/* NDA Agreement */}
      <div className="border border-black/10 p-6 mb-8" role="region" aria-label="NDA susitarimas">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={ndaAccepted}
            onChange={(e) => setNdaAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 border border-black focus:ring-2 focus:ring-black"
            aria-describedby="nda-description"
          />
          <div className="text-sm">
            <span className="font-medium">Sutinku su Konfidencialumo susitarimu</span>
            <p id="nda-description" className="text-black/60 mt-1">
              Pažymėdamas šį laukelį, patvirtinu, kad visa medžiaga šiame duomenų kambaryje yra
              konfidenciali ir nuosavybinė. Įsipareigoju neatskleisti, nekopijuoti ir neplatinti
              jokios informacijos be išankstinio raštiško sutikimo.
            </p>
          </div>
        </label>
      </div>

      {/* File Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {files.map((file) => (
          <div key={file.path} className="file-card">
            {/* Preview */}
            <div className="file-preview">
              {file.type === 'PDF' && (
                <embed
                  src={`${file.path}#page=1&zoom=120`}
                  type="application/pdf"
                  className="w-full h-full"
                />
              )}
              {file.type === 'XLSX' && (
                <div className="bars">
                  <div className="bar" style={{ height: '60%' }}></div>
                  <div className="bar" style={{ height: '85%' }}></div>
                  <div className="bar" style={{ height: '45%' }}></div>
                  <div className="bar" style={{ height: '70%' }}></div>
                  <div className="bar" style={{ height: '90%' }}></div>
                  <div className="bar" style={{ height: '55%' }}></div>
                  <div className="bar" style={{ height: '75%' }}></div>
                  <div className="bar" style={{ height: '65%' }}></div>
                </div>
              )}
              {file.type === 'MP4' && (
                <button
                  onClick={openVideoModal}
                  className="btn"
                  aria-label="Peržiūrėti produkto demo video"
                >
                  Peržiūra
                </button>
              )}
            </div>

            {/* File Info */}
            <div className="mb-4">
              <span className="label-caps text-black/40">{file.type}</span>
            </div>
            <h3 className="text-lg font-medium mb-1">{file.nameLT}</h3>
            <p className="text-sm text-black/50 mb-4">
              Paskutinį kartą atnaujinta: {file.lastUpdated}
            </p>

            {/* Download Button */}
            <button
              onClick={() => handleDownload(file.path, file.name)}
              disabled={!ndaAccepted || isDownloading === file.name}
              aria-label={`Atsisiųsti ${file.nameLT}`}
              className={`w-full py-2 px-4 border border-black font-medium transition-colors ${
                ndaAccepted && isDownloading !== file.name
                  ? 'hover:bg-black hover:text-white'
                  : 'opacity-40 cursor-not-allowed'
              }`}
            >
              {isDownloading === file.name ? 'Atsisiunčiama...' : 'Atsisiųsti'}
            </button>
          </div>
        ))}
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="backdrop"
          onClick={closeVideoModal}
          role="dialog"
          aria-modal="true"
          aria-label="Produkto demo video"
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-black/10 flex items-center justify-between">
              <h2 className="text-xl font-medium">Produkto demo</h2>
              <button
                onClick={closeVideoModal}
                className="w-8 h-8 flex items-center justify-center hover:bg-black/5 rounded transition-colors"
                aria-label="Uždaryti"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 5l10 10M15 5l-10 10" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <video
                src="/files/demo.mp4"
                controls
                muted
                className="w-full"
                style={{ maxHeight: '70vh' }}
              >
                Jūsų naršyklė nepalaiko video elemento.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
