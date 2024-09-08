
export interface Auth {
    email: string
    password: string
}

export interface AuthRepository {
    login: (data: Auth) => Promise<Auth | null>
}