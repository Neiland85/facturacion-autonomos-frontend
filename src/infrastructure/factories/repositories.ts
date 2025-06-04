// src/infrastructure/factories/repositories.ts
import { InvoiceRepository } from '../../domain/repositories/InvoiceRepository';
import { InvoiceRepositoryImpl } from '../repositories/InvoiceRepositoryImpl';
import { ClientRepository } from '../../domain/repositories/ClientRepository';
import { ClientRepositoryImpl } from '../repositories/ClientRepositoryImpl';

export const getInvoiceRepository = (): InvoiceRepository => {
  return new InvoiceRepositoryImpl();
};

export const getClientRepository = (): ClientRepository => {
  return new ClientRepositoryImpl();
};

// src/infrastructure/factories/useCases.ts
import { GetInvoicesUseCase } from '../../domain/useCases/invoice/GetInvoicesUseCase';
import { CreateInvoiceUseCase } from '../../domain/useCases/invoice/CreateInvoiceUseCase';
import { getInvoiceRepository } from './repositories';

export const getInvoicesUseCase = (): GetInvoicesUseCase => {
  const repository = getInvoiceRepository();
  return new GetInvoicesUseCase(repository);
};

export const createInvoiceUseCase = (): CreateInvoiceUseCase => {
  const repository = getInvoiceRepository();
  return new CreateInvoiceUseCase(repository);
};
