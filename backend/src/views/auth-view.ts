import bcrypt from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthViewModel } from '@/viewmodel/auth-view-model'
import app from '../app'

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
    try {
      const user = request.body as Auth

      if (user.email === '' || user.password === '') {
        reply.code(404).send({ message: 'Login e senha devem ser preenchidos.' })
      }

      const data = await this.viewModelAuth.login(user)
      const response = data as AuthResponse

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
        userId: data?.Candidate.map(candidate => candidate.id),
        name: data?.name,
        email: data?.email,
        token,
        role: data?.role
      })
    } catch (err) {
      console.error(err)
      reply.code(500).send({
        message: 'Erro interno do servidor'
      })
    }
  }

  private generateTokenJwt(response: AuthResponse, user: Auth) {
    const { id, name, email } = response

    const token = app.jwt.sign({ id, name, email }, { expiresIn: '1h' })

    return token
  }
}