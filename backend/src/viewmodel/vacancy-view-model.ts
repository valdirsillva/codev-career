import { Vacancy } from "../models/vacancy"
import { VacancyModel } from "../repositories/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: Vacancy) { }

  public get() {
    return this.vacancyModel.getJobs()
  }

  public create(data: VacancyModel) {
    return this.vacancyModel.save(data)
  }
}


