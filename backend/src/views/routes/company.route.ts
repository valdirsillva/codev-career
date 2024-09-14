import { FastifyInstance } from 'fastify'
import { CompanyView } from '../company-view'
import { VacancyView } from '../vacancy-view'
import { Company } from '../../models/company'
import { Vacancy } from '../../models/vacancy'
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

  const companyModel = new Company(instanceCompany)
  const controllerCompany = new CompanyViewModel(companyModel)
  const viewCompany = new CompanyView(controllerCompany)

  const vacancyModel = new Vacancy(instanceVacancy)
  const controllerJob = new VacancyViewModel(vacancyModel)
  const viewVacancy = new VacancyView(controllerJob)

  app.get('/api/empresas', viewCompany.get.bind(viewCompany))
  app.post('/api/empresas', viewCompany.create.bind(viewCompany))

  app.get('/api/vagas', viewVacancy.get.bind(viewVacancy))
  app.post('/api/vagas', viewVacancy.create.bind(viewVacancy))

  return app;

}
