import { ExperienceRepository, ExperienceParams } from '../protocols/experience-repository'
import { prisma } from '@/views/lib/prisma'

export class PrismaExperienceRepository implements ExperienceRepository {
	async add(data: Omit<ExperienceParams, 'id'>): Promise<ExperienceParams> {
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
	}

	async getById(id: string): Promise<ExperienceParams[]> {
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

		const experiences = response.map((item) => {
			return {
				id: item.id,
				employee: item.employee,
				jobPosition: item.jobPosition,
				currentVacancy: item.currentVacancy,
				admissionalDate: item.admissionalDate,
				demissionalDate: item.demissionalDate,
				description: item.description,
				skills: item.skills,
				candidateId: item.candidate.userId,
			}
		})
		return experiences
	}
}