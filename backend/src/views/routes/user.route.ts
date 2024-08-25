import { FastifyInstance } from 'fastify'
import { UserModel } from '../../models/User'
import { UserViewModel } from '../../viewmodel/UserViewModel'
import { UserView } from '../UserView'

export function userRouter(app: FastifyInstance) {
    const userInstance = {
        name: '',
        email: '',
        password: ''
    }

    const userModel = new UserModel(userInstance)
    const controllerUser = new UserViewModel(userModel)
    const viewUser = new UserView(controllerUser)

    app.get("/candidates", viewUser.get.bind(viewUser))
    app.post("/candidates", viewUser.create.bind(viewUser))

    return app;

}