"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AlertCircle, Check, Download, Filter, Info, Loader2, RotateCw, Search, Shield, X } from "lucide-react"

// Mock log data
const logEntries = [
  {
    id: "log-001",
    timestamp: "2024-07-15T10:23:45",
    level: "info",
    source: "auth",
    message: "Usuario 'juan.perez@ejemplo.com' ha iniciado sesión correctamente",
    details: "IP: 192.168.1.105, User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
  },
  {
    id: "log-002",
    timestamp: "2024-07-15T10:20:10",
    level: "error",
    source: "api",
    message: "Error al conectar con servicio externo de facturación",
    details: "Connection timeout after 30s: https://api.facturacion-externa.com/v1/invoices",
  },
  {
    id: "log-003",
    timestamp: "2024-07-15T10:15:22",
    level: "warning",
    source: "database",
    message: "Consulta SQL lenta detectada (2.5s)",
    details:
      "Query: SELECT * FROM invoices JOIN clients ON invoices.client_id = clients.id WHERE invoices.status = 'pending' ORDER BY invoices.due_date",
  },
  {
    id: "log-004",
    timestamp: "2024-07-15T10:10:05",
    level: "info",
    source: "system",
    message: "Tarea programada completada: backup diario",
    details: "Backup stored at /backups/daily/2024-07-15.zip (125MB)",
  },
  {
    id: "log-005",
    timestamp: "2024-07-15T10:05:33",
    level: "debug",
    source: "app",
    message: "Renderizado componente de dashboard para usuario 'maria.garcia@ejemplo.com'",
    details: "Render time: 450ms, Components: MetricsPanel, ActivityFeed, InvoicesList",
  },
  {
    id: "log-006",
    timestamp: "2024-07-15T09:58:12",
    level: "error",
    source: "auth",
    message: "Intento de inicio de sesión fallido",
    details: "Username: admin, IP: 203.0.113.42, Attempt: 3/5",
  },
  {
    id: "log-007",
    timestamp: "2024-07-15T09:45:30",
    level: "info",
    source: "invoice",
    message: "Nueva factura creada: F-2024-042",
    details: "User: juan.perez@ejemplo.com, Client: Empresa Ejemplo S.L., Amount: €1,500.00",
  },
  {
    id: "log-008",
    timestamp: "2024-07-15T09:30:18",
    level: "warning",
    source: "security",
    message: "Múltiples intentos de acceso a ruta protegida",
    details: "Path: /api/admin/users, IP: 203.0.113.100, Count: 8 in last 5 minutes",
  },
  {
    id: "log-009",
    timestamp: "2024-07-15T09:15:55",
    level: "critical",
    source: "system",
    message: "Uso elevado de CPU detectado: 92%",
    details: "Duration: 3min, Process: nodejs (PID: 1234), Action: Auto-scaling triggered",
  },
  {
    id: "log-010",
    timestamp: "2024-07-15T09:00:42",
    level: "info",
    source: "email",
    message: "Email enviado correctamente",
    details: "Template: invoice_reminder, Recipient: cliente@empresa-ejemplo.com, Invoice: F-2024-038",
  },
]

export function SystemLogs() {
  const [logs, setLogs] = useState(logEntries)
  const [filterLevel, setFilterLevel] = useState("all")
  const [filterSource, setFilterSource] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [expandedLog, setExpandedLog] = useState<string | null>(null)

  // Filter logs based on selected filters and search term
  const filteredLogs = logs.filter((log) => {
    const levelMatch = filterLevel === "all" || log.level === filterLevel
    const sourceMatch = filterSource === "all" || log.source === filterSource
    const searchMatch =
      searchTerm === "" ||
      log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    return levelMatch && sourceMatch && searchMatch
  })

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Get level badge
  const getLevelBadge = (level: string) => {
    switch (level) {
      case "info":
        return (
          <div className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
            <Info className="h-3 w-3" />
            <span>Info</span>
          </div>
        )
      case "warning":
        return (
          <div className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
            <AlertCircle className="h-3 w-3" />
            <span>Warning</span>
          </div>
        )
      case "error":
        return (
          <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
            <X className="h-3 w-3" />
            <span>Error</span>
          </div>
        )
      case "critical":
        return (
          <div className="flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
            <AlertCircle className="h-3 w-3" />
            <span>Critical</span>
          </div>
        )
      case "debug":
        return (
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
            <Loader2 className="h-3 w-3" />
            <span>Debug</span>
          </div>
        )
      default:
        return (
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
            <Info className="h-3 w-3" />
            <span>{level}</span>
          </div>
        )
    }
  }

  // Get source badge
  const getSourceBadge = (source: string) => {
    let color = ""
    let icon = null

    switch (source) {
      case "auth":
        color = "bg-purple-100 text-purple-800"
        icon = <Shield className="h-3 w-3" />
        break
      case "api":
        color = "bg-indigo-100 text-indigo-800"
        icon = <RotateCw className="h-3 w-3" />
        break
      case "database":
        color = "bg-green-100 text-green-800"
        icon = <Check className="h-3 w-3" />
        break
      case "system":
        color = "bg-blue-100 text-blue-800"
        icon = <Loader2 className="h-3 w-3" />
        break
      case "security":
        color = "bg-red-100 text-red-800"
        icon = <Shield className="h-3 w-3" />
        break
      default:
        color = "bg-gray-100 text-gray-800"
        icon = <Info className="h-3 w-3" />
    }

    return (
      <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${color}`}>
        {icon}
        <span>{source}</span>
      </div>
    )
  }

  // Toggle log details
  const toggleLogDetails = (logId: string) => {
    if (expandedLog === logId) {
      setExpandedLog(null)
    } else {
      setExpandedLog(logId)
    }
  }

  // Refresh logs
  const handleRefreshLogs = () => {
    setIsLoading(true)

    // Simulate API call to refresh logs
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  // Download logs
  const handleDownloadLogs = () => {
    // In a real implementation, this would generate and download a log file
    alert("Descargando logs...")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Registros del Sistema</CardTitle>
            <CardDescription>Visualiza y analiza la actividad del sistema</CardDescription>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshLogs} disabled={isLoading}>
              {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <RotateCw className="h-4 w-4" />
              )}
              <span className="ml-2">Actualizar</span>
            </Button>

            <Button variant="outline" size="sm" onClick={handleDownloadLogs}>
              <Download className="h-4 w-4" />
              <span className="ml-2">Descargar</span>
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Buscar en logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="w-full sm:w-48">
              <Select value={filterLevel} onValueChange={setFilterLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los niveles</SelectItem>
                  <SelectItem value="debug">Debug</SelectItem>
                  <SelectItem value="info">Info</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-48">
              <Select value={filterSource} onValueChange={setFilterSource}>
                <SelectTrigger>
                  <SelectValue placeholder="Origen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los orígenes</SelectItem>
                  <SelectItem value="auth">Autenticación</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                  <SelectItem value="database">Base de Datos</SelectItem>
                  <SelectItem value="system">Sistema</SelectItem>
                  <SelectItem value="app">Aplicación</SelectItem>
                  <SelectItem value="invoice">Facturas</SelectItem>
                  <SelectItem value="security">Seguridad</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm" className="sm:h-10 gap-1">
              <Filter className="h-4 w-4" />
              <span>Filtrar</span>
            </Button>
          </div>

          {/* Logs List */}
          <div className="rounded-md border">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8">
                <div className="rounded-full bg-gray-100 p-3">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-medium">No se encontraron logs</h3>
                <p className="mt-2 text-center text-sm text-gray-500">
                  No hay logs que coincidan con los filtros seleccionados. Prueba a cambiar los criterios de búsqueda.
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="p-4">
                    <div
                      className="flex cursor-pointer flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                      onClick={() => toggleLogDetails(log.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="hidden sm:block">{getLevelBadge(log.level)}</div>

                        <div>
                          <div className="flex items-center gap-2 sm:hidden">
                            {getLevelBadge(log.level)}
                            {getSourceBadge(log.source)}
                          </div>

                          <p className="text-sm font-medium">{log.message}</p>
                          <p className="text-xs text-gray-500">{formatDate(log.timestamp)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="hidden sm:block">{getSourceBadge(log.source)}</div>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log(`Log action for ${log.id}`)
                          }}
                        >
                          <Info className="h-4 w-4 text-gray-500" />
                        </Button>
                      </div>
                    </div>

                    {expandedLog === log.id && (
                      <div className="mt-2 rounded-md bg-gray-50 p-3 text-sm">
                        <p className="font-mono text-xs">{log.details}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredLogs.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Mostrando {filteredLogs.length} de {logs.length} registros
              </div>

              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
