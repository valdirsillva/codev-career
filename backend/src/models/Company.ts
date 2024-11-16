import { PrismaCompanyRepository } from "../repositories/prisma/prisma-company-repository"
import { CompanyParams } from "../repositories/protocols/company-repository"
import { User } from "@/models/user"

export class Company extends User {
  private readonly cnpj: string
  private readonly description: string
  private readonly sector: string

  private readonly companyRepository: PrismaCompanyRepository

  constructor(data: CompanyParams, companyRepository: PrismaCompanyRepository) {
    const { name, email, password, phoneNumber, address } = data
    super(name, email, password, phoneNumber, address)

    this.cnpj = data.cnpj
    this.description = data.description
    this.sector = data.sector

    this.companyRepository = companyRepository
  }

  public getCNPJ() {
    return this.cnpj
  }

  public getDescription() {
    return this.description
  }

  public getSector() {
    return this.sector
  }

  public add(data: CompanyParams) {
    return this.companyRepository.create(data)
  }

  public get() {
    return this.companyRepository.getAll()
  }
}