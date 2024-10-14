import { PrismaVacancyRepository } from "../repositories/prisma/prisma-vacancy-repository"
import { VacancyModel } from "../repositories/protocols/vacancy-repository"

export class Vacancy {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly salary: string,
    private readonly requirements: string,

    private readonly repositoryVacancy: PrismaVacancyRepository
  ) { }

  public getTitle() {
    return this.title
  }

  public getDescription() {
    return this.description
  }

  public getSalary() {
    return this.salary
  }

  public getRequirements() {
    return this.requirements
  }

  public save(data: VacancyModel) {
    return this.repositoryVacancy.create(data)
  }
  public getJobs() {
    return this.repositoryVacancy.getAll()
  }
}