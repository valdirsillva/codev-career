import bcrypt from 'bcryptjs'
import { FastifyReply, FastifyRequest } from 'fastify'
import { CandidateViewModel } from '@/viewmodel/candidate-view-model'
import { CandidateParams } from '@/repositories/protocols/candidate-repository'

export class CandidateView {
  constructor(private readonly candidateViewModel: CandidateViewModel) { }

  public async get(_: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await this.candidateViewModel.get()
      reply.code(200).send(response)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: 'Houve um erro ao listar os dados' })
    }
  }

  public async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const saltRounds = 10
      const body = request.body as CandidateParams
      const password = bcrypt.hashSync(body.password, saltRounds)
      const response = await this.candidateViewModel.create(
        Object.assign(body, { password })
      )
      return reply.code(201).send(response)
    } catch (err: any) {
      console.error(err.message)
      return reply.code(400).send({ message: err.message })
    }
  }
}