
export interface ExperienceParams {
    employee: string
    jobPosition: string
    currentVacancy: boolean
    admissionalDate: string
    demissionalDate: string
    description: string
    skills: string[]
    candidateId: string
}

export interface ResponseExperience {
    id: string
    employee: string
    jobPosition: string
    currentVacancy: boolean
    admissionalDate: string
    demissionalDate: string
    description: string
    skills: string[]
    candidateId: string
}

export interface ExperienceRepository {
    add: (data: ExperienceParams) => Promise<void>
    getById: (id: string) => Promise<ResponseExperience[]>
}
