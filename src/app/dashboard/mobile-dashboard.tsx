"use client"
import Link from "next/link"
import {
  Clock,
  CheckCircleIcon,
  AlertTriangle,
  Calendar,
  Euro,
  BarChart3,
  FileSearch,
  FilePlus2,
  FileDownIcon,
  Calculator,
  ChevronRight,
} from "lucide-react"

// Add these imports at the top of the file
import { useState } from "react"
import { Loader2, AlertCircle, CheckCircle, FileDown } from "lucide-react"

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

// Mock data for the dashboard (same as in user-dashboard.tsx)
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
]

export default function MobileDashboard() {
  // Add these state variables inside the MobileDashboard component
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
        return <CheckCircleIcon className="h-5 w-5 text-green-600" />
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

  // Add these helper functions inside the MobileDashboard component, before the return statement
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
  const fetchInvoiceData = async (quarter: number, year: number) => {
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
  const generatePdfDeclaration = async (quarter: number, year: number, invoiceData: any) => {
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
  const handleDownloadDeclaration = () => {
    if (!generatedDeclaration?.pdfUrl) return

    // In a real implementation, this would trigger a download
    // For now, we'll just simulate it with an alert
    window.open(generatedDeclaration.pdfUrl, "_blank")
  }

  return (
    <div className="space-y-6 sm:hidden">
      {declarationError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-start mb-4">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">Error</p>
            <p className="text-xs">{declarationError}</p>
          </div>
        </div>
      )}

      {declarationSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md flex items-start mb-4">
          <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium text-sm">¡Éxito!</p>
            <p className="text-xs">{declarationSuccess}</p>
            {generatedDeclaration?.pdfUrl && (
              <button
                onClick={handleDownloadDeclaration}
                className="mt-2 inline-flex items-center px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
              >
                <FileDown className="h-3 w-3 mr-1" />
                Descargar PDF
              </button>
            )}
          </div>
        </div>
      )}
      {/* Main stats cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Total billed this quarter */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Facturado {currentQuarterData.quarter}</h2>
            <Euro className="h-4 w-4 text-blue-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(currentQuarterData.totalBilled)}</p>
          <div className="mt-1">
            <span className="text-xs text-gray-500">{currentQuarterData.invoiceCount} facturas</span>
          </div>
        </div>

        {/* Pending payments */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-gray-900">Pendiente</h2>
            <Clock className="h-4 w-4 text-yellow-600" />
          </div>
          <p className="text-xl font-bold text-gray-900">{formatCurrency(currentQuarterData.pendingPayment)}</p>
          <div className="mt-1">
            <span className="text-xs text-gray-500">
              {recentInvoices.filter((inv) => inv.status === "pending").length} facturas
            </span>
          </div>
        </div>
      </div>

      {/* Tax declaration status */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-semibold text-gray-900">Declaración Trimestral</h2>
          {getStatusIcon(currentQuarterData.taxDeclarationStatus)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(currentQuarterData.taxAmount)}</p>
            <span className="text-xs text-gray-500">Impuestos estimados</span>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentQuarterData.taxDeclarationStatus)}`}
            >
              {currentQuarterData.taxDeclarationStatus === "pending"
                ? "Pendiente"
                : currentQuarterData.taxDeclarationStatus === "completed"
                  ? "Completada"
                  : "Vencida"}
            </span>
            <span className="text-xs text-gray-500 mt-1">
              {daysUntilDue > 0 ? `${daysUntilDue} días restantes` : "Vencida"}
            </span>
          </div>
        </div>
        {/* Declaration generation feedback */}
        {declarationError && (
          <div className="mt-4 p-2 bg-red-100 text-red-800 rounded-md text-sm flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {declarationError}
          </div>
        )}
        {declarationSuccess && (
          <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-sm flex items-center">
            <CheckCircleIcon className="h-4 w-4 mr-2" />
            {declarationSuccess}
          </div>
        )}
        {/* Generate declaration button */}
        <button
          onClick={handleGenerateDeclaration}
          disabled={isGeneratingDeclaration}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isGeneratingDeclaration ? (
            <div className="flex items-center justify-center">
              Generando...
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
            </div>
          ) : (
            "Generar Declaración Trimestral"
          )}
        </button>
        {/* Download declaration button */}
        {generatedDeclaration && (
          <button
            onClick={handleDownloadDeclaration}
            className="w-full mt-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <div className="flex items-center justify-center">
              Descargar Declaración
              <FileDownIcon className="ml-2 h-4 w-4" />
            </div>
          </button>
        )}
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-sm font-semibold text-gray-900">Acciones Rápidas</h2>
        </div>
        <div className="divide-y divide-gray-200">
          <Link href="/facturas/nueva" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <FilePlus2 className="h-4 w-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Nueva Factura</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>

          <Link href="/facturas" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <FileSearch className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Ver Facturas</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>

          <button
            onClick={handleGenerateDeclaration}
            disabled={isGeneratingDeclaration}
            className="flex items-center justify-between p-4 hover:bg-gray-50 w-full text-left disabled:opacity-50"
          >
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Calculator className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium">
                {isGeneratingDeclaration ? "Generando..." : "Declaración Trimestral"}
              </span>
            </div>
            {isGeneratingDeclaration ? (
              <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-400" />
            )}
          </button>

          <Link href="/informes" className="flex items-center justify-between p-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <BarChart3 className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium">Informes</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </Link>
        </div>
      </div>

      {/* Recent invoices */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-900">Facturas Recientes</h2>
          <Link href="/facturas" className="text-xs text-blue-600 hover:text-blue-800">
            Ver todas
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {recentInvoices.slice(0, 3).map((invoice) => (
            <div key={invoice.id} className="p-4">
              <div className="flex justify-between items-start mb-1">
                <div>
                  <span className="text-sm font-medium text-gray-900">{invoice.number}</span>
                  <p className="text-xs text-gray-500">{invoice.client}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                  {invoice.status === "paid" ? "Pagada" : "Pendiente"}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{formatDate(invoice.date)}</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(invoice.amount)}</span>
              </div>
              <div className="flex justify-end mt-2 space-x-2">
                <button className="p-1 text-gray-600 hover:text-gray-900">
                  <FileSearch className="h-4 w-4" />
                </button>
                <button className="p-1 text-blue-600 hover:text-blue-900">
                  <FileDownIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
