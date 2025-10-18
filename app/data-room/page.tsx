import { promises as fs } from 'fs'
import { join } from 'path'
import dynamic from 'next/dynamic'
import Section from '@/components/Section'
import DataRoomClient from '@/components/DataRoomClient'

const LottieAnimation = dynamic(() => import('@/components/LottieAnimation'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-black/20 text-sm">Loading...</div>
    </div>
  ),
})

interface FileItem {
  name: string
  nameLT: string
  type: 'PDF' | 'XLSX' | 'MP4'
  path: string
  lastUpdated: string
}

async function getFileMetadata(filePath: string): Promise<string> {
  try {
    const fullPath = join(process.cwd(), 'public', filePath)
    const stats = await fs.stat(fullPath)
    return stats.mtime.toISOString().split('T')[0]
  } catch {
    return '—'
  }
}

export default async function DataRoomPage() {
  const files: FileItem[] = [
    {
      name: 'business-plan',
      nameLT: 'Verslo planas (PDF)',
      type: 'PDF',
      path: '/files/business-plan.pdf',
      lastUpdated: await getFileMetadata('/files/business-plan.pdf'),
    },
    {
      name: 'financial-model',
      nameLT: 'Finansinis modelis (XLSX)',
      type: 'XLSX',
      path: '/files/financial-model.xlsx',
      lastUpdated: await getFileMetadata('/files/financial-model.xlsx'),
    },
    {
      name: 'product-demo',
      nameLT: 'Produkto demo (MP4)',
      type: 'MP4',
      path: '/files/demo.mp4',
      lastUpdated: await getFileMetadata('/files/demo.mp4'),
    },
  ]

  return (
    <Section className="pt-16 pb-24">
      {/* Hero Section with Animation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mb-16">
        {/* Left: Content */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Duomenų kambarys</h1>
          <p className="text-lg text-black/70">
            Prieiga prie konfidencialių dokumentų ir medžiagos. Visa informacija yra saugoma ir
            prieinama tik patvirtintiems investuotojams.
          </p>
        </div>

        {/* Right: Lottie Animation */}
        <div className="hidden lg:flex justify-center items-center h-[300px]">
          <LottieAnimation
            animationUrl="/animations/folder-upload.json"
            className="w-[200px] h-full"
            loop={true}
            autoplay={true}
          />
        </div>
      </div>

      {/* Files Section */}
      <div className="max-w-5xl">
        <DataRoomClient files={files} />
      </div>
    </Section>
  )
}
