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
      reply.code(400).send({ message: 'Error: Failed to list companies' })
    }
  }

  public async getById(request: any, reply: FastifyReply) {
    try {
      const id = request.params.companyId

      if (!id) {
        return reply.code(400).send({ message: 'Error: Failed to list company' })
      }

      const response = await this.companyViewModel.getById(id)
      reply.code(200).send(response)

    } catch (err) {
      console.error(err)
      reply.code(500).send({ message: 'Error: Failed to list company by id' })
    }
  }

  public async create(request: any, reply: FastifyReply) {
    try {
      const body = request.body
      const data = await this.companyViewModel.create(body)

      if (!data) {
        reply.code(400).send({ message: 'Error: Failed to create the company' })
      }

      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(500).send({ message: 'Failed to list company data' })
    }
  }
}
