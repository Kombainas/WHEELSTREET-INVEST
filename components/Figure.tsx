import { ReactNode } from 'react'

interface FigureProps {
  children: ReactNode
  caption?: string
}

export default function Figure({ children, caption }: FigureProps) {
  return (
    <figure className="deck-figure">
      <div className="deck-figure-content">{children}</div>
      {caption && <figcaption className="deck-figure-caption">{caption}</figcaption>}
    </figure>
  )
}
