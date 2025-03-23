import { ApplicationModel, ApplicationRepository, ResponseApplication } from "@/repositories/protocols/application-repository"

export class Application {
  private readonly vacancyId: string
  private readonly candidateId: string
  private readonly applicationRepository: ApplicationRepository

  constructor(vacancyId: string, candidateId: string, applicationRepository: ApplicationRepository) {
    this.vacancyId = vacancyId
    this.candidateId = vacancyId
    this.applicationRepository = applicationRepository
  }

  public add(data: ApplicationModel): Promise<void> {
    return this.applicationRepository.add(data)
  }

  public get(): Promise<ResponseApplication[]> {
    return this.applicationRepository.findAll()
  }

  public getById(id: string): Promise<ResponseApplication> {
    return this.applicationRepository.findById(id)
  }
}