import { prisma } from "../../views/lib/prisma";
import { Auth, AuthRepository } from "../auth-repository";

export class PrismaAuthRepository implements AuthRepository {
    async login({ email }: Auth) {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email,
                }
            })

            return user;

        } catch (err: any) {
            console.error(err.message)
            return null;
        }
    }
}