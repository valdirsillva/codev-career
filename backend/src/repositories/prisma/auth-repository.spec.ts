import { PrismaAuthRepository } from "./prisma-auth-repository"
import { prisma } from '../../views/lib/prisma'

describe('Auth Repository', () => {
    test('Should return a user object on login', async () => {
        const mockUser = {
            id: '1',
            email: 'teste@teste.com',
            password: 'hashed_password',
            password_reset: null,
            name: 'Test User',
            role: 'user'
        }

        const prismaRepositoryStub = new PrismaAuthRepository()
        const spyAuth = jest.spyOn(prismaRepositoryStub, 'login').mockResolvedValue(mockUser)
        const result = await prismaRepositoryStub.login({ email: 'jhondoe@gmail.com', password: '123' })

        expect(spyAuth).toHaveBeenCalledWith({ email: 'jhondoe@gmail.com', password: '123' })
        expect(result).toEqual(mockUser)
    })
})