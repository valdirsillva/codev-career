interface User {
    id: string
    name: string
}

export interface AuthModel {
    // name?: string
    email: string
    password: string
    // role?: string
    // userId?: User
}

export interface AuthRepository {
    login: (data: AuthModel) => Promise<AuthModel | null>
}