import { PrismaCompanyRepository } from "../repositories/prisma/prisma-company-repository"
import { CompanyModel } from "../repositories/protocols/company-repository"

export class Company {
  private props: CompanyModel

  private repositoryCompany: PrismaCompanyRepository

  constructor(props: CompanyModel) {
    this.repositoryCompany = new PrismaCompanyRepository()

    this.props = { ...props }
  }

  public set name(name: string) {
    this.props.name = name
  }

  public set cnpj(cnpj: string) {
    this.props.cnpj = cnpj
  }

  public set sector(sector: string) {
    this.props.sector = sector
  }

  public set description(description: string) {
    this.props.description = description
  }

  public get name() {
    return this.name
  }

  public get cnpj() {
    return this.cnpj
  }

  public get sector() {
    return this.sector
  }

  public get description() {
    return this.description
  }

  public save(data: CompanyModel) {
    return this.repositoryCompany.create(data)
  }

  public getCompanies() {
    return this.repositoryCompany.getAll()
  }
}