import { PrismaCompanyRepository } from "../repositories/prisma/prisma-company-repository"

export interface CompanyProps {
  name: string
  cnpj: string
  sector: string
  description: string
}

export class CompanyModel {
  private props: CompanyProps

  private repositoryCompany: PrismaCompanyRepository

  constructor(props: CompanyProps) {
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

  public save(data: CompanyProps) {
    return this.repositoryCompany.create(data)
  }

  public getCompanies() {
    return this.repositoryCompany.getAll()
  }
}