"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Database, Globe, HardDrive, Info, Mail, Save, Server } from "lucide-react"

// Mock system data
const systemInfo = {
  version: "1.5.2",
  lastUpdate: "2024-07-10T08:15:30",
  databaseSize: "1.24 GB",
  storageFree: "142.5 GB",
  storageTotal: "500 GB",
  serverLoad: "32%",
  serverMemory: "64%",
  activeConnections: 42,
}

export function SystemSettings() {
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.ejemplo.com",
    smtpPort: "587",
    smtpUsername: "notificaciones@facturacion-autonomos.com",
    smtpPassword: "••••••••••••",
    senderEmail: "notificaciones@facturacion-autonomos.com",
    senderName: "Facturación Autónomos",
  })

  const [databaseSettings, setDatabaseSettings] = useState({
    host: "db.facturacion-autonomos.com",
    port: "5432",
    name: "facturacion_db",
    maxConnections: "100",
    connectionTimeout: "30",
    enableQueryLogging: true,
  })

  const [regionSettings, setRegionSettings] = useState({
    defaultCountry: "ES",
    defaultLanguage: "es-ES",
    defaultTimezone: "Europe/Madrid",
    defaultCurrency: "EUR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "24h",
  })

  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = () => {
    setIsSaving(true)

    // Simulate saving settings
    setTimeout(() => {
      setIsSaving(false)
    }, 1500)
  }

  return (
    <Tabs defaultValue="general" className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Configuración del Sistema</CardTitle>
              <CardDescription>Gestiona los parámetros y configuraciones globales</CardDescription>
            </div>
            <Button onClick={handleSaveSettings} disabled={isSaving}>
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
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">
              General
            </TabsTrigger>
            <TabsTrigger value="email" className="flex-1">
              Email
            </TabsTrigger>
            <TabsTrigger value="database" className="flex-1">
              Base de Datos
            </TabsTrigger>
            <TabsTrigger value="region" className="flex-1">
              Regional
            </TabsTrigger>
            <TabsTrigger value="system" className="flex-1">
              Sistema
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="general">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">Nombre de la Aplicación</Label>
                    <Input id="app-name" defaultValue="Facturación Autónomos" />
                    <p className="text-xs text-gray-500">Este nombre se mostrará en toda la aplicación y emails.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="app-url">URL de la Aplicación</Label>
                    <Input id="app-url" defaultValue="https://facturacion-autonomos.com" />
                    <p className="text-xs text-gray-500">La URL base para todos los enlaces generados.</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Configuración General</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="pagination">Resultados por página</Label>
                        <p className="text-xs text-gray-500">Número de elementos mostrados en las tablas.</p>
                      </div>
                      <Select defaultValue="25">
                        <SelectTrigger className="w-20">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="25">25</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                          <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="debug-mode">Modo Depuración</Label>
                        <p className="text-xs text-gray-500">
                          Activa el registro detallado para solución de problemas.
                        </p>
                      </div>
                      <Switch id="debug-mode" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="maintenance-mode">Modo Mantenimiento</Label>
                        <p className="text-xs text-gray-500">Muestra un mensaje de mantenimiento a los usuarios.</p>
                      </div>
                      <Switch id="maintenance-mode" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="session-timeout">Tiempo de sesión (min)</Label>
                        <p className="text-xs text-gray-500">Tiempo hasta que la sesión de usuario expira.</p>
                      </div>
                      <Input id="session-timeout" defaultValue="60" className="w-20" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Seguridad</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="force-ssl">Forzar SSL</Label>
                        <p className="text-xs text-gray-500">Redirige todo el tráfico HTTP a HTTPS.</p>
                      </div>
                      <Switch id="force-ssl" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="failed-login-limit">Intentos de login fallidos</Label>
                        <p className="text-xs text-gray-500">Número de intentos antes de bloquear.</p>
                      </div>
                      <Input id="failed-login-limit" defaultValue="5" className="w-20" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="email">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">Servidor SMTP</Label>
                    <Input
                      id="smtp-server"
                      value={emailSettings.smtpServer}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpServer: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">Puerto SMTP</Label>
                    <Input
                      id="smtp-port"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">Usuario SMTP</Label>
                    <Input
                      id="smtp-username"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">Contraseña SMTP</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Email del Remitente</Label>
                    <Input
                      id="sender-email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Nombre del Remitente</Label>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center rounded-lg border p-4">
                  <div className="flex flex-1 items-start gap-4">
                    <Mail className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="text-sm font-medium">Probar configuración de correo</h4>
                      <p className="text-xs text-gray-500">
                        Envía un correo de prueba para verificar la configuración SMTP.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Enviar Prueba
                  </Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Plantillas de Email</h3>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="flex flex-col rounded-lg border p-4">
                      <h4 className="text-sm font-medium">Bienvenida</h4>
                      <p className="mt-1 text-xs text-gray-500">Email enviado al registrarse un nuevo usuario.</p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Editar Plantilla
                      </Button>
                    </div>

                    <div className="flex flex-col rounded-lg border p-4">
                      <h4 className="text-sm font-medium">Factura Generada</h4>
                      <p className="mt-1 text-xs text-gray-500">Email enviado al generar una nueva factura.</p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Editar Plantilla
                      </Button>
                    </div>

                    <div className="flex flex-col rounded-lg border p-4">
                      <h4 className="text-sm font-medium">Recordatorio</h4>
                      <p className="mt-1 text-xs text-gray-500">
                        Email de recordatorio para declaraciones trimestrales.
                      </p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Editar Plantilla
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="database">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="db-host">Host</Label>
                    <Input
                      id="db-host"
                      value={databaseSettings.host}
                      onChange={(e) => setDatabaseSettings({ ...databaseSettings, host: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-port">Puerto</Label>
                    <Input
                      id="db-port"
                      value={databaseSettings.port}
                      onChange={(e) => setDatabaseSettings({ ...databaseSettings, port: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="db-name">Nombre de Base de Datos</Label>
                    <Input
                      id="db-name"
                      value={databaseSettings.name}
                      onChange={(e) => setDatabaseSettings({ ...databaseSettings, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="max-connections">Conexiones Máximas</Label>
                    <Input
                      id="max-connections"
                      value={databaseSettings.maxConnections}
                      onChange={(e) => setDatabaseSettings({ ...databaseSettings, maxConnections: e.target.value })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Configuración Avanzada</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="connection-timeout">Tiempo de Conexión (s)</Label>
                        <p className="text-xs text-gray-500">
                          Tiempo máximo para establecer conexiones con la base de datos.
                        </p>
                      </div>
                      <Input
                        id="connection-timeout"
                        className="w-20"
                        value={databaseSettings.connectionTimeout}
                        onChange={(e) =>
                          setDatabaseSettings({ ...databaseSettings, connectionTimeout: e.target.value })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <Label htmlFor="query-logging">Registro de Consultas</Label>
                        <p className="text-xs text-gray-500">Registra todas las consultas SQL para depuración.</p>
                      </div>
                      <Switch
                        id="query-logging"
                        checked={databaseSettings.enableQueryLogging}
                        onCheckedChange={(checked) =>
                          setDatabaseSettings({ ...databaseSettings, enableQueryLogging: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                  <AlertCircle className="h-5 w-5" />
                  <p className="text-sm">
                    Cambiar la configuración de la base de datos puede provocar interrupciones en el servicio. Realiza
                    estos cambios durante periodos de bajo tráfico.
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Probar Conexión</Button>
                  <Button variant="outline">Realizar Backup</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="region">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="default-country">País Predeterminado</Label>
                    <Select
                      defaultValue={regionSettings.defaultCountry}
                      onValueChange={(value) => setRegionSettings({ ...regionSettings, defaultCountry: value })}
                    >
                      <SelectTrigger id="default-country">
                        <SelectValue placeholder="Seleccionar país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ES">España</SelectItem>
                        <SelectItem value="FR">Francia</SelectItem>
                        <SelectItem value="DE">Alemania</SelectItem>
                        <SelectItem value="IT">Italia</SelectItem>
                        <SelectItem value="PT">Portugal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-language">Idioma Predeterminado</Label>
                    <Select
                      defaultValue={regionSettings.defaultLanguage}
                      onValueChange={(value) => setRegionSettings({ ...regionSettings, defaultLanguage: value })}
                    >
                      <SelectTrigger id="default-language">
                        <SelectValue placeholder="Seleccionar idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es-ES">Español (España)</SelectItem>
                        <SelectItem value="ca-ES">Catalán</SelectItem>
                        <SelectItem value="eu-ES">Euskera</SelectItem>
                        <SelectItem value="gl-ES">Gallego</SelectItem>
                        <SelectItem value="en-US">Inglés (EEUU)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-timezone">Zona Horaria Predeterminada</Label>
                    <Select
                      defaultValue={regionSettings.defaultTimezone}
                      onValueChange={(value) => setRegionSettings({ ...regionSettings, defaultTimezone: value })}
                    >
                      <SelectTrigger id="default-timezone">
                        <SelectValue placeholder="Seleccionar zona horaria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                        <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                        <SelectItem value="Europe/London">Europe/London</SelectItem>
                        <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="default-currency">Moneda Predeterminada</Label>
                    <Select
                      defaultValue={regionSettings.defaultCurrency}
                      onValueChange={(value) => setRegionSettings({ ...regionSettings, defaultCurrency: value })}
                    >
                      <SelectTrigger id="default-currency">
                        <SelectValue placeholder="Seleccionar moneda" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                        <SelectItem value="USD">Dólar ($)</SelectItem>
                        <SelectItem value="GBP">Libra Esterlina (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Formato de Fecha y Hora</h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="date-format">Formato de Fecha</Label>
                      <Select
                        defaultValue={regionSettings.dateFormat}
                        onValueChange={(value) => setRegionSettings({ ...regionSettings, dateFormat: value })}
                      >
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Seleccionar formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          <SelectItem value="DD-MM-YYYY">DD-MM-YYYY</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-format">Formato de Hora</Label>
                      <Select
                        defaultValue={regionSettings.timeFormat}
                        onValueChange={(value) => setRegionSettings({ ...regionSettings, timeFormat: value })}
                      >
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Seleccionar formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-4">
                    <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-blue-800">Información sobre Localización</h4>
                      <p className="text-xs text-blue-700 mt-1">
                        La configuración regional afecta a cómo se muestran las fechas, horas, números y monedas en toda
                        la aplicación. Los usuarios pueden anular esta configuración en sus preferencias personales.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="system">
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Información del Sistema</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Versión:</dt>
                          <dd className="text-sm font-medium">{systemInfo.version}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Última Actualización:</dt>
                          <dd className="text-sm font-medium">
                            {new Date(systemInfo.lastUpdate).toLocaleString("es-ES")}
                          </dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Tamaño de la BD:</dt>
                          <dd className="text-sm font-medium">{systemInfo.databaseSize}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Almacenamiento:</dt>
                          <dd className="text-sm font-medium">
                            {systemInfo.storageFree} libre de {systemInfo.storageTotal}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Estado del Servidor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <dl className="space-y-2">
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Carga CPU:</dt>
                          <dd className="text-sm font-medium">{systemInfo.serverLoad}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Uso de Memoria:</dt>
                          <dd className="text-sm font-medium">{systemInfo.serverMemory}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Conexiones Activas:</dt>
                          <dd className="text-sm font-medium">{systemInfo.activeConnections}</dd>
                        </div>
                        <div className="flex justify-between py-1">
                          <dt className="text-sm text-gray-500">Estado:</dt>
                          <dd className="text-sm font-medium flex items-center">
                            <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                            Operativo
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Mantenimiento del Sistema</h3>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="flex flex-col items-center p-4">
                      <Database className="h-8 w-8 text-blue-600 mb-2" />
                      <h4 className="text-sm font-medium mb-1">Backup de BD</h4>
                      <p className="text-xs text-center text-gray-500 mb-4">
                        Crea una copia de seguridad de la base de datos.
                      </p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Crear Backup
                      </Button>
                    </Card>

                    <Card className="flex flex-col items-center p-4">
                      <Server className="h-8 w-8 text-purple-600 mb-2" />
                      <h4 className="text-sm font-medium mb-1">Limpiar Caché</h4>
                      <p className="text-xs text-center text-gray-500 mb-4">Elimina los archivos temporales y caché.</p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Limpiar Caché
                      </Button>
                    </Card>

                    <Card className="flex flex-col items-center p-4">
                      <HardDrive className="h-8 w-8 text-green-600 mb-2" />
                      <h4 className="text-sm font-medium mb-1">Limpiar Archivos</h4>
                      <p className="text-xs text-center text-gray-500 mb-4">Elimina archivos antiguos no utilizados.</p>
                      <Button variant="outline" size="sm" className="mt-auto">
                        Limpiar Archivos
                      </Button>
                    </Card>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                  <Info className="h-5 w-5" />
                  <div>
                    <h4 className="text-sm font-medium">Próxima actualización programada</h4>
                    <p className="text-xs mt-1">
                      Domingo, 21 de Julio de 2024 a las 02:00 AM (CEST). El sistema no estará disponible durante
                      aproximadamente 30 minutos.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </CardContent>
      </Card>
    </Tabs>
  )
}
