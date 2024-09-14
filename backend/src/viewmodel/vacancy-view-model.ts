import { Vacancy } from "../models/vacancy"
import { VacancyNodel } from "../repositories/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: Vacancy) { }

  public get() {
    return this.vacancyModel.getJobs()
  }

  public create(data: VacancyNodel) {
    return this.vacancyModel.save(data)
  }
}


