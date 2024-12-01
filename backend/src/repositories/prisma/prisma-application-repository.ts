import { prisma } from "@/views/lib/prisma";
import { Application, ApplicationModel, ResponseApplication } from "../protocols/application-repository";

export class PrismaApplicationRepository implements Application {
	async add(data: ApplicationModel): Promise<ApplicationModel> {
		try {
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