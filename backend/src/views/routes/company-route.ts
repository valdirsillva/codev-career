import { FastifyInstance } from 'fastify'
import { makeCompanyFactory } from '@/views/factories/company-factory'

export async function company(app: FastifyInstance) {
  const viewCompany = makeCompanyFactory()

  app.get('/api/empresas', async (req, res) => viewCompany.get(req, res))
  app.post('/api/empresas', async (req, res) =>  viewCompany.create(req, res))
  app.put('/api/empresas', async (req, res) => viewCompany.updateDataCompany(req, res))
  app.get('/api/empresas/:companyId', async (req, res) => viewCompany.getById(req, res))

  return app
}
