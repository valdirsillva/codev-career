
export interface CompanyModel {
  id?: string
  name: string | null
  cnpj: string
  sector: string | null
  description?: string | null
}

export interface UserCompany extends CompanyModel {
  cnpj: string
  email: string
  password: string
  role: string
}

export interface Company {
  create: (data: UserCompany) => Promise<CompanyModel | undefined>
  getAll: () => Promise<CompanyModel[]>
}