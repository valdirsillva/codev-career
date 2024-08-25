import { prisma } from "../../views/lib/prisma";
import { UserRepository, User } from "../UserRepository";

export class PrismaUserRepository implements UserRepository {
  async create(data: User) {
    try {
      await prisma.user.create({
        data: { ...data },
      })

    } catch (error) {
      console.log(error)
    }
  }

  async getUsers(): Promise<User[] | {}> {
    const response = await prisma.user.findMany()
    return response
  }
}
