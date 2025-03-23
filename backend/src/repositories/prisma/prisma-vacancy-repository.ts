import { prisma } from "@/views/lib/prisma"
import { ResponseVacancy, VacancyModel } from "@/repositories/protocols/vacancy-repository"
import { VacancyRepository } from "@/repositories/protocols/vacancy-repository"

export class PrismaVacancyRepository implements VacancyRepository {
  async add(data: VacancyModel): Promise<void> {
    try {
      const response = await prisma.vacancy.create({
        data: {
          title: data.title,
          description: data.description,
          salary: data.salary,
          requirements: data.requirements,
          company: {
            connect: {
              id: data.companyId
            },
          },
        },
      })
      if (!response) throw new Error("Não foi possível cadastrar a vaga")
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getAll(): Promise<VacancyModel[]> {
    try {
      const response = await prisma.vacancy.findMany({
        include: {
          company: true
        }
      })
      if (!response) throw new Error("Nenhuma vaga encontrada.")
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }

  // Retorna vaga por id
  async findVacancyById(id: string): Promise<ResponseVacancy> {
    try {
      const response = await prisma.vacancy.findUnique({
        where: {
          id: id
        },
        include: {
          company: true
        }
      })
      if (!response) throw new Error("Nenhuma vaga encontrada.")
      return response
    } catch (error: any) {
      throw new Error(error)
    }
  }
  // Retorna todas as vagas da empresa 
  async findVacancyOfCompanyById(id: string): Promise<ResponseVacancy[]> {
    try {
      const response = await prisma.vacancy.findMany({
        where: {
          companyId: id
        }
      })
      if (response.length === 0) {
        throw new Error("Nenhuma vaga encontrada.")
      }
      const vacancies: any = response.map(v => ({
        id: v.id,
        title: v.title,
        salary: v.salary,
        description: v.description,
        companyId: v.companyId
      }))
      return vacancies
    } catch (error: any) {
      throw new Error(error)
    }
  }
}