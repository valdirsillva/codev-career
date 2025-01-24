import { ApplicationModel, ApplicationRepository } from "@/repositories/protocols/application-repository"

export class Application {
    private readonly vacancyId: string
    private readonly candidateId: string
    private readonly applicationRepository: ApplicationRepository

    constructor(vacancyId: string, candidateId: string, applicationRepository: ApplicationRepository) {
        this.vacancyId = vacancyId
        this.candidateId = vacancyId

        this.applicationRepository = applicationRepository
    }

    public add(data: ApplicationModel) {
        return this.applicationRepository.add(data)
    }

    public get() {
        return this.applicationRepository.findAll()
    }

    public getById(id: string) {
        return this.applicationRepository.findById(id)
    }
}