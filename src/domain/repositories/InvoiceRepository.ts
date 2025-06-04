// src/domain/repositories/InvoiceRepository.ts
import { Invoice } from '../models/Invoice';

export interface InvoiceRepository {
  getAll(): Promise<Invoice[]>;
  getById(id: string): Promise<Invoice>;
  create(invoice: Invoice): Promise<Invoice>;
  update(id: string, invoice: Invoice): Promise<Invoice>;
  delete(id: string): Promise<void>;
  getByClientId(clientId: string): Promise<Invoice[]>;
  getByDateRange(startDate: Date, endDate: Date): Promise<Invoice[]>;
}
