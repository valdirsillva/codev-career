import { prisma } from "@/views/lib/prisma"
import { ResponseVacancy, VacancyModel } from "@/repositories/protocols/vacancy-repository"
import { VacancyRepository } from "@/repositories/protocols/vacancy-repository"

export class PrismaVacancyRepository implements VacancyRepository {
  async add(data: VacancyModel): Promise<VacancyModel> {
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
      return response
    } catch (err) {
      throw err
    }
  }

  async getAll(): Promise<VacancyModel[]> {
    try {
      const vacancies = await prisma.vacancy.findMany({
        include: {
          company: true
        }
      })
      return vacancies
    } catch (err) {
      console.error(err)
      return []
    }
  }

  async findVacancyById(id: string): Promise<ResponseVacancy> {
    try {
      const vacancies = await prisma.vacancy.findUnique({
        where: {
          id: id
        },
        include: {
          company: true
        }
      })
      return vacancies
    } catch (err) {
      console.error(err)
    }
  }

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

    } catch(err) {
      console.error(err.message)
      return []
    }
  }
}