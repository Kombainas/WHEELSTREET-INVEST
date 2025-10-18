import React from 'react'

interface TableWrapProps {
  children: React.ReactNode
}

export function TableWrap({ children }: TableWrapProps) {
  return (
    <div className="table-wrap">
      {children}
    </div>
  )
}

interface TableProps {
  children: React.ReactNode
}

export function Table({ children }: TableProps) {
  return (
    <table className="w-full text-sm md:text-base border-separate border-spacing-0">
      {children}
    </table>
  )
}

interface TheadProps {
  children: React.ReactNode
}

export function Thead({ children }: TheadProps) {
  return (
    <thead className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-black/10 z-10">
      {children}
    </thead>
  )
}

interface TbodyProps {
  children: React.ReactNode
}

export function Tbody({ children }: TbodyProps) {
  return <tbody>{children}</tbody>
}

interface TrProps {
  children: React.ReactNode
  isTotal?: boolean
}

export function Tr({ children, isTotal = false }: TrProps) {
  const className = isTotal
    ? 'border-t-2 border-black/20 font-semibold'
    : 'even:bg-black/[0.02] hover:bg-black/[0.04] transition-colors'

  return <tr className={className}>{children}</tr>
}

interface ThProps {
  children: React.ReactNode
  align?: 'left' | 'right'
}

export function Th({ children, align }: ThProps) {
  const isNumeric = !align && typeof children === 'string' && /^[-+]?[\d\s.,]+(%|EUR)?$/i.test(children)
  const alignment = align || (isNumeric ? 'right' : 'left')

  return (
    <th className={`py-3 px-4 text-${alignment} font-semibold text-black ${alignment === 'right' ? 'num-right' : ''}`}>
      {children}
    </th>
  )
}

interface TdProps {
  children: React.ReactNode
  align?: 'left' | 'right'
}

export function Td({ children, align }: TdProps) {
  const isNumeric = !align && typeof children === 'string' && /^[-+]?[\d\s.,]+(%|EUR)?$/i.test(children)
  const alignment = align || (isNumeric ? 'right' : 'left')

  return (
    <td className={`py-3 px-4 text-${alignment} ${alignment === 'right' ? 'num-right' : ''}`}>
      {children}
    </td>
  )
}

interface TotalBarProps {
  label: string
  value: string
  note?: string
}

export function TotalBar({ label, value, note }: TotalBarProps) {
  return (
    <div className="mt-4 mb-8 p-6 bg-black/[0.02] border-2 border-black/10 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div className="flex-1">
          <div className="label-caps text-black/60 mb-1">{label}</div>
          <div className="text-2xl md:text-3xl font-bold tabular-nums">{value}</div>
        </div>
        {note && (
          <div className="text-sm text-black/60 sm:text-right">
            {note}
          </div>
        )}
      </div>
    </div>
  )
}

interface DownloadCSVProps {
  fileName: string
  getData: () => string
  children?: React.ReactNode
}

export function DownloadCSV({ fileName, getData, children }: DownloadCSVProps) {
  const handleDownload = () => {
    const csvContent = getData()
    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)

    link.setAttribute('href', url)
    link.setAttribute('download', fileName)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-white border border-black/20 rounded hover:bg-black hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2"
      aria-label={`Download ${fileName}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M8 1v10M4 7l4 4 4-4M2 15h12" />
      </svg>
      {children || 'Download CSV'}
    </button>
  )
}

// Helper to escape CSV values
export function escapeCSV(value: string): string {
  if (!value) return ''
  const stringValue = String(value)
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

// Helper to convert array of arrays to CSV string
export function arrayToCSV(rows: string[][]): string {
  return rows.map(row => row.map(escapeCSV).join(',')).join('\n')
}

const TableComponents = {
  Wrap: TableWrap,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TotalBar,
  DownloadCSV,
}

export default TableComponents
