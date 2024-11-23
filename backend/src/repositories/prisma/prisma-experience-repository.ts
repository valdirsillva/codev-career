import { Experience, ExperienceParams } from '../protocols/experience-repository'
import { prisma } from '@/views/lib/prisma'

export class PrismaExperienceRepository implements Experience {
	async create(data: Omit<ExperienceParams, 'id'>): Promise<ExperienceParams> {
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
			return response
		} catch (err) {
			console.error(err)
		}
	}

	async getById(id: string): Promise<ExperienceParams> {
		try {
			const response = await prisma.experience.findFirstOrThrow({
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

			const experiences: ExperienceParams = {
				id: response.id,
				employee: response.employee,
				jobPosition: response.jobPosition,
				currentVacancy: response.currentVacancy,
				admissionalDate: response.admissionalDate,
				demissionalDate: response.demissionalDate,
				description: response.description,
				skills: response.skills,
				candidateId: response.candidate.userId,
			}
			return experiences
		} catch (err) {
			console.error(err)
		}
	}
}