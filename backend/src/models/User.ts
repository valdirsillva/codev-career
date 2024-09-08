import { PrismaUserRepository } from "../repositories/prisma/PrismaUserRepository"

interface User {
    name: string
    email: string
    password: string
    password_reset?: string
}

export class UserModel {
    private props: User
    private repositoryUser: PrismaUserRepository

    constructor(props: User) {
        this.repositoryUser = new PrismaUserRepository()

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

    public save(data: Omit<User, "id">) {
        return this.repositoryUser.create(data)
    }

    public getUsers() {
        return this.repositoryUser.getUsers()
    }
}