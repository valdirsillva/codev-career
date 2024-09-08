import { prisma } from "../../views/lib/prisma"
import { CompanyProps } from "../../models/company"
import { Company, CompanyRepository } from "../company-repository"

export class PrismaCompanyRepository implements CompanyRepository {
  async checkCnpj(data: Company) {
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

  async create(data: Company): Promise<CompanyProps | {}> {
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
