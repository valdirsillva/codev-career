import { prisma } from "../../views/lib/prisma";
import { VacancyModel } from "../protocols/vacancy-repository";
import { Vacancy } from "../vacancy-repository";

export class PrismaVacancyRepository implements Vacancy {
  async create(vacancyData: VacancyModel): Promise<VacancyModel> {
    const vacancy = await prisma.vacancy.create({
      data: {
        ...vacancyData
      },
    })
    return vacancy
  }

  async getAll(): Promise<VacancyModel[]> {
    const vacancies = await prisma.vacancy.findMany()
    return vacancies
  }
}