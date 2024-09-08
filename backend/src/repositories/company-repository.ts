
export interface Company {
  name: string
  cnpj: string
  sector: string
  description: string
}

export interface CompanyRepository {
  create: (data: Company) => Promise<Company | {}>
  getAll: () => Promise<Company[] | {}>
}