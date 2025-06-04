// src/presentation/hooks/useInvoices.ts
import { useState, useEffect } from 'react';
import { Invoice } from '../../domain/models/Invoice';
import { getInvoicesUseCase, createInvoiceUseCase } from '../../infrastructure/factories/useCases';

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const useCase = getInvoicesUseCase();
      const result = await useCase.execute();
      setInvoices(result);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const createInvoice = async (invoice: Invoice) => {
    try {
      setLoading(true);
      const useCase = createInvoiceUseCase();
      const createdInvoice = await useCase.execute(invoice);
      setInvoices([...invoices, createdInvoice]);
      return createdInvoice;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchInvoices();
  }, []);
  
  return {
    invoices,
    loading,
    error,
    fetchInvoices,
    createInvoice
  };
};
