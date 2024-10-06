interface User {
    id: string
    name: string
    email: string
    password: string
    phoneNumber: string
    address: string
}

export interface CandidateData extends User {
    cpf: string
    gender: string
    education: string
    experiences: string
}

export interface Candidate {
    create: (data: CandidateData) => Promise<CandidateData | undefined>
    getAll: () => Promise<CandidateData[]>
}