import { Vacancy } from "@/models/vacancy"
import { VacancyModel } from "@/repositories/protocols/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: Vacancy) { }

  public get() {
    return this.vacancyModel.getJobs()
  }

  public getById(id: string) {
    return this.vacancyModel.getById(id)
  }

  public create(data: VacancyModel) {
    return this.vacancyModel.save(data)
  }
}


