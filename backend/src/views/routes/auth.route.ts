import { AuthModel } from "../../models/auth"
import { AuthViewModel } from "../../viewmodel/auth-view-model"
import { AuthView } from "../auth-view"
import { FastifyInstance } from "fastify"

export async function auth(app: FastifyInstance) {
    const login = {
        email: '',
        password: ''
    }

    const auth = new AuthViewModel(new AuthModel(login))
    const authenticate = new AuthView(auth)

    app.post('/login', authenticate.login.bind(authenticate))

    return app;
}