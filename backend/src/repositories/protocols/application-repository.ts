interface ExperienceDetail {
    id: number
    employee: string
    jobPosition: string
    currentVacancy: boolean
    admissionalDate: string
    demissionalDate: string
    description: string
    skills: string[]
}

interface CandidateDetail {
    candidateId: number
    cpf: string
    dateSubscriber: string
    education: string
    experiences: ExperienceDetail[]
}

export interface ApplicationModel {
    vacancyId: string
    candidateId: string
    createdAt?: Date
}

export interface ResponseApplication {
    vacancyId: string
    company: string
    salary: number
    requirements: string
    candidates: CandidateDetail[]
}

export interface ApplicationRepository {
    add: (data: ApplicationModel) => Promise<ResponseApplication>
    findAll: () => Promise<ResponseApplication[]>
    findById: (applicationId: string) => Promise<any>
}
