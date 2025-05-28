"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
  FileDown,
  Calendar,
  X,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import InvoiceForm from "./invoice-form"
import DeleteConfirmation from "./delete-confirmation"

// Types
interface Client {
  id: number
  name: string
  nif: string
  email: string
  address: string
  city: string
  postalCode: string
  province: string
}

interface InvoiceItem {
  id: number
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
  total: number
}

interface Invoice {
  id: number
  number: string
  client: Client
  issueDate: string
  dueDate: string
  items: InvoiceItem[]
  subtotal: number
  taxAmount: number
  total: number
  notes?: string
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
}

// Mock data for clients
const mockClients: Client[] = [
  {
    id: 1,
    name: "Empresa Ejemplo S.L.",
    nif: "B12345678",
    email: "contacto@empresa-ejemplo.com",
    address: "Calle Mayor, 123",
    city: "Madrid",
    postalCode: "28001",
    province: "Madrid",
  },
  {
    id: 2,
    name: "Autónomo García",
    nif: "12345678A",
    email: "garcia@autonomo.es",
    address: "Avenida Libertad, 45",
    city: "Barcelona",
    postalCode: "08001",
    province: "Barcelona",
  },
  {
    id: 3,
    name: "Servicios Técnicos S.A.",
    nif: "A87654321",
    email: "info@servicios-tecnicos.com",
    address: "Plaza España, 10",
    city: "Valencia",
    postalCode: "46001",
    province: "Valencia",
  },
]

// Mock data for invoices
const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: "F-2024-001",
    client: mockClients[0],
    issueDate: "2024-01-15",
    dueDate: "2024-02-15",
    items: [
      {
        id: 1,
        description: "Desarrollo web",
        quantity: 1,
        unitPrice: 1500,
        taxRate: 21,
        total: 1500,
      },
    ],
    subtotal: 1500,
    taxAmount: 315,
    total: 1815,
    notes: "Pago a 30 días",
    status: "paid",
  },
  {
    id: 2,
    number: "F-2024-002",
    client: mockClients[1],
    issueDate: "2024-02-01",
    dueDate: "2024-03-01",
    items: [
      {
        id: 1,
        description: "Consultoría SEO",
        quantity: 1,
        unitPrice: 750,
        taxRate: 21,
        total: 750,
      },
    ],
    subtotal: 750,
    taxAmount: 157.5,
    total: 907.5,
    status: "sent",
  },
  {
    id: 3,
    number: "F-2024-003",
    client: mockClients[2],
    issueDate: "2024-01-10",
    dueDate: "2024-02-10",
    items: [
      {
        id: 1,
        description: "Mantenimiento mensual",
        quantity: 1,
        unitPrice: 2250,
        taxRate: 21,
        total: 2250,
      },
    ],
    subtotal: 2250,
    taxAmount: 472.5,
    total: 2722.5,
    status: "overdue",
  },
  {
    id: 4,
    number: "F-2024-004",
    client: mockClients[0],
    issueDate: "2024-02-15",
    dueDate: "2024-03-15",
    items: [
      {
        id: 1,
        description: "Diseño gráfico",
        quantity: 1,
        unitPrice: 1800,
        taxRate: 21,
        total: 1800,
      },
    ],
    subtotal: 1800,
    taxAmount: 378,
    total: 2178,
    status: "sent",
  },
  {
    id: 5,
    number: "F-2024-005",
    client: mockClients[1],
    issueDate: "2024-03-05",
    dueDate: "2024-04-05",
    items: [
      {
        id: 1,
        description: "Campaña de marketing",
        quantity: 1,
        unitPrice: 3500,
        taxRate: 21,
        total: 3500,
      },
    ],
    subtotal: 3500,
    taxAmount: 735,
    total: 4235,
    status: "draft",
  },
  {
    id: 6,
    number: "F-2024-006",
    client: mockClients[2],
    issueDate: "2024-03-20",
    dueDate: "2024-04-20",
    items: [
      {
        id: 1,
        description: "Soporte técnico",
        quantity: 1,
        unitPrice: 950,
        taxRate: 21,
        total: 950,
      },
    ],
    subtotal: 950,
    taxAmount: 199.5,
    total: 1149.5,
    status: "paid",
  },
]

export default function Facturas() {
  // State
  const [invoices, setInvoices] = useState<Invoice[]>(mockInvoices)
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(mockInvoices)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [quarterFilter, setQuarterFilter] = useState<string>("all")
  const [yearFilter, setYearFilter] = useState<string>(new Date().getFullYear().toString())
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)
  const [currentInvoice, setCurrentInvoice] = useState<Invoice | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "error"
    message: string
  } | null>(null)

  // Filter invoices when filters change
  useEffect(() => {
    let result = [...invoices]

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (invoice) =>
          invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          invoice.client.nif.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((invoice) => invoice.status === statusFilter)
    }

    // Quarter filter
    if (quarterFilter !== "all") {
      const quarterMonths = {
        Q1: [1, 2, 3],
        Q2: [4, 5, 6],
        Q3: [7, 8, 9],
        Q4: [10, 11, 12],
      }
      result = result.filter((invoice) => {
        const month = new Date(invoice.issueDate).getMonth() + 1 // JavaScript months are 0-indexed
        return quarterMonths[quarterFilter as keyof typeof quarterMonths].includes(month)
      })
    }

    // Year filter
    if (yearFilter) {
      result = result.filter((invoice) => {
        const year = new Date(invoice.issueDate).getFullYear().toString()
        return year === yearFilter
      })
    }

    setFilteredInvoices(result)
  }, [invoices, searchTerm, statusFilter, quarterFilter, yearFilter])

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "cancelled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Helper function to get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagada"
      case "sent":
        return "Enviada"
      case "draft":
        return "Borrador"
      case "overdue":
        return "Vencida"
      case "cancelled":
        return "Cancelada"
      default:
        return status
    }
  }

  // Handle creating a new invoice
  const handleCreateInvoice = () => {
    setCurrentInvoice(null)
    setIsFormOpen(true)
  }

  // Handle editing an invoice
  const handleEditInvoice = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    setIsFormOpen(true)
  }

  // Handle deleting an invoice
  const handleDeleteClick = (invoice: Invoice) => {
    setCurrentInvoice(invoice)
    setIsDeleteConfirmationOpen(true)
  }

  // Handle confirming invoice deletion
  const handleConfirmDelete = async () => {
    if (!currentInvoice) return

    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Remove the invoice from the list
      setInvoices((prev) => prev.filter((invoice) => invoice.id !== currentInvoice.id))
      setNotification({
        type: "success",
        message: `Factura ${currentInvoice.number} eliminada correctamente`,
      })
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error al eliminar la factura. Inténtalo de nuevo.",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteConfirmationOpen(false)
      setCurrentInvoice(null)
    }
  }

  // Handle saving an invoice (create or update)
  const handleSaveInvoice = async (invoiceData: Partial<Invoice>) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (currentInvoice) {
        // Update existing invoice
        const updatedInvoice = { ...currentInvoice, ...invoiceData }
        setInvoices((prev) =>
          prev.map((invoice) => (invoice.id === currentInvoice.id ? (updatedInvoice as Invoice) : invoice)),
        )
        setNotification({
          type: "success",
          message: `Factura ${updatedInvoice.number} actualizada correctamente`,
        })
      } else {
        // Create new invoice
        const newInvoice = {
          id: Math.max(...invoices.map((i) => i.id)) + 1,
          number: `F-${new Date().getFullYear()}-${(invoices.length + 1).toString().padStart(3, "0")}`,
          ...invoiceData,
        } as Invoice
        setInvoices((prev) => [...prev, newInvoice])
        setNotification({
          type: "success",
          message: `Factura ${newInvoice.number} creada correctamente`,
        })
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error al guardar la factura. Inténtalo de nuevo.",
      })
    } finally {
      setIsLoading(false)
      setIsFormOpen(false)
      setCurrentInvoice(null)
    }
  }

  // Handle downloading an invoice as PDF
  const handleDownloadInvoice = async (invoice: Invoice) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call to generate and download the PDF
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock download - in a real app, this would trigger a file download
      console.log(`Downloading invoice ${invoice.number}`)

      setNotification({
        type: "success",
        message: `Factura ${invoice.number} descargada correctamente`,
      })
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error al descargar la factura. Inténtalo de nuevo.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  // Calculate total amounts
  const totalBilled = filteredInvoices.reduce((sum, invoice) => sum + invoice.total, 0)
  const totalPending = filteredInvoices
    .filter((invoice) => invoice.status === "sent" || invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.total, 0)
  const totalPaid = filteredInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.total, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Facturas</h1>
        <button
          onClick={handleCreateInvoice}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </button>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`${
            notification.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          } border px-4 py-3 rounded-md flex items-start justify-between`}
        >
          <div className="flex items-start">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <span>{notification.message}</span>
          </div>
          <button onClick={() => setNotification(null)} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Facturado</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalBilled)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pendiente de Cobro</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPending)}</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Cobrado</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPaid)}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar facturas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos los estados</option>
              <option value="draft">Borrador</option>
              <option value="sent">Enviada</option>
              <option value="paid">Pagada</option>
              <option value="overdue">Vencida</option>
              <option value="cancelled">Cancelada</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={quarterFilter}
              onChange={(e) => setQuarterFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="all">Todos los trimestres</option>
              <option value="Q1">T1 (Ene-Mar)</option>
              <option value="Q2">T2 (Abr-Jun)</option>
              <option value="Q3">T3 (Jul-Sep)</option>
              <option value="Q4">T4 (Oct-Dic)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Número
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vencimiento
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Importe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No se encontraron facturas con los filtros seleccionados
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.client.name}</div>
                      <div className="text-xs text-gray-500">{invoice.client.nif}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(invoice.issueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(invoice.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.total)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                          invoice.status,
                        )}`}
                      >
                        {getStatusText(invoice.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDownloadInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Descargar PDF"
                        >
                          <FileDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditInvoice(invoice)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Editar"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(invoice)}
                          className="text-red-600 hover:text-red-900"
                          title="Eliminar"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
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
                Mostrando <span className="font-medium">1</span> a{" "}
                <span className="font-medium">{filteredInvoices.length}</span> de{" "}
                <span className="font-medium">{filteredInvoices.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Anterior</span>
                  <ChevronDown className="h-5 w-5 rotate-90" />
                </button>
                <button className="bg-blue-50 border-blue-500 text-blue-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                  1
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Siguiente</span>
                  <ChevronDown className="h-5 w-5 -rotate-90" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Form Modal */}
      {isFormOpen && (
        <InvoiceForm
          invoice={currentInvoice}
          clients={mockClients}
          onSave={handleSaveInvoice}
          onCancel={() => setIsFormOpen(false)}
          isLoading={isLoading}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmationOpen && currentInvoice && (
        <DeleteConfirmation
          invoice={currentInvoice}
          onConfirm={handleConfirmDelete}
          onCancel={() => setIsDeleteConfirmationOpen(false)}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}
