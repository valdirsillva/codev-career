import { FastifyInstance } from 'fastify'
import { UserModel } from '../../models/user'
import { UserViewModel } from '../../viewmodel/user-view-model'
import { UserView } from '../user-view'

export function userRouter(app: FastifyInstance) {
    const userInstance = {
        name: '',
        email: '',
        password: ''
    }

    const userModel = new UserModel(userInstance)
    const controllerUser = new UserViewModel(userModel)
    const viewUser = new UserView(controllerUser)

    app.get("/users", viewUser.get.bind(viewUser))
    app.post("/users", viewUser.create.bind(viewUser))

    return app;

}