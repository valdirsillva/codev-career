import { FastifyInstance } from 'fastify'
import { makeExperienceFactory } from '@/views/factories/experience-factory'

export async function experience(app: FastifyInstance) {
    const viewExperiencesCandidate = makeExperienceFactory()

    app.get("/api/experiencias/:id/candidato", viewExperiencesCandidate.get.bind(viewExperiencesCandidate))
    app.post("/api/experiencias", viewExperiencesCandidate.create.bind(viewExperiencesCandidate))

    return app
}