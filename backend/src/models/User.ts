import { PrismaUserRepository } from "../repositories/prisma/prisma-user-repository"
import { UserModel } from "../repositories/protocols/user-repository"

export class User {
    private props: UserModel
    private repositoryUser: PrismaUserRepository

    constructor(props: UserModel, repositoryUser: PrismaUserRepository) {
        this.repositoryUser = repositoryUser
        this.props = { ...props }
    }

    public set name(name: string) {
        this.props.name = name
    }

    public set email(email: string) {
        this.props.email = email
    }

    public set password(password: string) {
        this.props.password = password
    }

    public set passwordReset(passwordReset: string) {
        this.props.password_reset = passwordReset
    }

    public get name(): string {
        return this.props.name
    }

    public get email() {
        return this.props.email
    }

    public get password() {
        return this.props.password
    }

    public save(data: Omit<UserModel, "id">) {
        return this.repositoryUser.create(data)
    }

    public getUsers() {
        return this.repositoryUser.getUsers()
    }
}