"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  Calendar,
  CreditCard,
  FileText,
  Filter,
  Laptop,
  RefreshCw,
  Save,
  Star,
  Trash2,
  Users,
} from "lucide-react"

// Mock feature data
const featureToggles = [
  {
    id: "feature-dashboard-analytics",
    name: "Dashboard Analytics",
    description: "Gráficos y análisis avanzados en el dashboard de usuario",
    status: "active",
    category: "ui",
    lastUpdated: "2024-05-15T10:30:00",
  },
  {
    id: "feature-dark-mode",
    name: "Modo Oscuro",
    description: "Permite a los usuarios cambiar a modo oscuro",
    status: "active",
    category: "ui",
    lastUpdated: "2024-06-20T14:45:00",
  },
  {
    id: "feature-recurring-invoices",
    name: "Facturas Recurrentes",
    description: "Permite crear y gestionar facturas que se repiten automáticamente",
    status: "beta",
    category: "invoice",
    lastUpdated: "2024-07-05T09:15:00",
  },
  {
    id: "feature-client-portal",
    name: "Portal de Clientes",
    description: "Portal web para que los clientes vean sus facturas y pagos",
    status: "inactive",
    category: "client",
    lastUpdated: "2024-06-10T11:30:00",
  },
  {
    id: "feature-tax-ai-assistant",
    name: "Asistente IA para Impuestos",
    description: "Asistente con IA para ayudar con consultas fiscales",
    status: "beta",
    category: "ai",
    lastUpdated: "2024-07-10T16:20:00",
  },
  {
    id: "feature-bulk-invoice-import",
    name: "Importación Masiva de Facturas",
    description: "Permite importar múltiples facturas desde CSV/Excel",
    status: "active",
    category: "invoice",
    lastUpdated: "2024-04-18T13:45:00",
  },
  {
    id: "feature-bank-integration",
    name: "Integración Bancaria",
    description: "Conecta con cuentas bancarias para conciliar pagos",
    status: "development",
    category: "integration",
    lastUpdated: "2024-07-01T10:00:00",
  },
  {
    id: "feature-expense-tracking",
    name: "Seguimiento de Gastos",
    description: "Herramientas para registro y categorización de gastos",
    status: "active",
    category: "finance",
    lastUpdated: "2024-05-25T09:30:00",
  },
]

export function FeatureToggles() {
  const [features, setFeatures] = useState(featureToggles)
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isSaving, setIsSaving] = useState(false)

  // Handle toggle change
  const handleToggle = (featureId: string, enabled: boolean) => {
    setFeatures(
      features.map((feature) =>
        feature.id === featureId ? { ...feature, status: enabled ? "active" : "inactive" } : feature,
      ),
    )
  }

  // Filter features based on selected filters
  const filteredFeatures = features.filter((feature) => {
    const categoryMatch = filterCategory === "all" || feature.category === filterCategory
    const statusMatch = filterStatus === "all" || feature.status === filterStatus
    return categoryMatch && statusMatch
  })

  // Handle save changes
  const handleSaveChanges = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Activa</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactiva</Badge>
      case "beta":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Beta</Badge>
      case "development":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Desarrollo</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Desconocido</Badge>
    }
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ui":
        return <Laptop className="h-4 w-4 text-blue-600" />
      case "invoice":
        return <FileText className="h-4 w-4 text-green-600" />
      case "client":
        return <Users className="h-4 w-4 text-purple-600" />
      case "ai":
        return <Star className="h-4 w-4 text-amber-600" />
      case "integration":
        return <RefreshCw className="h-4 w-4 text-indigo-600" />
      case "finance":
        return <CreditCard className="h-4 w-4 text-red-600" />
      default:
        return <Calendar className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Gestión de Características</CardTitle>
            <CardDescription>Activa o desactiva funcionalidades del sistema</CardDescription>
          </div>

          <Button onClick={handleSaveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <span className="mr-2">Guardando...</span>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="w-full sm:w-64">
              <Label htmlFor="filter-category" className="mb-1 block text-sm">
                Filtrar por Categoría
              </Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger id="filter-category">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="ui">Interfaz de Usuario</SelectItem>
                  <SelectItem value="invoice">Facturación</SelectItem>
                  <SelectItem value="client">Clientes</SelectItem>
                  <SelectItem value="ai">Inteligencia Artificial</SelectItem>
                  <SelectItem value="integration">Integraciones</SelectItem>
                  <SelectItem value="finance">Finanzas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-64">
              <Label htmlFor="filter-status" className="mb-1 block text-sm">
                Filtrar por Estado
              </Label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger id="filter-status">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="active">Activa</SelectItem>
                  <SelectItem value="inactive">Inactiva</SelectItem>
                  <SelectItem value="beta">Beta</SelectItem>
                  <SelectItem value="development">Desarrollo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="ml-auto flex items-end">
              <Button variant="outline" size="sm" className="gap-1 h-10">
                <Filter className="h-4 w-4" />
                <span>Filtrar</span>
              </Button>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4">
            {filteredFeatures.length === 0 ? (
              <div className="rounded-lg border border-dashed p-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                  <AlertCircle className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No se encontraron características</h3>
                <p className="mt-2 text-sm text-gray-500">
                  No hay características que coincidan con los filtros seleccionados.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setFilterCategory("all")
                    setFilterStatus("all")
                  }}
                >
                  Restablecer Filtros
                </Button>
              </div>
            ) : (
              filteredFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-md bg-gray-100 p-1.5">{getCategoryIcon(feature.category)}</div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{feature.name}</h3>
                        {getStatusBadge(feature.status)}
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{feature.description}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        Última actualización: {formatDate(feature.lastUpdated)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Switch
                        id={`toggle-${feature.id}`}
                        checked={feature.status === "active" || feature.status === "beta"}
                        onCheckedChange={(checked) => handleToggle(feature.id, checked)}
                        disabled={feature.status === "development"}
                      />
                      <Label htmlFor={`toggle-${feature.id}`} className="cursor-pointer text-sm">
                        {feature.status === "active" || feature.status === "beta" ? "Activada" : "Desactivada"}
                      </Label>
                    </div>

                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Add New Feature Button */}
          <div className="flex justify-center pt-4">
            <Button variant="outline" className="gap-1">
              <span>Añadir Nueva Característica</span>
            </Button>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
            <AlertCircle className="mt-0.5 h-5 w-5" />
            <div>
              <h4 className="text-sm font-medium">Información Importante</h4>
              <p className="mt-1 text-xs">
                Al desactivar una característica, esta dejará de estar disponible para todos los usuarios. Algunas
                características en estado Beta pueden contener errores. Las características en desarrollo no se pueden
                activar en el entorno de producción.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
