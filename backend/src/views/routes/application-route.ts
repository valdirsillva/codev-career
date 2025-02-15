import { FastifyInstance } from "fastify"
import { makeApplicationFactory } from "../factories/application-factory"

export async function application(app: FastifyInstance) {
    const application = makeApplicationFactory()

    app.post('/api/vagas/inscricao', async (req, res) => application.add(req, res))
    app.get('/api/vagas/candidaturas/:id',  async (req, res) => application.findById(req, res))
    app.get('/api/vagas/inscricao',  async (req, res) => application.get(req, res))
    return app
}