import { CompanyParams, CompanyProps, CompanyRepository, ResponseCompany } from '@/repositories/protocols/company-repository'
import { User } from '@/models/user'

export interface UserProps {
  id?: string
  name: string
  email: string
  password: string
  phoneNumber: string
  address: string
}

export class Company extends User {
  private readonly cnpj: string
  private readonly sector: string
  private readonly description: string
  private readonly companyRepository: CompanyRepository

  constructor(data: CompanyParams, companyRepository: CompanyRepository) {
    const { name, email, password, phoneNumber, address } = data
    super(name, email, password, phoneNumber, address)
    this.cnpj = data.cnpj
    this.description = data.description
    this.sector = data.sector
    this.companyRepository = companyRepository
  }

  public getCNPJ(): string {
    return this.cnpj
  }

  public getDescription(): string {
    return this.description
  }

  public getSector(): string {
    return this.sector
  }

  public add(data: CompanyParams): Promise<ResponseCompany> {
    return this.companyRepository.add(data)
  }

  public get(): Promise<ResponseCompany[]> {
    return this.companyRepository.getAll()
  }

  public getCompanyById(id: string): Promise<ResponseCompany> {
    return this.companyRepository.getById(id)
  }

  public updateDataCompany(data: CompanyProps): Promise<void> {
    return this.companyRepository.update(data)
  }
}
