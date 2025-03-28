import bcrypt from 'bcryptjs'
import { prisma } from '@/views/lib/prisma'
import { Role } from '@/repositories/enum/role'
import { CompanyParams, CompanyProps, CompanyRepository, ResponseCompany } from '@/repositories/protocols/company-repository'

export class PrismaCompanyRepository implements CompanyRepository {
  async add(data: CompanyParams): Promise<CompanyParams | Boolean> {
    const saltRounds = 10
    const hash = bcrypt.hashSync(data.password, saltRounds)
    const response = await prisma.company.create({
      data: {
        cnpj: data.cnpj,
        description: data.description,
        sector: data.sector,
        name: data.name,
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
        user: true,
      },
    })

    if (!response) {
      throw new Error("Houve um erro a cadastrar a empresa.")
    }
    // Mapeando manualmente o resultado para o tipo CompanyParams
    const userCompany: CompanyParams = {
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
  }

  async getAll(): Promise<CompanyParams[]> {
    const response = await prisma.company.findMany({
      include: {
        Vacancy: {
          select: {
            id: true,
            title: true,
            description: true,
            salary: true
          },
        },
      },
    })

    if (response.length === 0) {
      throw new Error("Nenhuma empresa encontrada.")
    }
    const userCompanies: any = response.map(company => ({
      id: company.id,
      cnpj: company.cnpj,
      sector: company.sector,
      description: company.description,
      vagas: company.Vacancy.map(vacancy => vacancy),
    }))

    return userCompanies
  }

  async getById(id: string): Promise<ResponseCompany> {
    const company = await prisma.company.findUnique({
      where: {
        id: id
      },
      include: {
        user: {
          select: {
            image: true
          },
        },
      },
    })
    return company
  }

  async update(data: CompanyProps): Promise<void> {
    const company = await prisma.company.findUnique({
      where: { id: data.id },
      select: { userId: true }, // Obtém apenas o userId associado
    })

    if (!company || !company.userId) {
      throw new Error(`Empresa com ID ${data.id} não encontrada ou sem usuário associado.`)
    }

    // Atualiza dados da empresa
    await prisma.company.update({
      where: { id: data.id },
      data: {
        name: data.name,
        cnpj: data.cnpj,
        sector: data.sector,
        description: data.description,
      },
    })

    // Atualiza dados do usuario do tipo empresa em User
    await prisma.user.update({
      where: { id: company.userId },
      data: {
        email: data.email,
        address: data.address,
        phoneNumber: data.phoneNumber,
        image: data.image
      },
    })
  }
}
