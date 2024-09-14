import { prisma } from "../../views/lib/prisma";
import { Candidate, CandidateModel } from "../protocols/candidate-repository";

export class PrismaCandidateRepository implements Candidate {
  async create(candidate: CandidateModel): Promise<CandidateModel | undefined> {
    try {
      const response = await prisma.candidate.create({
        data: {
          name: candidate.name,
          email: candidate.email,
          experiences: candidate.experiences
        },
      })

      if (!response) {
        throw new Error('Houve um erro ao cadastrar o candidato.')
      }

      return response
    } catch (err: any) {
      console.error(err)
      return undefined
    }
  }

  async getAll(): Promise<CandidateModel[]> {
    try {
      const response = await prisma.candidate.findMany()

      if (response.length === 0) {
        throw new Error('Nenhum candidato encontrado.')
      }

      return response
    } catch (err: any) {
      console.error(err)
      return []
    }
  }
}