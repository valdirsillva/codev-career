interface User {
    id: string
    name: string
}

export interface AuthModel {
    email: string
    password: string
    role: string
}

export interface AuthRepository {
    login: (data: AuthModel) => Promise<AuthModel | null>
}