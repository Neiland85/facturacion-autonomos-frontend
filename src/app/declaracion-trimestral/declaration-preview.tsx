"use client"

import { X, Download, Loader2, FileText, TrendingUp, Calculator } from "lucide-react"

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

interface DeclarationPreviewProps {
  summary: DeclarationSummary
  invoices: Invoice[]
  expenses: Expense[]
  onClose: () => void
  onGenerate: () => void
  isGenerating: boolean
}

export default function DeclarationPreview({
  summary,
  invoices,
  expenses,
  onClose,
  onGenerate,
  isGenerating,
}: DeclarationPreviewProps) {
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Get quarter name
  const getQuarterName = (quarter: string) => {
    const quarterNames = {
      Q1: "Primer Trimestre",
      Q2: "Segundo Trimestre",
      Q3: "Tercer Trimestre",
      Q4: "Cuarto Trimestre",
    }
    return quarterNames[quarter as keyof typeof quarterNames] || quarter
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Vista Previa - Declaración {summary.quarter} {summary.year}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Declaration Header */}
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-900">DECLARACIÓN TRIMESTRAL DE IRPF</h3>
              <p className="text-lg text-gray-700 mt-2">
                {getQuarterName(summary.quarter)} {summary.year}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Fecha de generación:</p>
                <p className="font-medium">{formatDate(new Date().toISOString())}</p>
              </div>
              <div>
                <p className="text-gray-600">Período declarado:</p>
                <p className="font-medium">
                  {summary.quarter} {summary.year}
                </p>
              </div>
            </div>
          </div>

          {/* Financial Summary */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Resumen Económico</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Ingresos Totales</span>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(summary.totalIncome)}</p>
                <p className="text-xs text-gray-600 mt-1">{summary.invoiceCount} facturas emitidas</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Gastos Deducibles</span>
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(summary.totalExpenses)}</p>
                <p className="text-xs text-gray-600 mt-1">{summary.expenseCount} gastos registrados</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Cuota a Ingresar</span>
                  <Calculator className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(summary.taxAmount)}</p>
                <p className="text-xs text-gray-600 mt-1">{summary.taxRate}% sobre base imponible</p>
              </div>
            </div>
          </div>

          {/* Tax Calculation */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Cálculo de la Cuota</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ingresos computables</span>
                <span className="font-medium">{formatCurrency(summary.totalIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">(-) Gastos deducibles</span>
                <span className="font-medium">-{formatCurrency(summary.totalExpenses)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
                <span className="text-gray-700 font-medium">Base imponible</span>
                <span className="font-bold">{formatCurrency(summary.taxableIncome)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tipo impositivo</span>
                <span className="font-medium">{summary.taxRate}%</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-300">
                <span className="text-gray-700 font-medium">Cuota íntegra</span>
                <span className="font-bold text-blue-600">{formatCurrency(summary.taxAmount)}</span>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Detalle de Ingresos</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Factura</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Cliente</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Importe</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td className="px-4 py-2 text-sm text-gray-900">{invoice.number}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{invoice.clientName}</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{formatDate(invoice.issueDate)}</td>
                      <td className="px-4 py-2 text-sm text-gray-900 text-right">{formatCurrency(invoice.amount)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={3} className="px-4 py-2 text-sm text-gray-700">
                      Total Ingresos
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">
                      {formatCurrency(summary.totalIncome)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Expense Details */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Detalle de Gastos</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Descripción</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                    <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Importe</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {expenses
                    .filter((expense) => expense.deductible)
                    .map((expense) => (
                      <tr key={expense.id}>
                        <td className="px-4 py-2 text-sm text-gray-900">{expense.description}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{expense.category}</td>
                        <td className="px-4 py-2 text-sm text-gray-900">{formatDate(expense.date)}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 text-right">{formatCurrency(expense.amount)}</td>
                      </tr>
                    ))}
                  <tr className="bg-gray-50 font-medium">
                    <td colSpan={3} className="px-4 py-2 text-sm text-gray-700">
                      Total Gastos Deducibles
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-900 text-right">
                      {formatCurrency(summary.totalExpenses)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cerrar
          </button>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Generando PDF...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Generar y Descargar PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
