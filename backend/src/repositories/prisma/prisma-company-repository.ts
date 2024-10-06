import { prisma } from "../../views/lib/prisma"
import { Role } from "../enum/role"
import { UserCompany, Company } from "../protocols/company-repository"
import bcrypt from "bcryptjs"

export class PrismaCompanyRepository implements Company {
  // async checkCnpj(data: CompanyModel) {
  //   try {
  //     const result = await prisma.company.findUnique({
  //       where: {
  //         cnpj: data.cnpj
  //       },
  //       select: {
  //         cnpj: true
  //       },
  //     })

  //     if (result?.cnpj != null) {
  //       throw new Error("O CNPJ informado já está vinculado a uma outra empresa")
  //     }
  //     return false
  //   } catch (err: any) {
  //     return true
  //   }
  // }

  async getAll(): Promise<UserCompany[]> {
    try {
      const response = await prisma.company.findMany({
        include: {
          user: true
        }
      })

      if (response.length === 0) {
        throw new Error("Nenhuma empresa encontrada.")
      }
      const userCompanies: any = response.map(company => ({
        id: company.id,
        cnpj: company.cnpj,
        sector: company.sector,
        description: company.description,
        name: company.user.name, // Assumindo que "user" não é nulo
        email: company.user.email,
        password: company.user.password,
        phoneNumber: company.user.phoneNumber,
        address: company.user.address,
      }))

      return userCompanies

    } catch (err: any) {
      console.error(err)
      return []
    }
  }

  async create(data: UserCompany): Promise<UserCompany | undefined> {
    try {
      const saltRounds = 10
      const hash = bcrypt.hashSync(data.password, saltRounds)

      const response = await prisma.company.create({
        data: {
          cnpj: data.cnpj,
          description: data.description,
          sector: data.sector,
          user: {
            create: {
              id: data.id,
              name: data.name,
              email: data.email,
              password: hash,
              phoneNumber: data.phoneNumber,
              address: data.address,
              role: Role.Company
            },
          },
        },
        include: {
          user: true
        }
      })

      if (!response) {
        throw new Error("Houve um erro a cadastrar a empresa.")
      }
      // Mapeando manualmente o resultado para o tipo UserCompany
      const userCompany: UserCompany = {
        id: response.id,
        cnpj: response.cnpj,
        description: response.description!,
        sector: response.sector!,
        name: response.user.name,
        email: response.user.email,
        password: response.user.password,
        phoneNumber: response.user.phoneNumber,
        address: response.user.address,
      }

      return userCompany
    } catch (err: any) {
      console.error(err)
    }
  }
}
