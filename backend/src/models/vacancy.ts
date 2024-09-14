import { PrismaVacancyRepository } from "../repositories/prisma/prisma-vacancy-repository"
import { VacancyModel } from "../repositories/protocols/vacancy-repository"

export class Vacancy {
  private props: VacancyModel
  private repositoryVacancy: PrismaVacancyRepository

  constructor(props: VacancyModel) {
    this.repositoryVacancy = new PrismaVacancyRepository()

    this.props = { ...props }
  }

  public set title(title: string) {
    this.props.title = title
  }

  public set description(description: string) {
    this.props.description = description
  }

  public set location(location: string) {
    this.props.location = location
  }

  public set salary(salary: string) {
    this.props.salary = salary
  }

  public set requirements(requirement: string) {
    this.props.requirements = requirement
  }

  public get title() {
    return this.props.title
  }

  public get location() {
    return this.props.location
  }

  public get salary() {
    return this.props.salary
  }

  public get requirements() {
    return this.props.requirements
  }

  public save(data: VacancyModel) {
    return this.repositoryVacancy.create(data)
  }
  public getJobs() {
    return this.repositoryVacancy.getAll()
  }
}