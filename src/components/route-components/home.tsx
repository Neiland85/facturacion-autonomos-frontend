import Link from "next/link"
import { FileText, Users, User } from "lucide-react"

export default function HomeComponent() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a Facturación Autónomos</h1>
        <p className="text-lg text-gray-600">Gestiona tus facturas de forma moderna y eficiente</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/usuarios" className="block group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-blue-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <User className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Usuarios</h2>
            <p className="text-gray-600">Gestiona los usuarios y permisos de la aplicación</p>
          </div>
        </Link>

        <Link href="/clientes" className="block group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-blue-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Clientes</h2>
            <p className="text-gray-600">Administra tu cartera de clientes y sus datos</p>
          </div>
        </Link>

        <Link href="/facturas" className="block group">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md hover:border-blue-200">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900">Facturas</h2>
            <p className="text-gray-600">Crea y gestiona tus facturas de forma sencilla</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
