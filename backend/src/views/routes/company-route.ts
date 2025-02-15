import { FastifyInstance } from 'fastify'
import { makeCompanyFactory } from '@/views/factories/company-factory'

export async function company(app: FastifyInstance) {
  const viewCompany = makeCompanyFactory()

  app.get('/api/empresas', viewCompany.get.bind(viewCompany))
  app.post('/api/empresas', viewCompany.create.bind(viewCompany))
  app.get('/api/empresas/:companyId', viewCompany.getById.bind(viewCompany))
  return app
}
