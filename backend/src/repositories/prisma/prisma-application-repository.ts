import { prisma } from "@/views/lib/prisma"
import { ApplicationRepository, ApplicationModel, ResponseApplication } from "../protocols/application-repository"

export class PrismaApplicationRepository implements ApplicationRepository {
  async findApplicationByCandidade(candidateId: string, vacancyId: string) {
    try {
      const response = await prisma.application.findFirst({
        where: {
          candidateId,
          vacancyId,
        },
      })

      if (!response) {
        return false // Retorna false se não encontrar nenhuma inscrição
      }
      return true // Retorna true se encontrar uma inscrição
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async add(data: ApplicationModel): Promise<ApplicationModel> {
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
  }

  async findAll(): Promise<ResponseApplication[]> {
    const response = await prisma.application.findMany({
      include: {
        candidate: {
          include: {
            Experience: true
          },
        },
        vacancy: true,
      },
    })

    // Agrupar as candidaturas por vaga
    const groupByVacancy = response.reduce<{ [key: number]: ResponseApplication }>((acc, application) => {
      // Encontre ou crie uma entrada para a vaga no acumulador
      const vacancyId = application.vacancy.id
      if (!acc[vacancyId]) {
        acc[vacancyId] = {
          vacancyId: application.vacancy.id,
          company: application.vacancy.companyId,
          salary: application.vacancy.salary,
          requirements: application.vacancy.requirements,
          candidates: []
        }
      }
      // Total de candidatos inscritos na vaga
      acc[vacancyId]['totalCandidates'] = acc[vacancyId].candidates.length

      // Adicionar o candidato à vaga
      acc[vacancyId].candidates.push({
        candidateId: application.candidate.id,
        cpf: application.candidate.cpf,
        dateSubscriber: application.dateApplication.toISOString(),
        education: application.candidate.education,
        experiences: application.candidate.Experience.map((experience) => ({
          id: experience.id,
          employee: experience.employee,
          jobPosition: experience.jobPosition,
          currentVacancy: experience.currentVacancy,
          admissionalDate: experience.admissionalDate,
          demissionalDate: experience.demissionalDate,
          description: experience.description,
          skills: experience.skills,
        })),
      })
      return acc
    }, {})
    // Converter o objeto agrupado em um array 
    return Object.values(groupByVacancy)
  }

  async findById(applicationId: string): Promise<any> {
    const response = await prisma.application.findMany({
      where: { vacancyId: applicationId },
      include: {
        candidate: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })
    return response
  }
}