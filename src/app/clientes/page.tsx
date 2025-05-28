"use client"

import { useState } from "react"
import { Search, Plus, Eye, Edit, Trash2, Mail, Phone, MapPin } from "lucide-react"

interface Cliente {
  id: number
  nombre: string
  nif: string
  email: string
  telefono: string
  direccion: string
  ciudad: string
  provincia: string
  codigoPostal: string
  fechaAlta: string
}

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [clientes] = useState<Cliente[]>([
    {
      id: 1,
      nombre: "Empresa Ejemplo S.L.",
      nif: "B12345678",
      email: "contacto@empresa-ejemplo.com",
      telefono: "+34 912 345 678",
      direccion: "Calle Mayor, 123",
      ciudad: "Madrid",
      provincia: "Madrid",
      codigoPostal: "28001",
      fechaAlta: "2024-01-10",
    },
    {
      id: 2,
      nombre: "Autónomo García",
      nif: "12345678A",
      email: "garcia@autonomo.es",
      telefono: "+34 654 321 098",
      direccion: "Avenida Libertad, 45",
      ciudad: "Barcelona",
      provincia: "Barcelona",
      codigoPostal: "08001",
      fechaAlta: "2024-01-15",
    },
    {
      id: 3,
      nombre: "Servicios Técnicos S.A.",
      nif: "A87654321",
      email: "info@servicios-tecnicos.com",
      telefono: "+34 933 456 789",
      direccion: "Plaza España, 10",
      ciudad: "Valencia",
      provincia: "Valencia",
      codigoPostal: "46001",
      fechaAlta: "2024-02-01",
    },
  ])

  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.nif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Clientes</h1>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar clientes por nombre, NIF o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Cards for mobile, Table for desktop */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Mobile view */}
        <div className="sm:hidden">
          {filteredClientes.map((cliente) => (
            <div key={cliente.id} className="p-4 border-b border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{cliente.nombre}</h3>
                <span className="text-sm text-gray-500">{cliente.nif}</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  {cliente.email}
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  {cliente.telefono}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {cliente.ciudad}, {cliente.provincia}
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <button className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
                  Ver
                </button>
                <button className="flex-1 px-3 py-1 text-sm bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre / Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIF/CIF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha Alta
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Acciones</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.nif}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm text-gray-900">
                        <Mail className="h-3 w-3 mr-1 text-gray-400" />
                        {cliente.email}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Phone className="h-3 w-3 mr-1 text-gray-400" />
                        {cliente.telefono}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.ciudad}</div>
                    <div className="text-sm text-gray-500">{cliente.provincia}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(cliente.fechaAlta).toLocaleDateString("es-ES")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Anterior
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Siguiente
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">1</span> a <span className="font-medium">3</span> de{" "}
                <span className="font-medium">3</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button className="z-10 bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Siguiente</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
