import { FastifyInstance } from 'fastify'
import { makeVacancyFactory } from '@/views/factories/vacancy-factory'

export async function vacancy(app: FastifyInstance) {
  const viewVacancy = makeVacancyFactory()
  app.get('/api/vagas', async (req, res) => viewVacancy.get(req, res))
  app.get('/api/vagas/:id', async (req, res) => viewVacancy.getById(req, res))
  app.get('/api/vagas/:id/empresa', async (req, res) => viewVacancy.getVacanciesFromCompany(req, res))
  app.post('/api/vagas', async (req, res) => viewVacancy.create(req, res))
  return app
}
