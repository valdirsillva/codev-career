import { prisma } from "../../views/lib/prisma"
import { VacancyModel } from "../protocols/vacancy-repository"
import { Vacancy } from "../vacancy-repository"

export class PrismaVacancyRepository implements Vacancy {
  async create(data: VacancyModel): Promise<VacancyModel> {
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
      const vacancies = await prisma.vacancy.findMany()
      return vacancies
    } catch (err) {
      console.error(err)
      return []
    }
  }
}