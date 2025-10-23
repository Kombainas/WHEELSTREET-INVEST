import PasswordProtection from '@/components/PasswordProtection'

export default function DeckLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtection correctPassword="wheelst123" pageName="deck">
      {children}
    </PasswordProtection>
  )
}
