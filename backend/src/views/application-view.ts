import { FastifyReply, FastifyRequest } from 'fastify'
import { ApplicationViewModel } from '@/viewmodel/application-view-model'

interface RequestApplication {
  candidateId: any
  vacancyId: any
}

export class ApplicationView {
  constructor(private readonly viewModelApplication: ApplicationViewModel) { }

  public async add(request: FastifyRequest, reply: FastifyReply) {
    try {
      const requestBody = request.body as RequestApplication
      if (!requestBody.candidateId) {
        return reply.code(404).send({ message: 'O id do candidato nao foi recebido' })
      }

      if (!requestBody.vacancyId) {
        return reply.code(404).send({ message: 'O id da vaga nao foi recebido' })
      }
      const response = await this.viewModelApplication.add(requestBody)
      return reply.code(201).send(response)
    } catch (err) {
      console.error(err)
      return reply.code(400).send(err)
    }
  }

  public async get(_: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await this.viewModelApplication.get()
      return reply.code(200).send(response)
    } catch (err) {
      console.error(err)
    }
  }

  public async findById(request: any, reply: FastifyReply) {
    try {
      const id = request.params.id
      const response = await this.viewModelApplication.getById(id)
      return reply.code(200).send(response)
    } catch (err) {
      console.error(err)
    }
  }
}