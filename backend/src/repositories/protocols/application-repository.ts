export interface Experiences {
    id: string
    employee: string,
    jobPosition: string
    currentVacancy: boolean
    admissionalDate: string
    demissionalDate: string
    description: string
    skills: string[]
}

export interface ApplicationModel {
    vacancyId: string
    candidateId: string
    createdAt?: Date
}

export interface ResponseApplication {
    company: string
    salary: string
    requirements: string
    candidate: {
        candidateId:string
        cpf: string
        dateSubscriber: string
        education: string
        experiences: Experiences[]
    }
}

export interface Application {
    add: (data: ApplicationModel) => Promise<ApplicationModel>
    findAll: () => Promise<ResponseApplication[]>
}
