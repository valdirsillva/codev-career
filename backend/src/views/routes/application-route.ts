import { FastifyInstance } from "fastify"
import { makeApplicationFactory } from "../factories/application-factory"

export async function application(app: FastifyInstance) {
    const application = makeApplicationFactory()

    app.post('/api/vagas/inscricao', application.add.bind(application))
    app.get('/api/vagas/candidaturas/:id', application.findById.bind(application))
    app.get('/api/vagas/inscricao', application.get.bind(application))
    return app
}