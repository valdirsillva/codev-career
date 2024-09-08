import { JobViewModel } from "../viewmodel/job-view-model"

export class JobView {
  constructor(private readonly jobViewModel: JobViewModel) { }

  public async get(request: any, reply: any) {
    try {
      const companies = await this.jobViewModel.get()
      reply.code(200).send(companies)
    } catch (err) {
      console.error(err)
      reply
        .code(400)
        .send({ message: "Ops! Não foi possível listar as vagas!" })
    }
  }

  public async create(request: any, reply: any) {
    try {
      const body = request.body
      const data = await this.jobViewModel.create(body)
      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha ao publicar a vaga!" })
    }
  }
}
