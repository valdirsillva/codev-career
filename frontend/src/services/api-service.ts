import { AxiosInstance } from 'axios';
import { AxiosConfig } from './axios-config';

/**
 * Implementa Princípio da Responsabilidade Única (SRP)
 */
export class ApiService {
  private httpRequest: AxiosInstance

  constructor() {
    this.httpRequest = AxiosConfig.getInstance()
  }

  public get(endpoint: string) {
    return this.httpRequest.get(endpoint)
  }

  public post(endpoint: string, data: Object) {
    return this.httpRequest.post(endpoint, data)
  }

  public put(endpoint: string, data: Object) {
    return this.httpRequest.put(endpoint, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
  }
}