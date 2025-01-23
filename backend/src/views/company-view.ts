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

  public async getById(request: any, reply: FastifyReply) {
    try {
      const id = request.params.id
      const companies = await this.companyViewModel.findById(id)
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

      if (!data) {
        reply.code(400).send({ message: 'Não foi possive cadastrar a empresa'})
      }

      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha cadastrar os dados da empresas" })
    }
  }
}
