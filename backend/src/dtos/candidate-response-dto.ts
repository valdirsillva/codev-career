
export interface CandidateResponseDTO {
    id: string
    cpf?: string | null
    gender: string | null
    education: string | null
    user: User
}

export interface User {
    id: string,
    name: string,
    email: string,
    phoneNumber: string | null
    address: string | null
    city: string | null
    state: string | null
}