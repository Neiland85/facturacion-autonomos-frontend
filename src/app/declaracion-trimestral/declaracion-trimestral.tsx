"use client"

import { useState, useEffect } from "react"
import {
  Calendar,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  TrendingUp,
  Calculator,
  ChevronDown,
  Info,
} from "lucide-react"
import DeclarationPreview from "./declaration-preview"
import DeclarationHistory from "./declaration-history"

// Types
interface Invoice {
  id: number
  number: string
  clientName: string
  clientNif: string
  issueDate: string
  amount: number
  taxAmount: number
  status: "paid" | "pending" | "overdue"
}

interface Expense {
  id: number
  description: string
  date: string
  amount: number
  category: string
  deductible: boolean
}

interface DeclarationSummary {
  quarter: string
  year: number
  totalIncome: number
  totalExpenses: number
  taxableIncome: number
  taxRate: number
  taxAmount: number
  invoiceCount: number
  expenseCount: number
}

interface Declaration {
  id: string
  quarter: string
  year: number
  generatedAt: string
  status: "draft" | "submitted" | "accepted" | "rejected"
  pdfUrl?: string
  summary: DeclarationSummary
}

// Mock data for invoices
const mockInvoices: Invoice[] = [
  {
    id: 1,
    number: "F-2024-001",
    clientName: "Empresa Ejemplo S.L.",
    clientNif: "B12345678",
    issueDate: "2024-01-15",
    amount: 1500,
    taxAmount: 315,
    status: "paid",
  },
  {
    id: 2,
    number: "F-2024-002",
    clientName: "Autónomo García",
    clientNif: "12345678A",
    issueDate: "2024-02-01",
    amount: 750,
    taxAmount: 157.5,
    status: "paid",
  },
  {
    id: 3,
    number: "F-2024-003",
    clientName: "Servicios Técnicos S.A.",
    clientNif: "A87654321",
    issueDate: "2024-01-10",
    amount: 2250,
    taxAmount: 472.5,
    status: "paid",
  },
  {
    id: 4,
    number: "F-2024-004",
    clientName: "Empresa Ejemplo S.L.",
    clientNif: "B12345678",
    issueDate: "2024-02-15",
    amount: 1800,
    taxAmount: 378,
    status: "paid",
  },
  {
    id: 5,
    number: "F-2024-005",
    clientName: "Autónomo García",
    clientNif: "12345678A",
    issueDate: "2024-03-05",
    amount: 3500,
    taxAmount: 735,
    status: "paid",
  },
  {
    id: 6,
    number: "F-2024-006",
    clientName: "Servicios Técnicos S.A.",
    clientNif: "A87654321",
    issueDate: "2024-03-20",
    amount: 950,
    taxAmount: 199.5,
    status: "paid",
  },
  {
    id: 7,
    number: "F-2024-007",
    clientName: "Nueva Empresa S.L.",
    clientNif: "B98765432",
    issueDate: "2024-04-10",
    amount: 2800,
    taxAmount: 588,
    status: "paid",
  },
  {
    id: 8,
    number: "F-2024-008",
    clientName: "Cliente Particular",
    clientNif: "87654321B",
    issueDate: "2024-05-15",
    amount: 1200,
    taxAmount: 252,
    status: "paid",
  },
]

// Mock data for expenses
const mockExpenses: Expense[] = [
  {
    id: 1,
    description: "Alquiler oficina",
    date: "2024-01-01",
    amount: 800,
    category: "Alquiler",
    deductible: true,
  },
  {
    id: 2,
    description: "Material oficina",
    date: "2024-01-15",
    amount: 150,
    category: "Material",
    deductible: true,
  },
  {
    id: 3,
    description: "Seguro responsabilidad civil",
    date: "2024-01-01",
    amount: 300,
    category: "Seguros",
    deductible: true,
  },
  {
    id: 4,
    description: "Alquiler oficina",
    date: "2024-02-01",
    amount: 800,
    category: "Alquiler",
    deductible: true,
  },
  {
    id: 5,
    description: "Formación profesional",
    date: "2024-02-20",
    amount: 450,
    category: "Formación",
    deductible: true,
  },
  {
    id: 6,
    description: "Alquiler oficina",
    date: "2024-03-01",
    amount: 800,
    category: "Alquiler",
    deductible: true,
  },
  {
    id: 7,
    description: "Software licencias",
    date: "2024-03-15",
    amount: 200,
    category: "Software",
    deductible: true,
  },
]

// Mock declaration history
const mockDeclarationHistory: Declaration[] = [
  {
    id: "DEC-2024-Q1-001",
    quarter: "Q1",
    year: 2024,
    generatedAt: "2024-04-15T10:30:00",
    status: "submitted",
    pdfUrl: "/api/declarations/2024-Q1.pdf",
    summary: {
      quarter: "Q1",
      year: 2024,
      totalIncome: 6300,
      totalExpenses: 2550,
      taxableIncome: 3750,
      taxRate: 20,
      taxAmount: 750,
      invoiceCount: 4,
      expenseCount: 7,
    },
  },
]

export default function DeclaracionTrimestral() {
  // State
  const [selectedQuarter, setSelectedQuarter] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [declarationSummary, setDeclarationSummary] = useState<DeclarationSummary | null>(null)
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>([])
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([])
  const [declarationHistory, setDeclarationHistory] = useState<Declaration[]>(mockDeclarationHistory)
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "warning" | "info"
    message: string
    details?: string
  } | null>(null)

  // Get current quarter and year
  useEffect(() => {
    const now = new Date()
    const currentMonth = now.getMonth() + 1
    const currentYear = now.getFullYear()

    // Determine current quarter
    let currentQuarter = "Q1"
    if (currentMonth <= 3) currentQuarter = "Q1"
    else if (currentMonth <= 6) currentQuarter = "Q2"
    else if (currentMonth <= 9) currentQuarter = "Q3"
    else currentQuarter = "Q4"

    // Set default to previous quarter (most likely to be declared)
    const quarters = ["Q1", "Q2", "Q3", "Q4"]
    const prevQuarterIndex = quarters.indexOf(currentQuarter) - 1
    if (prevQuarterIndex >= 0) {
      setSelectedQuarter(quarters[prevQuarterIndex])
      setSelectedYear(currentYear.toString())
    } else {
      // If we're in Q1, default to Q4 of previous year
      setSelectedQuarter("Q4")
      setSelectedYear((currentYear - 1).toString())
    }
  }, [])

  // Filter data when quarter/year changes
  useEffect(() => {
    if (selectedQuarter && selectedYear) {
      filterDataByQuarter()
    }
  }, [selectedQuarter, selectedYear])

  // Helper function to get quarter months
  const getQuarterMonths = (quarter: string): number[] => {
    const quarterMonths = {
      Q1: [1, 2, 3],
      Q2: [4, 5, 6],
      Q3: [7, 8, 9],
      Q4: [10, 11, 12],
    }
    return quarterMonths[quarter as keyof typeof quarterMonths] || []
  }

  // Filter invoices and expenses by selected quarter
  const filterDataByQuarter = () => {
    const months = getQuarterMonths(selectedQuarter)
    const year = Number.parseInt(selectedYear)

    // Filter invoices
    const quarterInvoices = mockInvoices.filter((invoice) => {
      const invoiceDate = new Date(invoice.issueDate)
      return invoiceDate.getFullYear() === year && months.includes(invoiceDate.getMonth() + 1)
    })

    // Filter expenses
    const quarterExpenses = mockExpenses.filter((expense) => {
      const expenseDate = new Date(expense.date)
      return expenseDate.getFullYear() === year && months.includes(expenseDate.getMonth() + 1)
    })

    setFilteredInvoices(quarterInvoices)
    setFilteredExpenses(quarterExpenses)

    // Calculate summary
    if (quarterInvoices.length > 0 || quarterExpenses.length > 0) {
      calculateDeclarationSummary(quarterInvoices, quarterExpenses)
    } else {
      setDeclarationSummary(null)
    }
  }

  // Calculate declaration summary
  const calculateDeclarationSummary = (invoices: Invoice[], expenses: Expense[]) => {
    const totalIncome = invoices.reduce((sum, invoice) => sum + invoice.amount, 0)
    const totalExpenses = expenses.filter((e) => e.deductible).reduce((sum, expense) => sum + expense.amount, 0)
    const taxableIncome = totalIncome - totalExpenses
    const taxRate = 20 // Simplified tax rate - in reality this would be progressive
    const taxAmount = taxableIncome * (taxRate / 100)

    setDeclarationSummary({
      quarter: selectedQuarter,
      year: Number.parseInt(selectedYear),
      totalIncome,
      totalExpenses,
      taxableIncome,
      taxRate,
      taxAmount,
      invoiceCount: invoices.length,
      expenseCount: expenses.length,
    })
  }

  // Validate declaration data
  const validateDeclarationData = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    if (!selectedQuarter) {
      errors.push("Debes seleccionar un trimestre")
    }

    if (!selectedYear) {
      errors.push("Debes seleccionar un año")
    }

    if (filteredInvoices.length === 0) {
      errors.push("No hay facturas para el período seleccionado")
    }

    // Check if all invoices are paid
    const unpaidInvoices = filteredInvoices.filter((invoice) => invoice.status !== "paid")
    if (unpaidInvoices.length > 0) {
      errors.push(`Hay ${unpaidInvoices.length} facturas pendientes de cobro`)
    }

    // Check if declaration already exists
    const existingDeclaration = declarationHistory.find(
      (dec) => dec.quarter === selectedQuarter && dec.year.toString() === selectedYear && dec.status === "submitted",
    )
    if (existingDeclaration) {
      errors.push("Ya existe una declaración presentada para este período")
    }

    // Check if quarter is in the future
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    const selectedYearInt = Number.parseInt(selectedYear)
    const quarterEndMonth = Math.max(...getQuarterMonths(selectedQuarter))

    if (selectedYearInt > currentYear || (selectedYearInt === currentYear && quarterEndMonth >= currentMonth)) {
      errors.push("No puedes generar declaraciones para períodos futuros")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  // Generate PDF declaration
  const generatePdfDeclaration = async (): Promise<{ success: boolean; pdfUrl?: string; error?: string }> => {
    try {
      // Simulate API call to generate PDF
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In a real implementation, this would call an API endpoint
      // that generates the PDF on the server
      const pdfUrl = `/api/declarations/${selectedYear}-${selectedQuarter}.pdf`

      return {
        success: true,
        pdfUrl,
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
      return {
        success: false,
        error: "Error al generar el PDF. Por favor, inténtalo de nuevo.",
      }
    }
  }

  // Handle declaration generation
  const handleGenerateDeclaration = async () => {
    // Clear previous notifications
    setNotification(null)

    // Validate data
    const validation = validateDeclarationData()
    if (!validation.isValid) {
      setNotification({
        type: "error",
        message: "No se puede generar la declaración",
        details: validation.errors.join(". "),
      })
      return
    }

    setIsGenerating(true)

    try {
      // Generate PDF
      const result = await generatePdfDeclaration()

      if (result.success && result.pdfUrl) {
        // Add to history
        const newDeclaration: Declaration = {
          id: `DEC-${selectedYear}-${selectedQuarter}-${Date.now()}`,
          quarter: selectedQuarter,
          year: Number.parseInt(selectedYear),
          generatedAt: new Date().toISOString(),
          status: "draft",
          pdfUrl: result.pdfUrl,
          summary: declarationSummary!,
        }

        setDeclarationHistory((prev) => [newDeclaration, ...prev])

        // Show success notification
        setNotification({
          type: "success",
          message: "Declaración generada correctamente",
          details: `Declaración del ${selectedQuarter} ${selectedYear} lista para descargar`,
        })

        // Trigger download
        handleDownloadDeclaration(result.pdfUrl)
      } else {
        throw new Error(result.error || "Error desconocido al generar la declaración")
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error al generar la declaración",
        details: error instanceof Error ? error.message : "Por favor, inténtalo de nuevo más tarde",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  // Handle PDF download
  const handleDownloadDeclaration = (pdfUrl: string) => {
    // In a real implementation, this would download the actual PDF
    window.open(pdfUrl, "_blank")
  }

  // Handle preview
  const handlePreviewDeclaration = () => {
    const validation = validateDeclarationData()
    if (!validation.isValid) {
      setNotification({
        type: "warning",
        message: "No se puede previsualizar la declaración",
        details: validation.errors.join(". "),
      })
      return
    }
    setIsPreviewOpen(true)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES")
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

  // Get available years for selection
  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i.toString())
    }
    return years
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Declaración Trimestral</h1>
          <p className="text-gray-600 mt-1">Genera y gestiona tus declaraciones trimestrales de impuestos</p>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div
          className={`${
            notification.type === "success"
              ? "bg-green-50 border-green-200 text-green-800"
              : notification.type === "error"
                ? "bg-red-50 border-red-200 text-red-800"
                : notification.type === "warning"
                  ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                  : "bg-blue-50 border-blue-200 text-blue-800"
          } border px-4 py-3 rounded-md`}
        >
          <div className="flex items-start">
            {notification.type === "success" ? (
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            ) : notification.type === "error" ? (
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            ) : notification.type === "warning" ? (
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            ) : (
              <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{notification.message}</p>
              {notification.details && <p className="text-sm mt-1">{notification.details}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Period Selection */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Seleccionar Período</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="quarter" className="block text-sm font-medium text-gray-700 mb-1">
              Trimestre
            </label>
            <div className="relative">
              <select
                id="quarter"
                value={selectedQuarter}
                onChange={(e) => setSelectedQuarter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Seleccionar trimestre</option>
                <option value="Q1">T1 - Primer Trimestre (Ene-Mar)</option>
                <option value="Q2">T2 - Segundo Trimestre (Abr-Jun)</option>
                <option value="Q3">T3 - Tercer Trimestre (Jul-Sep)</option>
                <option value="Q4">T4 - Cuarto Trimestre (Oct-Dic)</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              Año
            </label>
            <div className="relative">
              <select
                id="year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">Seleccionar año</option>
                {getAvailableYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      {declarationSummary && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen Financiero</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Income */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Ingresos</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(declarationSummary.totalIncome)}</p>
              <p className="text-sm text-gray-600 mt-1">{declarationSummary.invoiceCount} facturas emitidas</p>
            </div>

            {/* Expenses */}
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Gastos Deducibles</h3>
                <FileText className="h-5 w-5 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(declarationSummary.totalExpenses)}</p>
              <p className="text-sm text-gray-600 mt-1">{declarationSummary.expenseCount} gastos registrados</p>
            </div>

            {/* Tax */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-700">Impuestos a Pagar</h3>
                <Calculator className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(declarationSummary.taxAmount)}</p>
              <p className="text-sm text-gray-600 mt-1">{declarationSummary.taxRate}% sobre base imponible</p>
            </div>
          </div>

          {/* Taxable Income */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Base Imponible</p>
                <p className="text-xs text-gray-500">(Ingresos - Gastos Deducibles)</p>
              </div>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(declarationSummary.taxableIncome)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Invoices List */}
      {filteredInvoices.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Facturas del Período</h2>
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
                    Base Imponible
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IVA
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.number}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invoice.clientName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(invoice.issueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(invoice.taxAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(invoice.amount + invoice.taxAmount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : invoice.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {invoice.status === "paid" ? "Pagada" : invoice.status === "pending" ? "Pendiente" : "Vencida"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Expenses List */}
      {filteredExpenses.length > 0 && (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Gastos del Período</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Importe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Deducible
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExpenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(expense.date)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          expense.deductible ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {expense.deductible ? "Sí" : "No"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {declarationSummary && (
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handlePreviewDeclaration}
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FileText className="h-5 w-5 mr-2" />
              Previsualizar Declaración
            </button>
            <button
              onClick={handleGenerateDeclaration}
              disabled={isGenerating}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generando Declaración...
                </>
              ) : (
                <>
                  <Download className="h-5 w-5 mr-2" />
                  Generar y Descargar PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {selectedQuarter && selectedYear && !declarationSummary && (
        <div className="bg-white shadow-sm rounded-lg p-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay datos para este período</h3>
          <p className="text-sm text-gray-600">
            No se encontraron facturas ni gastos para {selectedQuarter} {selectedYear}
          </p>
        </div>
      )}

      {/* Declaration History */}
      {declarationHistory.length > 0 && <DeclarationHistory declarations={declarationHistory} />}

      {/* Preview Modal */}
      {isPreviewOpen && declarationSummary && (
        <DeclarationPreview
          summary={declarationSummary}
          invoices={filteredInvoices}
          expenses={filteredExpenses}
          onClose={() => setIsPreviewOpen(false)}
          onGenerate={handleGenerateDeclaration}
          isGenerating={isGenerating}
        />
      )}
    </div>
  )
}
