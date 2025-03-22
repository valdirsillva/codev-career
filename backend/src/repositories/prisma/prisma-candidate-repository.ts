import { prisma } from '@/views/lib/prisma'
import { Role } from '@/repositories/enum/role'
import { CandidateRepository, CandidateParams, CandidateResponse } from '@/repositories/protocols/candidate-repository'
import { CandidateMapper } from '@/mappers/candidate-mapper'

export class PrismaCandidateRepository implements CandidateRepository {
  async add(data: CandidateParams): Promise<CandidateParams | undefined> {
    try {
      const response = await prisma.candidate.create({
        data: {
          cpf: data.cpf,
          gender: data.gender,
          education: data.education,
          user: {
            create: {
              name: data.name,
              email: data.email,
              password: data.password,
              phoneNumber: data.phoneNumber,
              address: data.address,
              city: data.city,
              state: data.state,
              role: Role.Candidate
            },
          },
        },

        include: {
          user: true
        }
      })

      if (!response) {
        throw new Error('Houve um erro ao cadastrar o candidato.')
      }

      const candidate: CandidateParams = {
        id: response.id,
        cpf: response.cpf!,
        gender: response.gender!,
        education: response.education!,
        training: response.education!,
        name: response.user.name,
        email: response.user.email,
        password: response.user.password,
        phoneNumber: response.user.phoneNumber,
        address: response.user.address,
      }
      return candidate
    } catch (err: any) {
      console.error(err)
      return undefined
    }
  }

  async getAll(): Promise<CandidateResponse[]> {
    const candidates = await prisma.candidate.findMany({
      include: {
        user: true
      }
    })
    if (candidates.length === 0) {
      throw new Error('Nenhum candidato encontrado.')
    }
    return CandidateMapper.toCandidate(candidates)
  }
}