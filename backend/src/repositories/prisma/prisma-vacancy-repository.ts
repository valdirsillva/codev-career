import { prisma } from "../../views/lib/prisma";
import { VacancyRepository, Vacancy } from "../vacancy-repository";

export class PrismaVacancyRepository implements VacancyRepository {
  async create(vacancyData: Vacancy): Promise<Vacancy | {}> {

    const vacancy = await prisma.vacancy.create({
      data: {
        ...vacancyData
      },
    })
    return vacancy
  }

  async getAll(): Promise<Vacancy[]> {
    const vacancies = await prisma.vacancy.findMany()
    return vacancies
  }
}