import { FastifyReply, FastifyRequest } from "fastify"
import { CandidateViewModel } from "../viewmodel/candidate-view-model";
import { CandidateData } from "../repositories/protocols/candidate-repository";

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
      const body = request.body as CandidateData
      const data = await this.candidateViewModel.create(body)
      reply.code(201).send(data)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: "Houve um erro ao cadastrar o candidato" })
    }
  }
}