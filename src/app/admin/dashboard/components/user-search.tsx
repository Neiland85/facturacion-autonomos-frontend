"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Download, Edit, FileText, Filter, Lock, MoreHorizontal, Search, Trash2, User } from "lucide-react"

// Mock user data
const mockUsers = [
  {
    id: "U123456",
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    role: "user",
    status: "active",
    createdAt: "2023-05-15T10:30:00",
    lastLogin: "2024-07-14T15:45:22",
    invoiceCount: 42,
    totalBilled: 15750.5,
  },
  {
    id: "U123457",
    name: "María García",
    email: "maria.garcia@ejemplo.com",
    role: "user",
    status: "active",
    createdAt: "2023-06-20T11:15:00",
    lastLogin: "2024-07-15T09:12:35",
    invoiceCount: 38,
    totalBilled: 12340.75,
  },
  {
    id: "U123458",
    name: "Carlos López",
    email: "carlos.lopez@ejemplo.com",
    role: "user",
    status: "inactive",
    createdAt: "2023-07-10T14:25:00",
    lastLogin: "2024-03-22T08:30:15",
    invoiceCount: 15,
    totalBilled: 4250.0,
  },
  {
    id: "U123459",
    name: "Ana Martínez",
    email: "ana.martinez@ejemplo.com",
    role: "premium",
    status: "active",
    createdAt: "2023-08-05T09:45:00",
    lastLogin: "2024-07-15T11:22:48",
    invoiceCount: 56,
    totalBilled: 22800.25,
  },
  {
    id: "U123460",
    name: "Roberto Sánchez",
    email: "roberto.sanchez@ejemplo.com",
    role: "user",
    status: "blocked",
    createdAt: "2023-09-18T16:30:00",
    lastLogin: "2024-02-10T13:45:30",
    invoiceCount: 8,
    totalBilled: 3200.0,
  },
]

// Mock invoice data for a specific user
const mockUserInvoices = [
  {
    id: "F-2024-042",
    date: "2024-06-15T10:30:00",
    client: "Empresa Ejemplo S.L.",
    amount: 1500.0,
    status: "paid",
  },
  {
    id: "F-2024-038",
    date: "2024-05-28T11:15:00",
    client: "Servicios Técnicos S.A.",
    amount: 750.0,
    status: "paid",
  },
  {
    id: "F-2024-036",
    date: "2024-05-10T14:25:00",
    client: "Autónomo García",
    amount: 2250.0,
    status: "paid",
  },
  {
    id: "F-2024-033",
    date: "2024-04-22T09:45:00",
    client: "Empresa Ejemplo S.L.",
    amount: 1800.0,
    status: "paid",
  },
]

export function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState<(typeof mockUsers)[0] | null>(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  const handleViewUser = (user: (typeof mockUsers)[0]) => {
    setSelectedUser(user)
    setIsUserModalOpen(true)
  }

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Admin</Badge>
      case "premium":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Premium</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Usuario</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Activo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Inactivo</Badge>
      case "blocked":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Bloqueado</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">Desconocido</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Buscar Usuarios</CardTitle>
              <CardDescription>Encuentra y gestiona usuarios del sistema</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filtrar</span>
              </Button>
              <Button size="sm" className="h-8 gap-1">
                <Download className="h-3.5 w-3.5" />
                <span>Exportar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Fecha Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No se encontraron usuarios con los criterios de búsqueda.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-blue-100 text-blue-600">
                                {user.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell>{formatDate(user.createdAt)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewUser(user)}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Ver perfil</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="mr-2 h-4 w-4" />
                                <span>Ver facturas</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                <span>Cambiar contraseña</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600 hover:text-red-700 focus:text-red-700">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Eliminar usuario</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Detail Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Perfil de Usuario</DialogTitle>
            <DialogDescription>Información detallada y gestión del usuario</DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="mt-4">
              <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-start">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-lg">{selectedUser.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="mt-4 sm:ml-6 sm:mt-0">
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-gray-500">{selectedUser.email}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {getRoleBadge(selectedUser.role)}
                    {getStatusBadge(selectedUser.status)}
                    <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">ID: {selectedUser.id}</Badge>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 sm:ml-auto sm:mt-0">
                  <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    {selectedUser.status === "blocked" ? "Desbloquear" : "Bloquear"}
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="info">
                <TabsList className="w-full">
                  <TabsTrigger value="info" className="flex-1">
                    Información
                  </TabsTrigger>
                  <TabsTrigger value="invoices" className="flex-1">
                    Facturas
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="flex-1">
                    Actividad
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="info" className="space-y-4 pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium text-gray-500">Fecha de registro</p>
                      <p className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(selectedUser.createdAt)}
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium text-gray-500">Último acceso</p>
                      <p className="flex items-center gap-1 text-sm">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        {formatDate(selectedUser.lastLogin)}
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium text-gray-500">Total facturas</p>
                      <p className="flex items-center gap-1 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {selectedUser.invoiceCount} facturas
                      </p>
                    </div>

                    <div className="rounded-lg border p-4">
                      <p className="text-sm font-medium text-gray-500">Total facturado</p>
                      <p className="flex items-center gap-1 text-sm">
                        <FileText className="h-4 w-4 text-gray-400" />
                        {formatCurrency(selectedUser.totalBilled)}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="mb-2 text-sm font-medium">Acciones Administrativas</h4>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Lock className="mr-2 h-4 w-4" />
                        Resetear contraseña
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Cambiar rol
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar usuario
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="invoices" className="pt-4">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Factura</TableHead>
                          <TableHead>Fecha</TableHead>
                          <TableHead>Cliente</TableHead>
                          <TableHead>Importe</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockUserInvoices.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell className="font-medium">{invoice.id}</TableCell>
                            <TableCell>{formatDate(invoice.date)}</TableCell>
                            <TableCell>{invoice.client}</TableCell>
                            <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                                {invoice.status === "paid" ? "Pagada" : "Pendiente"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="pt-4">
                  <div className="rounded-lg border p-4">
                    <p className="text-center text-sm text-gray-500">Próximamente: Registro de actividad del usuario</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
