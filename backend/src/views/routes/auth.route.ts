import { FastifyInstance } from "fastify"
import { makeAuthFactory } from "../factories/auth-factory"

export async function auth(app: FastifyInstance) {
    const authenticate = makeAuthFactory()

    app.post('/api/login', authenticate.login.bind(authenticate))
    return app
}