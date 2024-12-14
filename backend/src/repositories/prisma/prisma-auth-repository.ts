import { prisma } from "@/views/lib/prisma";
import { Auth, AuthModel } from "@/repositories/protocols/auth-repository";
import { Role } from "../enum/role";

export class PrismaAuthRepository implements Auth {
    async login({ email }: AuthModel) {
        try {
            const response = await prisma.user.findFirst({
                where: {
                    email,
                },
            })

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

        } catch (err: any) {
            console.error(err.message)
            return null
        }
    }
}