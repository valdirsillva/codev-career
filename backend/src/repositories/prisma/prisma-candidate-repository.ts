import { prisma } from '@/views/lib/prisma'
import { Role } from '@/repositories/enum/role'
import { Candidate, CandidateParams } from '@/repositories/protocols/candidate-repository'

export class PrismaCandidateRepository implements Candidate {
  async create(data: CandidateParams): Promise<CandidateParams | undefined> {
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

  async getAll(): Promise<CandidateParams[]> {
    try {
      const candidatesDB = await prisma.candidate.findMany({
        include: {
          user: true
        }
      })

      if (candidatesDB.length === 0) {
        throw new Error('Nenhum candidato encontrado.')
      }

      const candidates: any = candidatesDB.map(candidate => ({
        id: candidate.id,
        cpf: candidate.cpf!,
        gender: candidate.gender!,
        education: candidate.education!,
        user: {
          id: candidate.user.id,
          name: candidate.user.name,
          email: candidate.user.email,
          password: candidate.user.password,
          phoneNumber: candidate.user.phoneNumber,
        }
      }))
      return candidates
    } catch (err: any) {
      console.error(err)
      return []
    }
  }
}