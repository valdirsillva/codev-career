


interface User {
  id?: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
}

export interface CompanyParams extends User {
  name: string
  cnpj: string
  sector: string
  description: string
}

export interface CompanyRepository {
  add: (data: CompanyParams) => Promise<CompanyParams | Boolean>
  getAll: () => Promise<CompanyParams[]>
}