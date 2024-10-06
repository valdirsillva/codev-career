import { PrismaCompanyRepository } from "../repositories/prisma/prisma-company-repository"
import { UserCompany } from "../repositories/protocols/company-repository"
import { IUser } from "./IUser"

export class Company extends IUser {
  private readonly cnpj: String
  private readonly description: String
  private readonly sector: String

  private readonly companyRepository: PrismaCompanyRepository

  constructor(name: String, email: String, password: String, phoneNumber: String, address: String, cnpj: String, description: String, sector: String, companyRepository: PrismaCompanyRepository) {
    super(name, email, password, phoneNumber, address)

    this.cnpj = cnpj
    this.description = description
    this.sector = sector

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

  public add(data: UserCompany) {
    return this.companyRepository.create(data)
  }

  public get() {
    return this.companyRepository.getAll()
  }
}