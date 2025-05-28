"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  PlusCircle,
  Download,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  TrendingUp,
  Euro,
  BarChart3,
  FileSearch,
  FilePlus2,
  FileDown,
  Calculator,
  Loader2,
  AlertCircle,
} from "lucide-react"

// Add these types after the imports
type Declaration = {
  id: string
  quarter: string
  year: number
  totalBilled: number
  taxAmount: number
  status: string
  generatedAt: string
  pdfUrl?: string
}

type ApiResponse = {
  success: boolean
  message: string
  data?: any
}

// Mock data for the dashboard
const currentQuarterData = {
  quarter: "Q2 2024",
  totalBilled: 7850.0,
  pendingPayment: 1250.0,
  paidInvoices: 6600.0,
  invoiceCount: 12,
  taxDeclarationStatus: "pending", // pending, completed, overdue
  taxDeclarationDueDate: "2024-07-20",
  taxAmount: 1962.5,
}

const recentInvoices = [
  { id: 1, number: "F-2024-042", client: "Empresa Ejemplo S.L.", date: "2024-05-15", amount: 1500.0, status: "paid" },
  { id: 2, number: "F-2024-043", client: "Autónomo García", date: "2024-05-28", amount: 750.0, status: "pending" },
  {
    id: 3,
    number: "F-2024-044",
    client: "Servicios Técnicos S.A.",
    date: "2024-06-05",
    amount: 2250.0,
    status: "pending",
  },
  { id: 4, number: "F-2024-045", client: "Empresa Ejemplo S.L.", date: "2024-06-12", amount: 1800.0, status: "paid" },
]

const quarterlyData = [
  { quarter: "Q1 2024", invoiceCount: 10, totalBilled: 6500.0, taxPaid: 1625.0, status: "completed" },
  { quarter: "Q2 2024", invoiceCount: 12, totalBilled: 7850.0, taxPaid: 1962.5, status: "pending" },
  { quarter: "Q3 2024", invoiceCount: 0, totalBilled: 0, taxPaid: 0, status: "upcoming" },
  { quarter: "Q4 2024", invoiceCount: 0, totalBilled: 0, taxPaid: 0, status: "upcoming" },
]

export default function UserDashboard() {
  const [selectedQuarter, setSelectedQuarter] = useState("Q2 2024")
  const [isGeneratingDeclaration, setIsGeneratingDeclaration] = useState(false)
  const [declarationError, setDeclarationError] = useState<string | null>(null)
  const [declarationSuccess, setDeclarationSuccess] = useState<string | null>(null)
  const [generatedDeclaration, setGeneratedDeclaration] = useState<Declaration | null>(null)

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
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "upcoming":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Helper function to get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="h-5 w-5 text-red-600" />
      case "upcoming":
        return <Calendar className="h-5 w-5 text-gray-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  // Calculate days until tax declaration is due
  const calculateDaysUntilDue = () => {
    const dueDate = new Date(currentQuarterData.taxDeclarationDueDate)
    const today = new Date()
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const daysUntilDue = calculateDaysUntilDue()

  // Function to calculate current quarter and year
  const getCurrentQuarterAndYear = () => {
    const now = new Date()
    const month = now.getMonth() + 1 // JavaScript months are 0-indexed
    const year = now.getFullYear()

    let quarter
    if (month <= 3) quarter = 1
    else if (month <= 6) quarter = 2
    else if (month <= 9) quarter = 3
    else quarter = 4

    return { quarter, year }
  }

  // Function to fetch invoice data for a specific quarter and year
  const fetchInvoiceData = async (quarter: number, year: number): Promise<ApiResponse> => {
    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful response
      return {
        success: true,
        message: "Invoices fetched successfully",
        data: {
          invoices: recentInvoices,
          totalBilled: currentQuarterData.totalBilled,
          taxAmount: currentQuarterData.taxAmount,
        },
      }
    } catch (error) {
      console.error("Error fetching invoice data:", error)
      return {
        success: false,
        message: "Failed to fetch invoice data. Please try again.",
      }
    }
  }

  // Function to generate PDF declaration
  const generatePdfDeclaration = async (quarter: number, year: number, invoiceData: any): Promise<ApiResponse> => {
    try {
      // In a real implementation, this would be an actual API call
      // For now, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful response
      return {
        success: true,
        message: "Declaration generated successfully",
        data: {
          id: `DEC-${year}-Q${quarter}-${Math.floor(Math.random() * 1000)}`,
          quarter: `Q${quarter}`,
          year: year,
          totalBilled: invoiceData.totalBilled,
          taxAmount: invoiceData.taxAmount,
          status: "draft",
          generatedAt: new Date().toISOString(),
          pdfUrl: `/api/declarations/download/${year}-Q${quarter}.pdf`,
        },
      }
    } catch (error) {
      console.error("Error generating PDF declaration:", error)
      return {
        success: false,
        message: "Failed to generate declaration. Please try again.",
      }
    }
  }

  // Function to handle declaration generation
  const handleGenerateDeclaration = async () => {
    // Reset states
    setDeclarationError(null)
    setDeclarationSuccess(null)
    setGeneratedDeclaration(null)
    setIsGeneratingDeclaration(true)

    try {
      // Step 1: Determine current quarter and year
      const { quarter, year } = getCurrentQuarterAndYear()

      // Step 2: Fetch invoice data
      const invoiceResponse = await fetchInvoiceData(quarter, year)
      if (!invoiceResponse.success) {
        throw new Error(invoiceResponse.message)
      }

      // Step 3: Calculate financial summary (already done in the API response)

      // Step 4: Generate PDF declaration
      const declarationResponse = await generatePdfDeclaration(quarter, year, invoiceResponse.data)
      if (!declarationResponse.success) {
        throw new Error(declarationResponse.message)
      }

      // Step 5: Handle successful generation
      setGeneratedDeclaration(declarationResponse.data)
      setDeclarationSuccess(
        `Declaración para ${declarationResponse.data.quarter} ${declarationResponse.data.year} generada correctamente.`,
      )
    } catch (error) {
      setDeclarationError(error instanceof Error ? error.message : "Error al generar la declaración")
    } finally {
      setIsGeneratingDeclaration(false)
    }
  }

  // Function to download the generated PDF
  const handleDownloadDeclaration = useCallback(() => {
    if (!generatedDeclaration?.pdfUrl) return

    // In a real implementation, this would trigger a download
    // For now, we'll just simulate it with an alert
    window.open(generatedDeclaration.pdfUrl, "_blank")
  }, [generatedDeclaration])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Panel de Control</h1>
          <p className="text-gray-600">Resumen de tu actividad financiera</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FilePlus2 className="h-4 w-4 mr-2" />
            Nueva Factura
          </button>
          <button
            className="inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleGenerateDeclaration}
            disabled={isGeneratingDeclaration}
          >
            {isGeneratingDeclaration ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Calculator className="h-4 w-4 mr-2" />
                Generar Declaración
              </>
            )}
          </button>
        </div>
      </div>

      {declarationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Error al generar la declaración</p>
            <p className="text-sm">{declarationError}</p>
          </div>
        </div>
      )}

      {declarationSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Declaración generada correctamente</p>
            <p className="text-sm">{declarationSuccess}</p>
            {generatedDeclaration?.pdfUrl && (
              <button
                onClick={handleDownloadDeclaration}
                className="mt-2 inline-flex items-center px-3 py-1.5 text-sm bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
              >
                <FileDown className="h-4 w-4 mr-1.5" />
                Descargar PDF
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total billed this quarter */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Facturado en {currentQuarterData.quarter}</h2>
            <Euro className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(currentQuarterData.totalBilled)}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">{currentQuarterData.invoiceCount} facturas</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor("completed")}`}>
              {formatCurrency(currentQuarterData.paidInvoices)} cobrado
            </span>
          </div>
        </div>

        {/* Pending payments */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Pagos Pendientes</h2>
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{formatCurrency(currentQuarterData.pendingPayment)}</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {recentInvoices.filter((inv) => inv.status === "pending").length} facturas pendientes
            </span>
            <Link href="/facturas" className="text-sm text-blue-600 hover:text-blue-800">
              Ver detalles
            </Link>
          </div>
        </div>

        {/* Tax declaration status */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Declaración Trimestral</h2>
            {getStatusIcon(currentQuarterData.taxDeclarationStatus)}
          </div>
          <div className="flex items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentQuarterData.taxDeclarationStatus)} mr-2`}
            >
              {currentQuarterData.taxDeclarationStatus === "pending"
                ? "Pendiente"
                : currentQuarterData.taxDeclarationStatus === "completed"
                  ? "Completada"
                  : "Vencida"}
            </span>
            <span className="text-sm text-gray-500">
              {daysUntilDue > 0 ? `${daysUntilDue} días restantes` : "Vencida"}
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-gray-900">{formatCurrency(currentQuarterData.taxAmount)}</p>
          <p className="text-sm text-gray-500">Impuestos estimados</p>
        </div>
      </div>

      {/* Quarterly breakdown */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Resumen Trimestral</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trimestre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Facturas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Facturado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impuestos
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
              {quarterlyData.map((quarter) => (
                <tr
                  key={quarter.quarter}
                  className={quarter.quarter === selectedQuarter ? "bg-blue-50" : "hover:bg-gray-50"}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{quarter.quarter}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{quarter.invoiceCount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formatCurrency(quarter.totalBilled)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(quarter.taxPaid)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(quarter.status)}`}
                    >
                      {quarter.status === "completed"
                        ? "Completado"
                        : quarter.status === "pending"
                          ? "Pendiente"
                          : "Próximo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {quarter.status === "completed" ? (
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Download className="h-4 w-4" />
                      </button>
                    ) : quarter.status === "pending" ? (
                      <button className="text-blue-600 hover:text-blue-900 mr-3">Preparar</button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent invoices and actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent invoices */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Facturas Recientes</h2>
            <Link href="/facturas" className="text-sm text-blue-600 hover:text-blue-800">
              Ver todas
            </Link>
          </div>
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
                {recentInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{invoice.number}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{invoice.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(invoice.date)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}
                      >
                        {invoice.status === "paid" ? "Pagada" : "Pendiente"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-gray-600 hover:text-gray-900 mr-2">
                        <FileSearch className="h-4 w-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900 mr-2">
                        <FileDown className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Acciones Rápidas</h2>
          </div>
          <div className="p-6 space-y-4">
            <button className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <FilePlus2 className="h-5 w-5 mr-3" />
                <span className="font-medium">Crear Nueva Factura</span>
              </div>
              <PlusCircle className="h-5 w-5" />
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <FileSearch className="h-5 w-5 mr-3" />
                <span className="font-medium">Ver Historial de Facturas</span>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {currentQuarterData.invoiceCount}
              </span>
            </button>

            <button
              className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleGenerateDeclaration}
              disabled={isGeneratingDeclaration}
            >
              <div className="flex items-center">
                <Calculator className="h-5 w-5 mr-3" />
                <span className="font-medium">
                  {isGeneratingDeclaration ? "Generando Declaración..." : "Generar Declaración Trimestral"}
                </span>
              </div>
              {isGeneratingDeclaration ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <span
                  className={`text-xs ${getStatusColor(currentQuarterData.taxDeclarationStatus)} px-2 py-1 rounded-full`}
                >
                  {daysUntilDue > 0 ? `${daysUntilDue} días` : "Vencida"}
                </span>
              )}
            </button>

            <button className="w-full flex items-center justify-between p-3 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-3" />
                <span className="font-medium">Ver Informes y Estadísticas</span>
              </div>
              <TrendingUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
