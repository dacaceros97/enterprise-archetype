import { login } from '@/app/actions/auth'

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <form action={login} className="p-8 bg-white shadow-xl rounded-lg flex flex-col gap-5 w-96 text-gray-800">
        <h1 className="text-2xl font-bold text-center text-blue-600">Enterprise Login</h1>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Correo Electrónico</label>
          <input name="email" type="email" defaultValue="admin@archetype.com" className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-black" required />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold">Contraseña</label>
          <input name="password" type="password" defaultValue="secretpassword" className="border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 text-black" required />
        </div>

        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded transition-colors mt-2">
          Ingresar al Sistema
        </button>
      </form>
    </main>
  )
}
