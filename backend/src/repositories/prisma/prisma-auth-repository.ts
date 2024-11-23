import { prisma } from "@/views/lib/prisma";
import { Auth, AuthModel } from "@/repositories/protocols/auth-repository";

export class PrismaAuthRepository implements Auth {
    async login({ email }: AuthModel) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email,
                },
                include: {
                    Candidate: {
                        select: {
                            id: true
                        }
                    }
                }
            })
            return user
        } catch (err: any) {
            console.error(err.message)
            return null
        }
    }
}