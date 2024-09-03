import { CompanyProps } from "../../models/Company";
import { prisma } from "../../views/lib/prisma";
import { Company, CompanyRepository } from "../CompanyRepository";

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
        name: data.name,
        email: data.email,
        cnpj: data.cnpj,
        password: data.password
      },
    })
    return result
  }
}
