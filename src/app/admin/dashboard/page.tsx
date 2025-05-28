"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated, getAdminUser, logoutAdmin, hasAdminRole } from "@/lib/admin-auth"
import { Shield, LogOut, Users, FileText, Settings, AlertTriangle } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [adminUser, setAdminUser] = useState<any>(null)

  useEffect(() => {
    // Check if admin is authenticated
    if (!isAdminAuthenticated()) {
      router.push("/admin")
      return
    }

    // Get admin user data
    const user = getAdminUser()
    setAdminUser(user)
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-500">
                  Bienvenido, {adminUser?.name} ({adminUser?.role === "superadmin" ? "Super Admin" : "Admin"})
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Cards */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Usuarios Registrados</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">42</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-900">
                  Ver todos los usuarios
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Facturas Emitidas</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">156</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-900">
                  Ver todas las facturas
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Alertas del Sistema</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">3</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-900">
                  Ver todas las alertas
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900">Acciones Administrativas</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white shadow rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Gestión de Usuarios</h3>
                <p className="mt-1 text-sm text-gray-500">Administrar usuarios, roles y permisos</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-green-100 text-green-600">
                <FileText className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Gestión de Facturas</h3>
                <p className="mt-1 text-sm text-gray-500">Revisar y gestionar facturas del sistema</p>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg p-4 flex">
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-purple-100 text-purple-600">
                <Settings className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Configuración</h3>
                <p className="mt-1 text-sm text-gray-500">Ajustes generales del sistema</p>
              </div>
            </div>
          </div>
        </div>

        {/* Superadmin Only Section */}
        {hasAdminRole("superadmin") && (
          <div className="mt-8 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h2 className="text-lg font-medium text-yellow-800">Acciones de Super Administrador</h2>
            <p className="mt-1 text-sm text-yellow-600">
              Esta sección solo es visible para usuarios con rol de Super Administrador
            </p>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-white shadow rounded-lg p-4 flex">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-red-100 text-red-600">
                  <Shield className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Gestión de Administradores</h3>
                  <p className="mt-1 text-sm text-gray-500">Administrar cuentas de administradores</p>
                </div>
              </div>

              <div className="bg-white shadow rounded-lg p-4 flex">
                <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-md bg-red-100 text-red-600">
                  <Settings className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Configuración Avanzada</h3>
                  <p className="mt-1 text-sm text-gray-500">Ajustes avanzados del sistema</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
