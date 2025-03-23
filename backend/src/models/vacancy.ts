import { ResponseVacancy, VacancyModel, VacancyRepository } from '@/repositories/protocols/vacancy-repository'

export class Vacancy {
  constructor(
    private readonly title: string,
    private readonly description: string,
    private readonly salary: string,
    private readonly requirements: string,
    private readonly repositoryVacancy: VacancyRepository
  ) { }

  public getTitle(): string {
    return this.title
  }

  public getDescription(): string {
    return this.description
  }

  public getSalary(): string {
    return this.salary
  }

  public getRequirements(): string {
    return this.requirements
  }

  public add(data: VacancyModel): Promise<void> {
    return this.repositoryVacancy.add(data)
  }

  public getAllVacancies(): Promise<VacancyModel[]> {
    return this.repositoryVacancy.getAll()
  }

  public getVacancyById(id: string): Promise<ResponseVacancy> {
    return this.repositoryVacancy.findVacancyById(id)
  }

  public getVacanciesByCompany(id: string): Promise<ResponseVacancy[]> {
    return this.repositoryVacancy.findVacancyOfCompanyById(id)
  }
}