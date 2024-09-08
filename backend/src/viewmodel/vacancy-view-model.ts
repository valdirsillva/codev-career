import { VacancyModel } from "../models/vacancy"
import { Vacancy } from "../repositories/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: VacancyModel) { }

  public get() {
    return this.vacancyModel.getJobs()
  }

  public create(data: Vacancy) {
    return this.vacancyModel.save(data)
  }
}


