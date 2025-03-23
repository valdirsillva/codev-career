import fs from 'node:fs'
import { promisify } from "util"
import { pipeline } from 'node:stream/promises'
import { FastifyReply, FastifyRequest } from "fastify"
import { CompanyViewModel } from "@/viewmodel/company-view-model"
import { CompanyProps } from '@/repositories/protocols/company-repository'

export class CompanyView {
  constructor(private readonly companyViewModel: CompanyViewModel) { }

  public async get(request: FastifyRequest, reply: FastifyReply) {
    try {
      const companies = await this.companyViewModel.get()
      reply.code(200).send(companies)
    } catch (err: any) {
      console.error(err)
      reply.code(400).send({ message: err.message })
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
    } catch (err: any) {
      console.error(err)
      reply.code(500).send({ message: err.message })
    }
  }

  public async create(request: any, reply: FastifyReply) {
    try {
      const body = request.body
      await this.companyViewModel.create(body)
      reply.code(201).send({
        message: 'Empresa cadastrada com sucesso'
      })
    } catch (err: any) {
      console.error(err)
      reply.code(500).send({ message: err.message })
    }
  }

  public async updateDataCompany(request: FastifyRequest, reply: FastifyReply) {
    const pump = promisify(pipeline)

    try {
      const newObj = {} as CompanyProps
      const data = await request.file()

      const image = data.file
      const fields = data.fields
      const filename = data.filename
      const fieldname = data.fieldname
      const encoding = data.encoding
      const mimetype = data.mimetype.split('/')[1]

      for await (const [key, value] of Object.entries(fields)) {
        if (typeof value === 'object' && value !== null && 'value' in value) {
          newObj[key] = value.value
        }
      }
      if (image) {
        // Salve a imagem recebida
        let filePath = `./public/images/${filename}`
        await pipeline(image, fs.createWriteStream(filePath))
        newObj['image'] = filename
      }
      // Execute a atualização
      const result = await this.companyViewModel.update(newObj)
      reply.code(204).send({ message: "Dados atualizados com sucesso" })
    } catch (err: any) {
      console.error(err)
      reply.code(400).send(({ message: err.message }))
    }
  }
}
