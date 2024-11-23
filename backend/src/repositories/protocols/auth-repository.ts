
export interface AuthModel {
    email: string
    password: string
}

export interface Auth {
    login: (data: AuthModel) => Promise<AuthModel | null>
}