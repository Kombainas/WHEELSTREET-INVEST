'use client'

import { useState, useEffect } from 'react'

interface PasswordProtectionProps {
  children: React.ReactNode
  correctPassword: string
  pageName: string
}

export default function PasswordProtection({
  children,
  correctPassword,
  pageName
}: PasswordProtectionProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // Check if already authenticated
  useEffect(() => {
    const authKey = `auth_${pageName}`
    const stored = sessionStorage.getItem(authKey)
    if (stored === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [pageName])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === correctPassword) {
      const authKey = `auth_${pageName}`
      sessionStorage.setItem(authKey, 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Neteisingas slaptažodis')
      setPassword('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-black/40">Kraunama...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-black/5 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-black/10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🔒</div>
              <h1 className="text-2xl font-bold mb-2">Apsaugotas turinys</h1>
              <p className="text-black/60">
                Šis puslapis apsaugotas slaptažodžiu
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-black/70 mb-2"
                >
                  Slaptažodis
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:border-black transition-all"
                  placeholder="Įveskite slaptažodį"
                  autoFocus
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black/90 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Prisijungti
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-black/40">
              Apsauga aktyvi tik šiai sesijai
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
