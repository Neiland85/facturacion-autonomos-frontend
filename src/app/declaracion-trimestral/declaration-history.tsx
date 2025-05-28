"use client"

import { Download, FileText, CheckCircle, Clock, XCircle } from "lucide-react"

// Types
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

interface DeclarationHistoryProps {
  declarations: Declaration[]
}

export default function DeclarationHistory({ declarations }: DeclarationHistoryProps) {
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
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Get status color and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "submitted":
        return {
          color: "bg-blue-100 text-blue-800",
          icon: <Clock className="h-4 w-4" />,
          text: "Presentada",
        }
      case "accepted":
        return {
          color: "bg-green-100 text-green-800",
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Aceptada",
        }
      case "rejected":
        return {
          color: "bg-red-100 text-red-800",
          icon: <XCircle className="h-4 w-4" />,
          text: "Rechazada",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800",
          icon: <FileText className="h-4 w-4" />,
          text: "Borrador",
        }
    }
  }

  // Handle download
  const handleDownload = (pdfUrl: string) => {
    window.open(pdfUrl, "_blank")
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Historial de Declaraciones</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Período
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha Generación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Base Imponible
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cuota</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {declarations.map((declaration) => {
              const statusInfo = getStatusInfo(declaration.status)
              return (
                <tr key={declaration.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {declaration.quarter} {declaration.year}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(declaration.generatedAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(declaration.summary.taxableIncome)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(declaration.summary.taxAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}
                    >
                      {statusInfo.icon}
                      <span className="ml-1">{statusInfo.text}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {declaration.pdfUrl && (
                      <button
                        onClick={() => handleDownload(declaration.pdfUrl!)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Descargar PDF"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
