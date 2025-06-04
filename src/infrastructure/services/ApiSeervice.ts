// src/infrastructure/services/ApiService.ts
import httpClient from '../http/httpClient';

export abstract class ApiService<T> {
  constructor(protected baseUrl: string) {}

  getAll(): Promise<T[]> {
    return httpClient.get<T[]>(this.baseUrl);
  }

  getById(id: string): Promise<T> {
    return httpClient.get<T>(`${this.baseUrl}/${id}`);
  }

  create(data: T): Promise<T> {
    return httpClient.post<T>(this.baseUrl, data);
  }

  update(id: string, data: T): Promise<T> {
    return httpClient.put<T>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: string): Promise<void> {
    return httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
