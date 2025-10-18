import { promises as fs } from 'fs'
import { join } from 'path'
import Section from '@/components/Section'
import DataRoomClient from '@/components/DataRoomClient'

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
      <div className="max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Duomenų kambarys</h1>
        <p className="text-lg text-black/70 mb-12">
          Prieiga prie konfidencialių dokumentų ir medžiagos
        </p>

        <DataRoomClient files={files} />
      </div>
    </Section>
  )
}
