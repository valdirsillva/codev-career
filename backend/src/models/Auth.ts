import { PrismaAuthRepository } from "../repositories/prisma/prisma-auth-repository";
import { AuthModel } from "../repositories/protocols/auth-repository";

export class Auth {
    private props: AuthModel
    private repositoryAuth: PrismaAuthRepository

    constructor(props: AuthModel) {
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

    public login(data: AuthModel) {
        return this.repositoryAuth.login(data)
    }
}