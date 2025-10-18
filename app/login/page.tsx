'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pwd: password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Neteisingas slaptažodis')
        setLoading(false)
        return
      }

      const next = searchParams.get('next') || '/'
      window.location.href = next
    } catch (err) {
      setError('Kažkas nutiko. Bandykite dar kartą.')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Image
            src="/wheel-street-logo.png"
            alt="Wheelstreet logo"
            width={140}
            height={40}
            priority
            className="h-auto w-auto"
            aria-label="Wheelstreet"
          />
        </div>

        <h1 className="text-3xl font-bold text-black mb-8 text-center">Investuotojų prisijungimas</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Slaptažodis
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-black bg-white text-black focus:outline-none focus:ring-2 focus:ring-black"
              required
              disabled={loading}
              aria-describedby={error ? 'error-message' : undefined}
            />
          </div>

          {error && (
            <p id="error-message" className="text-sm text-black" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 px-4 font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            {loading ? 'Prisijungiama...' : 'Prisijungti'}
          </button>
        </form>
      </div>
    </main>
  )
}
