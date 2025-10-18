import { ReactNode } from 'react'

interface QuoteProps {
  children: ReactNode
  cite?: string
}

export default function Quote({ children, cite }: QuoteProps) {
  return (
    <figure className="pull-quote">
      <blockquote>{children}</blockquote>
      {cite && <figcaption className="pull-quote-cite">— {cite}</figcaption>}
    </figure>
  )
}
