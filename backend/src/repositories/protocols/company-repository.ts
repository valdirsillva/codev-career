export interface User {
  id?: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
  image?: string
}

export interface CompanyParams extends User {
  name: string
  cnpj: string
  sector: string
  description: string
}

export interface ResponseCompany {
  name: string
  cnpj: string
  sector?: string | null
  description: string | null
  image?: string | null
}

export interface CompanyProps {
  id?: string
  name: string
  cnpj: string
  sector: string
  email: string
  address: string
  phoneNumber: string
  image?: string
  description?: string
}

export interface CompanyRepository {
  add: (data: CompanyParams) => Promise<void>
  getAll: () => Promise<ResponseCompany[]>
  getById: (id: string) => Promise<ResponseCompany>
  update: (data: CompanyProps) => Promise<void>
}