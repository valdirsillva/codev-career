import { PrismaAuthRepository } from "./prisma-auth-repository"

const sut = (): PrismaAuthRepository => {
  return new PrismaAuthRepository()
}

describe('Auth Repository', () => {
  test('Should return a user object on login', async () => {
    const makeFakeUser = {
      id: '1',
      email: 'teste@teste.com',
      password: 'hashed_password',
      password_reset: null,
      name: 'Test User',
      role: 'user'
    }

    const prismaRepositoryStub = sut()
    const spyAuth = jest.spyOn(prismaRepositoryStub, 'login').mockResolvedValue(makeFakeUser)
    const response = await prismaRepositoryStub.login({ email: 'jhondoe@gmail.com', password: '123' })
    expect(spyAuth).toHaveBeenCalledWith({ email: 'jhondoe@gmail.com', password: '123' })
    expect(response).toEqual(makeFakeUser)
  })
})