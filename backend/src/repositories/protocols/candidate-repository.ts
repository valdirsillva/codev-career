interface User {
    id?: string
    name: string
    email: string
    password: string
    phoneNumber?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
}

export interface CandidateParams extends User {
    cpf?: string | null
    gender?: string | null
    training?: string | null
    education?: string | null
}

export interface CandidateResponse {
    id: string
    cpf: string
    gender: string
    education: string
    user: {
        id: string
        name: string
        email: string
        password: string
        phoneNumber: string
    }
}

export interface CandidateRepository {
    add: (data: CandidateParams) => Promise<CandidateParams | undefined>
    getAll: () => Promise<CandidateResponse[]>
}