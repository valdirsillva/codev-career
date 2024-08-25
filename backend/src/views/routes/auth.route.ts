import { AuthModel } from "../../models/Auth";
import { AuthViewModel } from "../../viewmodel/AuthViewModel";
import { AuthView } from "../AuthView";
import { FastifyInstance } from "fastify";

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