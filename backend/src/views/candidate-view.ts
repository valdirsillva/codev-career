import { FastifyReply, FastifyRequest } from "fastify"
import { CandidateViewModel } from "../viewmodel/candidate-view-model";
import { CandidateData } from "../repositories/protocols/candidate-repository";
import bcrypt from "bcryptjs"

export class CandidateView {
  constructor(private readonly candidateViewModel: CandidateViewModel) { }

  public async get(_: FastifyRequest, reply: FastifyReply) {
    try {
      const response = await this.candidateViewModel.get()
      reply.code(200).send(response)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: "Houve um erro a cadastrar o candidato" })
    }
  }

  public async create(request: FastifyRequest, reply: FastifyReply) {
    try {
      const saltRounds = 10
      const body = request.body as CandidateData
      const password = bcrypt.hashSync(body.password, saltRounds)
      const data = await this.candidateViewModel.create(
        Object.assign(body, { password })
      )
      reply.code(201).send(data)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: "Houve um erro ao cadastrar o candidato" })
    }
  }
}