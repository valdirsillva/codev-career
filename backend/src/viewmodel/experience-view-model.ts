import { Experience } from '@/models/experience'
import { ExperienceParams } from '@/repositories/protocols/experience-repository'

export class ExperienceViewModel {
    constructor(private readonly experience: Experience) { }

    public getById(id: string) {
        return this.experience.get(id)
    }

    public create(data: ExperienceParams) {
        return this.experience.add(data)
    }
}