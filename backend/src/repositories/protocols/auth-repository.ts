
export interface AuthModel {
    email: string
    password: string
}

export interface Auth {
    login: (data: Auth) => Promise<Auth | null>
}