import { prisma } from '@/views/lib/prisma'
import { Role } from '@/repositories/enum/role'
import { CandidateRepository, CandidateParams } from '@/repositories/protocols/candidate-repository'
import { CandidateMapper } from '@/mappers/candidate-mapper'
import { CandidateResponseDTO } from '@/dtos/candidate-response-dto'

export class PrismaCandidateRepository implements CandidateRepository {
  async add(data: CandidateParams): Promise<void> {
    try {
      const candidateEmailExists = await prisma.candidate.findFirst({
        where: {
          user: {
            email: data.email
          }
        }
      })
      if (candidateEmailExists) {
        throw new Error('O E-mail informado já pertence a um usuario')
      }

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
    } catch (err: any) {
      throw new Error(err)
    }
  }

  async getAll(): Promise<CandidateResponseDTO[]> {
    try {
      const candidates = await prisma.candidate.findMany({
        select: {
          id: true,
          cpf: true,
          gender: true,
          education: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phoneNumber: true,
              address: true,
              city: true,
              state: true
            }
          }
        }
      })
      if (candidates.length === 0) {
        throw new Error('Nenhum candidato encontrado.')
      }
      return CandidateMapper.toCandidate(candidates)
    } catch (error: any) {
      throw new Error(error)
    }
  }
}