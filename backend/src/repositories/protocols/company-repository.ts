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
  sector: string
  description: string,
  image?: string
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
  add: (data: CompanyParams) => Promise<CompanyParams | Boolean>
  getAll: () => Promise<CompanyParams[]>
  getById: (id: string) => Promise<ResponseCompany>

  update: (data: CompanyProps) => Promise<void>
}