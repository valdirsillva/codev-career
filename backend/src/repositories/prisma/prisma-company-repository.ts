import { prisma } from "../../views/lib/prisma"
import { CompanyModel, Company } from "../protocols/company-repository"

export class PrismaCompanyRepository implements Company {
  async checkCnpj(data: CompanyModel) {
    try {
      const result = await prisma.company.findUnique({
        where: {
          cnpj: data.cnpj
        },
        select: {
          cnpj: true
        },
      })

      if (result?.cnpj != null) {
        throw new Error("O CNPJ informado já está vinculado a uma outra empresa")
      }
      return false
    } catch (err: any) {
      return true
    }
  }

  async getAll(): Promise<Company[] | {}> {
    const companies = await prisma.company.findMany()
    return { companies: companies }
  }

  async create(data: CompanyModel): Promise<CompanyModel | {}> {
    const result = await prisma.company.create({
      data: {
        cnpj: data.cnpj,
        name: data.name,
        sector: data.sector,
        description: data.description,
      },
    })
    return result
  }
}
