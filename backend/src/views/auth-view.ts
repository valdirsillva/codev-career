import bcrypt from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthViewModel } from '@/viewmodel/auth-view-model'
import app from '../app'
import { AuthModel } from '@/repositories/protocols/auth-repository'

interface Auth {
  email: string
  password: string
}

interface AuthResponse {
  id: string
  name: string
  email: string
  password: string
}

export class AuthView {
  constructor(private readonly viewModelAuth: AuthViewModel) { }

  public async login(request: FastifyRequest, reply: FastifyReply) {
    const user = request.body as AuthModel
    if (user.email === '' || user.password === '') {
      reply.code(404).send({ message: 'Login e senha devem ser preenchidos.' })
    }
    try {
      const data = await this.viewModelAuth.login(user)
      const response = data as any

      if (response == null) {
        return reply.code(400).send({
          message: 'Login ou senha inválidos'
        })
      }

      const hasUser = bcrypt.compareSync(user.password, response.password)
      if (hasUser === false) {
        return reply.code(401).send({ message: 'Login ou senha inválidos.' })
      }

      const token = this.generateTokenJwt(response, user)
      return reply.code(200).send({
        auth: true,
        userId: response?.userId.id,
        name: response?.name,
        email: response?.email,
        token,
        role: response?.role
      })
    } catch (err: any) {
      console.error(err)
      reply.code(500).send({
        message: err.message
      })
    }
  }

  private generateTokenJwt(response: AuthResponse, user: Auth) {
    const { id, name, email } = response

    const token = app.jwt.sign({ id, name, email }, { expiresIn: '1h' })

    return token
  }
}