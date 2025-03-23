import { FastifyReply } from 'fastify'
import { ExperienceViewModel } from '@/viewmodel/experience-view-model'

export class ExperienceView {
  constructor(private readonly experienceViewModel: ExperienceViewModel) { }

  public async create(request: any, reply: FastifyReply) {
    try {
      const body = request.body
      const companies = await this.experienceViewModel.create(body)
      reply.code(201).send(companies)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: err.message })
    }
  }

  public async get(request: any, reply: FastifyReply) {
    try {
      const id = request.params.id

      if (!id)
        return reply.code(400).send({ message: 'Houve um erro ao tentar listas as especienciass' })
      const response = await this.experienceViewModel.getById(id)
      reply.code(200).send(response)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: err.message })
    }
  }
}