import Link from "next/link"
import { Shield, ArrowLeft } from "lucide-react"

export default function AdminNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mx-auto h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <Shield className="h-8 w-8 text-red-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">Página no encontrada</h2>
        <p className="mt-2 text-sm text-gray-600">
          La página administrativa que estás buscando no existe o no tienes permisos para acceder a ella.
        </p>
        <div className="mt-6">
          <Link
            href="/admin"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver al inicio de administración
          </Link>
        </div>
      </div>
    </div>
  )
}
