import { FastifyReply, FastifyRequest } from "fastify"
import { CompanyViewModel } from "@/viewmodel/company-view-model"

export class CompanyView {
  constructor(private readonly companyViewModel: CompanyViewModel) { }

  public async get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const companies = await this.companyViewModel.get()
      reply.code(200).send(companies)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha listar as empresas" })
    }
  }

  public async create(request: any, reply: FastifyReply) {
    try {
      const body = request.body
      const data = await this.companyViewModel.create(body)
      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha cadastrar os dados da empresas" })
    }
  }
}
