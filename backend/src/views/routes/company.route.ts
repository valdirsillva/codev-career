import { FastifyInstance } from 'fastify'
import { CompanyView } from '../company-view'
import { VacancyView } from '../vacancy-view'
import { CompanyModel } from '../../models/company'
import { VacancyModel } from '../../models/vacancy'
import { VacancyViewModel } from '../../viewmodel/vacancy-view-model'
import { CompanyViewModel } from "../../viewmodel/company-view-model"

export async function company(app: FastifyInstance) {
  const instanceCompany = {
    name: '',
    cnpj: '',
    sector: '',
    description: '',
  }

  const instanceVacancy = {
    title: '',
    description: '',
    location: '',
    companyId: '',
    salary: '',
    requirements: ''
  }

  const companyModel = new CompanyModel(instanceCompany)
  const controllerCompany = new CompanyViewModel(companyModel)
  const viewCompany = new CompanyView(controllerCompany)

  const vacancyModel = new VacancyModel(instanceVacancy)
  const controllerJob = new VacancyViewModel(vacancyModel)
  const viewVacancy = new VacancyView(controllerJob)

  app.get('/companies', viewCompany.get.bind(viewCompany))
  app.post('/companies', viewCompany.create.bind(viewCompany))

  app.get('/jobs', viewVacancy.get.bind(viewVacancy))
  app.post('/jobs', viewVacancy.create.bind(viewVacancy))

  return app;

}
