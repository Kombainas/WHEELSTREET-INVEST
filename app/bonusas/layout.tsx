import PasswordProtection from '@/components/PasswordProtection'

export default function BonusasLayout({ children }: { children: React.ReactNode }) {
  return (
    <PasswordProtection correctPassword="wheelst123" pageName="bonusas">
      {children}
    </PasswordProtection>
  )
}
