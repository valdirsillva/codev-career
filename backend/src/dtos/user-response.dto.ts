
export interface UserResponseDTO {
    id?: string
    name: string
    email: string
    password: string
    password_reset?: string
    phoneNumber: string
    role: string
    address: string
    city?: string
    state?: string
}