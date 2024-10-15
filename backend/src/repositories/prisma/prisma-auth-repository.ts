import { prisma } from "@/views/lib/prisma";
import { Auth, AuthModel } from "@/repositories/auth-repository";

export class PrismaAuthRepository implements Auth {
    async login({ email }: AuthModel) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email,
                }
            })
            return user
        } catch (err: any) {
            console.error(err.message)
            return null
        }
    }
}