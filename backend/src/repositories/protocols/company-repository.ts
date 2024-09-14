
export interface CompanyModel {
  name: string | null
  cnpj: string
  sector: string
  description: string
}

export interface Company {
  create: (data: CompanyModel) => Promise<CompanyModel | undefined>
  getAll: () => Promise<CompanyModel[]>
}