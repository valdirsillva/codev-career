// import { FastifyInstance } from 'fastify'
// import { User } from '../../models/user'
// import { UserViewModel } from '../../viewmodel/user-view-model'
// import { UserView } from '../user-view'
// import { PrismaUserRepository } from '../../repositories/prisma/prisma-user-repository'

// export function userRouter(app: FastifyInstance) {
//     const userInstance = {
//         name: '',
//         email: '',
//         password: ''
//     }

//     const userModel = new User(userInstance, new PrismaUserRepository())
//     const controllerUser = new UserViewModel(userModel)
//     const viewUser = new UserView(controllerUser)

//     app.get("/api/usuarios", viewUser.get.bind(viewUser))
//     app.post("/api/usuarios", viewUser.create.bind(viewUser))

//     return app;

// }