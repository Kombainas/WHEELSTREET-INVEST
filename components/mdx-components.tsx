import type { MDXComponents } from 'mdx/types'
import React from 'react'
import Callout from './Callout'
import Quote from './Quote'
import Figure from './Figure'
import { Disclosure } from './Disclosure'
import TableComponents from './Table'
import { slugify } from '@/lib/slugify'

// Helper to detect if a cell value is numeric
function isNumericCell(children: React.ReactNode): boolean {
  if (typeof children !== 'string') return false
  return /^[-+]?[\d\s.,]+(%|EUR)?$/i.test(children.trim())
}

let h2Counter = 0

export function useMDXComponents(components: MDXComponents): MDXComponents {
  // Reset counter for each render
  h2Counter = 0

  return {
    h1: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children : String(children)
      const id = slugify(text)
      return (
        <h1 id={id} {...props}>
          {children}
        </h1>
      )
    },
    h2: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children : String(children)
      const id = slugify(text)
      h2Counter++
      const number = h2Counter

      return (
        <h2 id={id} {...props}>
          <span className="section-badge" aria-hidden="true">
            {number}
          </span>
          <a href={`#${id}`} className="anchor-link">
            {children}
          </a>
        </h2>
      )
    },
    h3: ({ children, ...props }) => {
      const text = typeof children === 'string' ? children : String(children)
      const id = slugify(text)
      return (
        <h3 id={id} {...props}>
          {children}
        </h3>
      )
    },
    hr: ({ ...props }) => <hr {...props} className="section-divider" />,
    // Table components with auto-wrapping and numeric detection
    table: ({ children, ...props }) => (
      <TableComponents.Wrap>
        <TableComponents.Table {...props}>{children}</TableComponents.Table>
      </TableComponents.Wrap>
    ),
    thead: ({ children, ...props }) => (
      <TableComponents.Thead {...props}>{children}</TableComponents.Thead>
    ),
    tbody: ({ children, ...props }) => (
      <TableComponents.Tbody {...props}>{children}</TableComponents.Tbody>
    ),
    tr: ({ children, ...props }) => {
      // Check if this is a "Total" row
      const isTotal = React.Children.toArray(children).some((child: any) => {
        if (child?.props?.children && typeof child.props.children === 'string') {
          const text = child.props.children.toLowerCase()
          return text.includes('iš viso') || text.includes('total') || text.includes('bendros')
        }
        return false
      })
      return <TableComponents.Tr isTotal={isTotal} {...props}>{children}</TableComponents.Tr>
    },
    th: ({ children, ...props }) => {
      const align = isNumericCell(children) ? 'right' : 'left'
      const { align: _align, ...restProps } = props as any
      return <TableComponents.Th align={align} {...restProps}>{children}</TableComponents.Th>
    },
    td: ({ children, ...props }) => {
      const align = isNumericCell(children) ? 'right' : 'left'
      const { align: _align, ...restProps } = props as any
      return <TableComponents.Td align={align} {...restProps}>{children}</TableComponents.Td>
    },
    // Editorial components
    Callout,
    Quote,
    Figure,
    Disclosure,
    TotalBar: TableComponents.TotalBar,
    DownloadCSV: TableComponents.DownloadCSV,
    ...components,
  }
}
