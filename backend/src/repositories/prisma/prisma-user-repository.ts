import { prisma } from "@/views/lib/prisma"
import { UserModel, UserRepository } from "@/repositories/protocols/user-repository"

export class PrismaUserRepository implements UserRepository {
  async add(data: Omit<UserModel, 'id'>): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          phoneNumber: data.phoneNumber,
          address: data.address,
          city: data.city,
          state: data.state
        }
      })
    } catch (error: any) {
      throw new Error(error)
    }
  }

  async getUsers(): Promise<UserModel[]> {
    try {
      const response = await prisma.user.findMany()
      if (!response) {
        throw new Error('Nenhum usuário')
      }
      return response
    } catch (error) {
      throw new Error("")
    }
  }
}
