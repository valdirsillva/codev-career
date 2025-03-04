import { ExperienceParams, ExperienceRepository } from '@/repositories/protocols/experience-repository'

export class Experience {
    private readonly employee: string
    private readonly jobPosition: string
    private readonly description: string
    private readonly skills: string[]
    private readonly currentVacancy: boolean
    private readonly admissionalDate: string
    private readonly demissionalDate: string
    private readonly candidateId: string

    private readonly experienceRepository: ExperienceRepository

    constructor(experience: ExperienceParams, experienceRepository: ExperienceRepository) {
        this.employee = experience.employee
        this.jobPosition = experience.jobPosition
        this.description = experience.description
        this.skills = experience.skills
        this.currentVacancy = experience.currentVacancy
        this.admissionalDate = experience.admissionalDate
        this.demissionalDate = experience.demissionalDate
        this.candidateId = experience.candidateId
        this.experienceRepository = experienceRepository
    }

    public getEmployee(): string {
        return this.employee
    }

    public getJobPosition(): string {
        return this.jobPosition
    }

    public getDescription(): string {
        return this.description
    }

    public getSkills(): string[] {
        return this.skills.map((s) => s)
    }

    public getCurrentVacancy(): boolean {
        return this.currentVacancy
    }

    public getAdmissionalDate(): string {
        return this.admissionalDate
    }

    public getDemissiomDate(): string {
        return this.demissionalDate
    }

    public getCandidateId(): string {
        return this.candidateId
    }

    public add(data: ExperienceParams) {
        return this.experienceRepository.add(data)
    }

    public get(id: string) {
        return this.experienceRepository.getById(id)
    }
}