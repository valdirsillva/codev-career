import { prisma } from "@/views/lib/prisma";
import { UserModel, UserRepository } from "@/repositories/protocols/user-repository";

export class PrismaUserRepository implements UserRepository {
  async add(data: Omit<UserModel, 'id'>): Promise<void> {
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
  }

  async getUsers(): Promise<UserModel[]> {
    const response = await prisma.user.findMany()

    if (response.length === 0) {
      throw new Error('Nenhum usuário')
    }

    return response
  }
}
