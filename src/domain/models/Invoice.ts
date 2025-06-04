// src/domain/models/Invoice.ts
export interface Invoice {
  id?: string;
  number: string;
  date: Date;
  clientId: string;
  items: InvoiceItem[];
  taxRate: number;
  status: 'draft' | 'sent' | 'paid' | 'canceled';
  paymentDueDate?: Date;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface InvoiceItem {
  id?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxable: boolean;
}
