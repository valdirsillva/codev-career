
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
}

export interface CompanyParams extends UserModel {
  name: string
  cnpj: string
  description: string
  sector: string
}

export interface Company {
  create: (data: CompanyParams) => Promise<CompanyParams | Boolean>
  getAll: () => Promise<CompanyParams[]>
}