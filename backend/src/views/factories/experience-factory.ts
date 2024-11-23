import { Experience } from '@/models/experience'
import { PrismaExperienceRepository } from '@/repositories/prisma/prisma-experience-repository'
import { ExperienceParams } from '@/repositories/protocols/experience-repository'
import { ExperienceViewModel } from '@/viewmodel/experience-view-model'
import { ExperienceView } from '../experience-view'

export const makeExperienceFactory = (): ExperienceView => {
    const candidate: ExperienceParams = {
        id: '',
        employee: '',
        jobPosition: '',
        currentVacancy: false,
        admissionalDate: '',
        demissionalDate: '',
        description: '',
        skills: [''],
        candidateId: '',
    }
    const candidateView = new ExperienceViewModel(
        new Experience(candidate, new PrismaExperienceRepository())
    )
    return new ExperienceView(candidateView)
}