import { Auth } from "@/models/auth"
import { AuthView } from "@/views/auth-view"
import { AuthViewModel } from "@/viewmodel/auth-view-model"
import { PrismaAuthRepository } from "@/repositories/prisma/prisma-auth-repository"

export const makeAuthFactory = (): AuthView => {
    const repositoryAuth = new PrismaAuthRepository()
    const authModel = new Auth('', '', repositoryAuth)
    const auth = new AuthViewModel(authModel)
    return new AuthView(auth)
}