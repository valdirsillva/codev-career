export interface ApplicationModel {
    vacancyId: string
    candidateId: string
    createdAt?: Date
}

export interface ResponseApplication {
    cpf: string
    education: string
    gender: string

    company: string
    salary: string
    requirements: string
}

export interface Application {
    add: (data: ApplicationModel) => Promise<ApplicationModel>
    findAll: () => Promise<ResponseApplication[]>
}