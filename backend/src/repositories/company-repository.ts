
export interface Company {
  name: string
  cnpj: string
  email: string
  password: string
}

export interface CompanyRepository {
  create: (data: Company) => Promise<Company | {}>
  getAll: () => Promise<Company[] | {}>
}