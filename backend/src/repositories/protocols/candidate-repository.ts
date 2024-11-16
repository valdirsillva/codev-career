interface User {
    id: string
    name: string
    email: string
    password: string
    phoneNumber: string
    address: string
}

export interface CandidateParams extends User {
    cpf: string
    gender: string
    training: string
    education: string
    experiences: string
}

export interface Candidate {
    create: (data: CandidateParams) => Promise<CandidateParams | undefined>
    getAll: () => Promise<CandidateParams[]>
}