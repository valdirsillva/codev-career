import { Role } from "../enum/role"
import { prisma } from "@/views/lib/prisma"
import { AuthRepository, AuthModel } from "@/repositories/protocols/auth-repository"

export class PrismaAuthRepository implements AuthRepository {
  async login({ email }: AuthModel): Promise<AuthModel | null> {
    try {
      const response = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (response) {
        if (response.role === Role.Company) {
          const companyId = await prisma.company.findFirst({
            where: {
              userId: response.id
            },
            select: {
              id: true
            }
          })
          return Object.assign({}, response, { userId: companyId })
        }
        const candidateId = await prisma.candidate.findFirst({
          where: {
            userId: response.id
          },
          select: {
            id: true
          }
        })
        return Object.assign({}, response, { userId: candidateId })
      }

      return null
    } catch (error: any) {
      throw new Error(error)
    }
  }
}