// src/domain/useCases/invoice/GetInvoicesUseCase.ts
import { Invoice } from '../../models/Invoice';
import { InvoiceRepository } from '../../repositories/InvoiceRepository';

export class GetInvoicesUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(): Promise<Invoice[]> {
    return this.invoiceRepository.getAll();
  }
}

// src/domain/useCases/invoice/CreateInvoiceUseCase.ts
import { Invoice } from '../../models/Invoice';
import { InvoiceRepository } from '../../repositories/InvoiceRepository';

export class CreateInvoiceUseCase {
  constructor(private invoiceRepository: InvoiceRepository) {}

  async execute(invoice: Invoice): Promise<Invoice> {
    // Aquí puedes añadir validaciones de negocio
    if (!invoice.number || invoice.items.length === 0) {
      throw new Error('Invoice must have a number and at least one item');
    }
    
    return this.invoiceRepository.create(invoice);
  }
}
