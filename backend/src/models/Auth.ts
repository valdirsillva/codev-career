import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository";

interface Auth {
    email: string
    password: string
}

export class AuthModel {
    private props: Auth
    private repositoryAuth: PrismaAuthRepository

    constructor(props: Auth) {
        this.props = { ...props }
        this.repositoryAuth = new PrismaAuthRepository()
    }

    public set email(email: string) {
        this.props.email = email
    }

    public set password(password: string) {
        this.props.password = password
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }

    public login(data: Auth) {
        return this.repositoryAuth.login(data)
    }
}