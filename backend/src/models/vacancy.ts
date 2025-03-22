import { VacancyModel, VacancyRepository } from '@/repositories/protocols/vacancy-repository'

export class Vacancy {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly salary: string,
    private readonly requirements: string,
    private readonly repositoryVacancy: VacancyRepository
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

  public add(data: VacancyModel) {
    return this.repositoryVacancy.add(data)
  }

  public getAllVacancies() {
    return this.repositoryVacancy.getAll()
  }

  public getVacancyById(id: string) {
    return this.repositoryVacancy.findVacancyById(id)
  }

  public getVacanciesByCompany(id: string) {
    return this.repositoryVacancy.findVacancyOfCompanyById(id)
  }
}