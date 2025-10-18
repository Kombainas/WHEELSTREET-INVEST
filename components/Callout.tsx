import { ReactNode } from 'react'

interface CalloutProps {
  variant?: 'info' | 'note' | 'risk'
  children: ReactNode
}

const variantStyles = {
  info: 'border-black/20',
  note: 'border-black/15',
  risk: 'border-black/30',
}

const variantLabels = {
  info: 'Info',
  note: 'Note',
  risk: 'Risk',
}

export default function Callout({ variant = 'info', children }: CalloutProps) {
  return (
    <aside className={`callout ${variantStyles[variant]}`} role="complementary">
      <div className="callout-label">{variantLabels[variant]}</div>
      <div className="callout-content">{children}</div>
    </aside>
  )
}
