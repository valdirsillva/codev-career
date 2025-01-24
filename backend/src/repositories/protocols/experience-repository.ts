
export interface ExperienceParams {
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
    create: (data: Omit<ExperienceParams, 'id'>) => Promise<ExperienceParams>
    getById: (id: string) => Promise<ExperienceParams[]>
}
