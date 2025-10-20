import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = request.cookies.get('investor_session')
    const validToken = process.env.SESSION_TOKEN

    if (!session || session.value !== validToken) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { fileType, data } = body

    if (!fileType || !data) {
      return NextResponse.json(
        { error: 'Invalid request - missing fileType or data' },
        { status: 400 }
      )
    }

    // Map file types to file paths
    const fileMap: Record<string, string> = {
      metrics: 'content/metrics.ts',
      updates: 'content/updates.ts',
      investmentPitch: 'content/investment-pitch.ts',
    }

    const filePath = fileMap[fileType]
    if (!filePath) {
      return NextResponse.json(
        { error: `Unknown file type: ${fileType}` },
        { status: 400 }
      )
    }

    const fullPath = join(process.cwd(), filePath)

    // Create backup
    try {
      const backupDir = join(process.cwd(), '.backups')
      if (!existsSync(backupDir)) {
        await mkdir(backupDir, { recursive: true })
      }

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
      const backupPath = join(backupDir, `${fileType}-${timestamp}.backup`)

      if (existsSync(fullPath)) {
        const currentContent = await readFile(fullPath, 'utf-8')
        await writeFile(backupPath, currentContent)
      }
    } catch (backupError) {
      console.error('Backup failed:', backupError)
      // Continue anyway - backup failure shouldn't block saves
    }

    // Generate new file content based on type
    let newContent = ''

    if (fileType === 'metrics') {
      newContent = `export interface Metric {
  label: string
  value: number
  format: 'currency' | 'percentage' | 'number' | 'ratio'
  decimals?: number
  prefix?: string
  suffix?: string
  growth?: string
  trend?: 'up' | 'down' | 'neutral'
}

export const metrics: Metric[] = ${JSON.stringify(data, null, 2)}

export function formatMetric(metric: Metric): string {
  const { value, format, decimals = 0, prefix, suffix } = metric

  switch (format) {
    case 'currency':
      const formatted = new Intl.NumberFormat('lt-LT', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(value)
      const result = prefix ? \`\${prefix}\${formatted}\` : formatted
      return suffix ? \`\${result}\${suffix}\` : result

    case 'percentage':
      const pct = value.toFixed(decimals)
      return \`\${prefix || ''}\${pct}%\${suffix || ''}\`

    case 'ratio':
      const ratio = value.toFixed(decimals)
      return \`1 : \${ratio}\`

    case 'number':
      const num = value.toLocaleString('lt-LT', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
      return \`\${prefix || ''}\${num}\${suffix || ''}\`

    default:
      return value.toString()
  }
}
`
    } else if (fileType === 'updates') {
      newContent = `export interface Update {
  date: string
  title: string
  body: string
  pinned?: boolean
}

export const updates: Update[] = ${JSON.stringify(data, null, 2)}
`
    } else if (fileType === 'investmentPitch') {
      newContent = `export interface InvestmentPitch {
  badge: string
  headline: string
  subheadline: string
  fundraise: {
    amount: string
    equity: string
  }
  valuation: {
    amount: string
    label: string
  }
  target: {
    label: string
    amount: string
    sublabel: string
  }
  useOfFunds: Array<{
    emoji: string
    title: string
    description: string
  }>
}

export const investmentPitch: InvestmentPitch = ${JSON.stringify(data, null, 2)}
`
    }

    // Write to file
    await writeFile(fullPath, newContent, 'utf-8')

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Save error:', error)
    return NextResponse.json(
      { error: 'Failed to save changes' },
      { status: 500 }
    )
  }
}
