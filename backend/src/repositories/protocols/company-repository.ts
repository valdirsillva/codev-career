
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
}

export interface UserCompany extends UserModel {
  cnpj: string
  description: string
  sector: string
}

export interface Company {
  create: (data: UserCompany) => Promise<UserCompany | undefined>
  getAll: () => Promise<UserCompany[]>
}