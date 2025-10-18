import { cookies } from 'next/headers'

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies()
  const session = cookieStore.get('investor_session')
  return session?.value
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('investor_session')
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession()
  const validPassword = process.env.INVESTOR_PASSWORD
  return session === validPassword
}
