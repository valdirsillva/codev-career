import { Vacancy } from "@/models/vacancy"
import { VacancyModel } from "@/repositories/protocols/vacancy-repository"

export class VacancyViewModel {
  constructor(private readonly vacancyModel: Vacancy) { }

  public get() {
    return this.vacancyModel.getAllVacancies()
  }

  public getById(id: string) {
    return this.vacancyModel.findVacancyById(id)
  }

  public getVacancyByIdEmployee(id: string) {
    return this.vacancyModel.findVacancyByIdEmployee(id)
  }

  public create(data: VacancyModel) {
    return this.vacancyModel.add(data)
  }
}


