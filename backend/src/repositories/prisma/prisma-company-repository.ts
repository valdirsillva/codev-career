import { prisma } from "../../views/lib/prisma"
import { CompanyModel, UserCompany, Company } from "../protocols/company-repository"
import bcrypt from "bcryptjs"

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

  async getAll(): Promise<CompanyModel[]> {
    try {
      const response = await prisma.company.findMany()
      if (response.length === 0) {
        throw new Error("Nenhuma empresa encontrada.")
      }
      return response
    } catch (err: any) {
      console.error(err)
      return []
    }
  }

  async create(data: UserCompany): Promise<CompanyModel | undefined> {
    try {
      const saltRounds = 10
      const hash = bcrypt.hashSync(data.password, saltRounds)

      await prisma.user.create({
        data: {
          name: data.name!,
          email: data?.email,
          password: hash,
          role: data.role
        }
      })

      const response = await prisma.company.create({
        data: {
          cnpj: data.cnpj,
          name: data.name,
          sector: data.sector,
          description: data.description,
        },
      })

      if (!response) {
        throw new Error("Houve um erro a cadastrar a empresa.")
      }

      return response
    } catch (err: any) {
      console.error(err)
    }
  }
}
