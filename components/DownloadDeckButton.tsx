'use client'

export default function DownloadDeckButton() {
  const handleDownload = () => {
    window.print()
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-medium hover:bg-white hover:text-black border-2 border-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      aria-label="Atsisiųsti verslo planą PDF formatu"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 14l-4-4m4 4l4-4m-4 4V3" />
        <path d="M3 17h14" />
      </svg>
      Atsisiųsti PDF
    </button>
  )
}
