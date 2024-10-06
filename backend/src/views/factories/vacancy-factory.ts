import { Vacancy } from "../../models/vacancy"
import { PrismaVacancyRepository } from "../../repositories/prisma/prisma-vacancy-repository"
import { VacancyViewModel } from "../../viewmodel/vacancy-view-model"
import { VacancyView } from "../vacancy-view"

export const makeVacancyFactory = (): VacancyView => {
    const repository = new PrismaVacancyRepository()
    const vacancyModel = new Vacancy('', '', '', '', '', '', '', '', '', '', '', '', repository)
    const controllerJob = new VacancyViewModel(vacancyModel)
    return new VacancyView(controllerJob)
}