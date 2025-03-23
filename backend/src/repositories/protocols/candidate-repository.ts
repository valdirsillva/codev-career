import { CandidateResponseDTO } from "@/dtos/candidate-response-dto"

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

export interface CandidateRepository {
    add: (data: CandidateParams) => Promise<void>
    getAll: () => Promise<CandidateResponseDTO[]>
}