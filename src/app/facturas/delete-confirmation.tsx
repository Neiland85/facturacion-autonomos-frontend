"use client"

import { Loader2 } from "lucide-react"

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

interface DeleteConfirmationProps {
  invoice: Invoice
  onConfirm: () => void
  onCancel: () => void
  isLoading: boolean
}

export default function DeleteConfirmation({ invoice, onConfirm, onCancel, isLoading }: DeleteConfirmationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirmar eliminación</h2>
          <p className="text-sm text-gray-600 mb-6">
            ¿Estás seguro de que deseas eliminar la factura <span className="font-medium">{invoice.number}</span> para{" "}
            <span className="font-medium">{invoice.client.name}</span>? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 inline" />
                  Eliminando...
                </>
              ) : (
                "Eliminar"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
