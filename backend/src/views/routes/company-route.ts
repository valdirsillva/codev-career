import { FastifyInstance } from 'fastify'
import { makeCompanyFactory } from '@/views/factories/company-factory'
import { makeVacancyFactory } from '@/views/factories/vacancy-factory'

export async function company(app: FastifyInstance) {

  const viewCompany = makeCompanyFactory()
  const viewVacancy = makeVacancyFactory()

  app.get('/api/empresas', viewCompany.get.bind(viewCompany))
  app.post('/api/empresas', viewCompany.create.bind(viewCompany))

  app.get('/api/vagas', viewVacancy.get.bind(viewVacancy))
  app.get('/api/vagas/:id', viewVacancy.getById.bind(viewVacancy))
  app.post('/api/vagas', viewVacancy.create.bind(viewVacancy))

  return app;

}
