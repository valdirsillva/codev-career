
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

export interface ResponseExperience extends ExperienceParams {
    id: string
}

export interface ExperienceRepository {
    add: (data: ExperienceParams) => Promise<ResponseExperience>
    getById: (id: string) => Promise<ResponseExperience[]>
}
