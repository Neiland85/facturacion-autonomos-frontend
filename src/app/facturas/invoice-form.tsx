"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, Plus, Trash2, Loader2 } from "lucide-react"

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

interface InvoiceFormProps {
  invoice: Invoice | null
  clients: Client[]
  onSave: (invoiceData: Partial<Invoice>) => void
  onCancel: () => void
  isLoading: boolean
}

export default function InvoiceForm({ invoice, clients, onSave, onCancel, isLoading }: InvoiceFormProps) {
  // State for form data
  const [formData, setFormData] = useState<Partial<Invoice>>({
    client: clients[0],
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    items: [
      {
        id: 1,
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 21,
        total: 0,
      },
    ],
    subtotal: 0,
    taxAmount: 0,
    total: 0,
    notes: "",
    status: "draft",
  })

  // Initialize form data if editing an existing invoice
  useEffect(() => {
    if (invoice) {
      setFormData({
        ...invoice,
      })
    }
  }, [invoice])

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Handle client selection
  const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const clientId = Number.parseInt(e.target.value)
    const selectedClient = clients.find((client) => client.id === clientId)
    if (selectedClient) {
      setFormData((prev) => ({
        ...prev,
        client: selectedClient,
      }))
    }
  }

  // Handle item changes
  const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.items || [])]
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: typeof value === "string" && field !== "description" ? Number.parseFloat(value) || 0 : value,
      }

      // Recalculate item total
      if (field === "quantity" || field === "unitPrice" || field === "taxRate") {
        const quantity = updatedItems[index].quantity
        const unitPrice = updatedItems[index].unitPrice
        updatedItems[index].total = quantity * unitPrice
      }

      // Recalculate invoice totals
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const taxAmount = updatedItems.reduce((sum, item) => sum + item.total * (item.taxRate / 100), 0)
      const total = subtotal + taxAmount

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total,
      }
    })
  }

  // Add a new item
  const handleAddItem = () => {
    setFormData((prev) => {
      const newItemId = Math.max(0, ...(prev.items?.map((item) => item.id) || [])) + 1
      return {
        ...prev,
        items: [
          ...(prev.items || []),
          {
            id: newItemId,
            description: "",
            quantity: 1,
            unitPrice: 0,
            taxRate: 21,
            total: 0,
          },
        ],
      }
    })
  }

  // Remove an item
  const handleRemoveItem = (index: number) => {
    setFormData((prev) => {
      const updatedItems = [...(prev.items || [])].filter((_, i) => i !== index)

      // Recalculate invoice totals
      const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0)
      const taxAmount = updatedItems.reduce((sum, item) => sum + item.total * (item.taxRate / 100), 0)
      const total = subtotal + taxAmount

      return {
        ...prev,
        items: updatedItems,
        subtotal,
        taxAmount,
        total,
      }
    })
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(amount)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {invoice ? `Editar Factura ${invoice.number}` : "Crear Nueva Factura"}
          </h2>
          <button onClick={onCancel} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client and Dates */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                Cliente
              </label>
              <select
                id="client"
                name="client"
                value={formData.client?.id}
                onChange={handleClientChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Emisión
              </label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Vencimiento
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Client Details */}
          {formData.client && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Datos del Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p>
                    <span className="font-medium">NIF/CIF:</span> {formData.client.nif}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span> {formData.client.email}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-medium">Dirección:</span> {formData.client.address},{" "}
                    {formData.client.postalCode} {formData.client.city}, {formData.client.province}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Conceptos</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-1" />
                Añadir Concepto
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Descripción
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio Unitario
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % IVA
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {formData.items?.map((item, index) => (
                    <tr key={item.id}>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => handleItemChange(index, "description", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Descripción"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min="1"
                          step="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <select
                          value={item.taxRate}
                          onChange={(e) => handleItemChange(index, "taxRate", e.target.value)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="0">0%</option>
                          <option value="4">4%</option>
                          <option value="10">10%</option>
                          <option value="21">21%</option>
                        </select>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </span>
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="text-red-600 hover:text-red-900"
                          disabled={formData.items?.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex flex-col items-end space-y-1">
              <div className="flex justify-between w-48">
                <span className="text-sm text-gray-500">Subtotal:</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(formData.subtotal || 0)}</span>
              </div>
              <div className="flex justify-between w-48">
                <span className="text-sm text-gray-500">IVA:</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(formData.taxAmount || 0)}</span>
              </div>
              <div className="flex justify-between w-48 border-t border-gray-200 pt-1">
                <span className="text-sm font-medium text-gray-700">Total:</span>
                <span className="text-sm font-bold text-gray-900">{formatCurrency(formData.total || 0)}</span>
              </div>
            </div>
          </div>

          {/* Notes and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notas
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes || ""}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Añade notas o condiciones de pago..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="draft">Borrador</option>
                <option value="sent">Enviada</option>
                <option value="paid">Pagada</option>
                <option value="overdue">Vencida</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4 inline" />
                  Guardando...
                </>
              ) : invoice ? (
                "Actualizar Factura"
              ) : (
                "Crear Factura"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
