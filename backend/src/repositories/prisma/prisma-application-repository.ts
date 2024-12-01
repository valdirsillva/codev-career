import { prisma } from "@/views/lib/prisma";
import { Application, ApplicationModel, ResponseApplication } from "../protocols/application-repository";

export class PrismaApplicationRepository implements Application {
	async findApplicationByCandidade(candidateId: string, vacancyId: string) {
		try {
			const response = await prisma.application.findFirstOrThrow({
				where: {
					candidateId,
					vacancyId,
				},
			})

			if (!response) {
				return false
			} 
			return true
		} catch(err) {
			console.error(err)
			throw err
		}
	}

	async add(data: ApplicationModel): Promise<ApplicationModel> {
		try {
			const existsApplicationFromCandidate = await this.findApplicationByCandidade(data.candidateId, data.vacancyId)
			if (existsApplicationFromCandidate) {
				throw new Error('Voce já se candidatou à essa vaga.')
			}
			const response = await prisma.application.create({
				data: {
					candidateId: data.candidateId,
					vacancyId: data.vacancyId
				}
			})

			return {
				vacancyId: response.vacancyId,
				candidateId: response.candidateId,
				createdAt: response.dateApplication
			}
		} catch (err) {
			console.error(err)
			throw err
		}
	}

	async findAll(): Promise<ResponseApplication[]> {
		try {
			const response = await prisma.application.findMany({
				include: {
					candidate: true,
					vacancy: true
				},
			})

			const applications = response.map((application) => {
				return {
					candidateId: application.candidate.id,
					cpf: application.candidate.cpf,
					education: application.candidate.education,
					gender: application.candidate.gender,
					vacancyId: application.vacancy.id,
					company: application.vacancy.companyId,
					salary: application.vacancy.salary,
					requirements: application.vacancy.requirements,
					dateSubscriber: application.dateApplication
				}
			})

			return applications
		} catch (err) {
			console.error(err)
		}
	}
}