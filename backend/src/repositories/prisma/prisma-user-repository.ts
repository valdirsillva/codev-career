import { prisma } from "../../views/lib/prisma";
import { UserModel, User } from "../user-repository";

export class PrismaUserRepository implements User {
  async create(data: Omit<UserModel, 'id'>): Promise<void> {
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
