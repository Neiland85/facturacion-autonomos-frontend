// src/infrastructure/repositories/InvoiceRepositoryImpl.ts
import { Invoice } from '../../domain/models/Invoice';
import { InvoiceRepository } from '../../domain/repositories/InvoiceRepository';
import httpClient from '../http/httpClient';

export class InvoiceRepositoryImpl implements InvoiceRepository {
  private readonly baseUrl = '/invoices';

  async getAll(): Promise<Invoice[]> {
    return httpClient.get<Invoice[]>(this.baseUrl);
  }

  async getById(id: string): Promise<Invoice> {
    return httpClient.get<Invoice>(`${this.baseUrl}/${id}`);
  }

  async create(invoice: Invoice): Promise<Invoice> {
    return httpClient.post<Invoice>(this.baseUrl, invoice);
  }

  async update(id: string, invoice: Invoice): Promise<Invoice> {
    return httpClient.put<Invoice>(`${this.baseUrl}/${id}`, invoice);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }

  async getByClientId(clientId: string): Promise<Invoice[]> {
    return httpClient.get<Invoice[]>(`${this.baseUrl}/client/${clientId}`);
  }

  async getByDateRange(startDate: Date, endDate: Date): Promise<Invoice[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    
    return httpClient.get<Invoice[]>(`${this.baseUrl}/range`, { params });
  }
}
