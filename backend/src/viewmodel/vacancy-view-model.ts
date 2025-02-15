import { Vacancy } from "@/models/vacancy"
import { VacancyModel } from "@/repositories/protocols/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: Vacancy) { }

  public get() {
    return this.vacancyModel.getAllVacancies()
  }

  public findById(id: string) {
    return this.vacancyModel.getVacancyById(id)
  }

  public findVacancyById(id: string) {
    return this.vacancyModel.getVacanciesByCompany(id)
  }

  public create(data: VacancyModel) {
    return this.vacancyModel.add(data)
  }
}


