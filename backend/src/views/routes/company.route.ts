import { FastifyInstance } from 'fastify'
import { makeCompanyFactory } from '../factories/company-factory'
import { makeVacancyFactory } from '../factories/vacancy-factory'

export async function company(app: FastifyInstance) {

  const viewCompany = makeCompanyFactory()
  const viewVacancy = makeVacancyFactory()

  app.get('/api/empresas', viewCompany.get.bind(viewCompany))
  app.post('/api/empresas', viewCompany.create.bind(viewCompany))

  app.get('/api/vagas', viewVacancy.get.bind(viewVacancy))
  app.post('/api/vagas', viewVacancy.create.bind(viewVacancy))

  return app;

}
