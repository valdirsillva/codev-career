import { ExperienceMapper } from '@/mappers/experience-mapper'
import { ExperienceRepository, ExperienceParams, ResponseExperience } from '../protocols/experience-repository'
import { prisma } from '@/views/lib/prisma'

export class PrismaExperienceRepository implements ExperienceRepository {
  async add(data: Omit<ExperienceParams, 'id'>): Promise<void> {
    try {
      const response = await prisma.experience.create({
        data: {
          employee: data.employee,
          jobPosition: data.jobPosition,
          currentVacancy: data.currentVacancy,
          admissionalDate: data.admissionalDate,
          demissionalDate: data.demissionalDate,
          description: data.description,
          skills: data.skills,
          candidateId: data.candidateId
        },
      })
      if (!response) throw new Error('Houve um erro ao listar as epxeriencia')
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getById(id: string): Promise<ResponseExperience[]> {
    try {
      const response = await prisma.experience.findMany({
        where: {
          candidateId: id,
        },
        include: {
          candidate: {
            select: {
              userId: true
            },
          },
        },
      })

      if (!response) {
        throw new Error("Não foi possivel listar as experiencias do candidato")
      }
      return ExperienceMapper.toExperienceDTO(response)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}