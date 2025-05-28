"use client"

import { useState } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart3,
  FileText,
  Filter,
  Layers,
  Search,
  Settings,
  Shield,
  ToggleRightIcon as Toggle,
  Users,
} from "lucide-react"
import { getAdminUser, logoutAdmin } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"

import { MetricsPanel } from "./components/metrics-panel"
import { ActivityFeed } from "./components/activity-feed"
import { UserSearch } from "./components/user-search"
import { SystemSettings } from "./components/system-settings"
import { FeatureToggles } from "./components/feature-toggles"
import { SystemLogs } from "./components/system-logs"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const adminUser = getAdminUser()

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin")
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  if (!adminUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="text-center">Acceso Denegado</CardTitle>
            <CardDescription className="text-center">No tienes permiso para acceder a esta página</CardDescription>
          </CardHeader>
          <CardContent>
            <button
              onClick={() => router.push("/admin")}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Iniciar sesión
            </button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Admin Header */}
      <header className="border-b bg-white">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold">Panel de Administración</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-medium text-blue-600">{adminUser.name.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-sm font-medium">{adminUser.name}</p>
                <p className="text-xs text-gray-500">{adminUser.role}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-200"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Admin Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 border-r bg-gray-50">
          <div className="p-4">
            <div className="space-y-1">
              <button
                onClick={() => handleTabChange("overview")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <BarChart3 className="h-4 w-4" />
                <span>Visión General</span>
              </button>

              <button
                onClick={() => handleTabChange("users")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "users"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Users className="h-4 w-4" />
                <span>Usuarios</span>
              </button>

              <button
                onClick={() => handleTabChange("invoices")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "invoices"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <FileText className="h-4 w-4" />
                <span>Facturas</span>
              </button>

              <button
                onClick={() => handleTabChange("settings")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "settings"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Configuración</span>
              </button>

              <button
                onClick={() => handleTabChange("features")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "features"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Toggle className="h-4 w-4" />
                <span>Características</span>
              </button>

              <button
                onClick={() => handleTabChange("logs")}
                className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm ${
                  activeTab === "logs"
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Layers className="h-4 w-4" />
                <span>Registros</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gray-100 p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="h-full space-y-6">
            <TabsContent value="overview" className="h-full space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Visión General</h2>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Últimos 30 días</span>
                </div>
              </div>

              <MetricsPanel />

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Actividad Reciente</CardTitle>
                    <CardDescription>Últimas acciones realizadas en el sistema</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityFeed />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Buscar Usuario</CardTitle>
                    <CardDescription>Encuentra usuarios rápidamente</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="text"
                        placeholder="Buscar por nombre, email o ID"
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                      <p className="text-xs text-gray-500">Búsquedas recientes:</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200">
                          juan.perez@ejemplo.com
                        </span>
                        <span className="inline-flex cursor-pointer items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 hover:bg-gray-200">
                          maria.garcia@ejemplo.com
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="users" className="h-full space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>
              <UserSearch />
            </TabsContent>

            <TabsContent value="invoices" className="h-full space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Facturas</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Facturas</CardTitle>
                  <CardDescription>Gestiona todas las facturas del sistema</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">Cargando facturas...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="h-full space-y-6">
              <h2 className="text-2xl font-bold">Configuración del Sistema</h2>
              <SystemSettings />
            </TabsContent>

            <TabsContent value="features" className="h-full space-y-6">
              <h2 className="text-2xl font-bold">Gestión de Características</h2>
              <FeatureToggles />
            </TabsContent>

            <TabsContent value="logs" className="h-full space-y-6">
              <h2 className="text-2xl font-bold">Registros del Sistema</h2>
              <SystemLogs />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
