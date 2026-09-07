'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    throw new Error('Credenciales inválidas')
  }

  const data = await res.json()
  
  // Agregamos AWAIT aquí para Next.js 15+
  const cookieStore = await cookies()
  cookieStore.set('session', data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24, // 24 horas
    path: '/',
  })

  redirect('/dashboard')
}

export async function logout() {
  // Agregamos AWAIT aquí
  const cookieStore = await cookies()
  cookieStore.delete('session')
  redirect('/')
}
