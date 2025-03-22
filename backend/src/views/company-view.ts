import fs from 'node:fs'
import { FastifyReply, FastifyRequest } from "fastify"
import { CompanyViewModel } from "@/viewmodel/company-view-model"

import { pipeline } from 'node:stream/promises'
import { promisify } from "util"
import { CompanyProps } from '@/repositories/protocols/company-repository'

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

    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Falha ao atualizar os dados do usuário." })
    }
  }
}
