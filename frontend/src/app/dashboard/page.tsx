import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logout } from '@/app/actions/auth'

export default async function DashboardPage() {
  // Agregamos AWAIT aquí para extraer la cookie
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) {
    redirect('/')
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!res.ok) {
    redirect('/')
  }

  const user = await res.json()

  return (
    <div className="min-h-screen bg-gray-50 p-10 text-gray-800">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Dashboard Seguro</h1>
          <form action={logout}>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-semibold transition-colors">
              Cerrar Sesión
            </button>
          </form>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">Bienvenido, {user.email}</h2>
        <p className="mb-4">Tu rol en el sistema es: <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-bold uppercase">{user.role}</span></p>
        
        <div className="bg-gray-900 p-4 rounded-md overflow-auto">
          <p className="text-gray-400 text-sm mb-2">// Payload devuelto por Quarkus</p>
          <pre className="text-green-400 text-sm">{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
