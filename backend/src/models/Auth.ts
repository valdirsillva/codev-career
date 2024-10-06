
import { AuthModel } from "../repositories/auth-repository"
import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository"

export class Auth {
    private readonly email: string
    private readonly password: string
    private readonly authRepository: PrismaAuthRepository

    constructor(email: string, password: string, authRepository: PrismaAuthRepository) {
        this.email = email
        this.password = password
        this.authRepository = authRepository
    }

    public login(data: AuthModel) {
        return this.authRepository.login(data)
    }
}