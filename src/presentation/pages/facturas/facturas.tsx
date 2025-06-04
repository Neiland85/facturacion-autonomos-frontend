// src/presentation/pages/facturas/facturas.tsx
import React from 'react';
import { useInvoices } from '../../hooks/useInvoices';
import { Invoice } from '../../../domain/models/Invoice';

const FacturasPage: React.FC = () => {
  const { invoices, loading, error, createInvoice } = useInvoices();
  
  const handleCreateInvoice = async (invoiceData: Invoice) => {
    try {
      await createInvoice(invoiceData);
      // Mostrar notificación de éxito
    } catch (err) {
      // Manejar error en la UI
    }
  };
  
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      <h1>Facturas</h1>
      <table>
        <thead>
          <tr>
            <th>Número</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Importe</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.number}</td>
              <td>{invoice.clientId}</td>
              <td>{new Date(invoice.date).toLocaleDateString()}</td>
              <td>
                {invoice.items.reduce(
                  (sum, item) => sum + item.quantity * item.unitPrice,
                  0
                ).toFixed(2)}
              </td>
              <td>{invoice.status}</td>
              <td>
                {/* Botones de acción */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Formulario para crear facturas */}
    </div>
  );
};

export default FacturasPage;
