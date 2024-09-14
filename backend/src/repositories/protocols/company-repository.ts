
export interface CompanyModel {
  name: string
  cnpj: string
  sector: string
  description: string
}

export interface Company {
  create: (data: CompanyModel) => Promise<CompanyModel | {}>
  getAll: () => Promise<CompanyModel[] | {}>
}