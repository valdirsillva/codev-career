import { FastifyInstance } from 'fastify'
import { makeExperienceFactory } from '@/views/factories/experience-factory'

export async function experience(app: FastifyInstance) {
  const viewExperiencesCandidate = makeExperienceFactory()

  app.get("/api/experiencias/:id/candidato", async (req, res) => viewExperiencesCandidate.get(req, res))
  app.post("/api/experiencias", async (req, res) => viewExperiencesCandidate.create(req, res))
  return app
}