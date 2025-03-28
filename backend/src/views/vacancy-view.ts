import { VacancyViewModel } from "@/viewmodel/vacancy-view-model"

export class VacancyView {
  constructor(private readonly vacancyViewModel: VacancyViewModel) { }

  public async get(request: any, reply: any) {
    try {
      const companies = await this.vacancyViewModel.get()
      reply.code(200).send(companies)
    } catch (err) {
      console.error(err)
      reply
        .code(400)
        .send({ message: "Ops! Não foi possível listar as vagas!" })
    }
  }

  public async getById(request: any, reply: any) {
    try {
      const id = request.params.id
      if (!id)
        return reply.code(400).send({ message: 'Error: Failed list vacancy by id'})

      const vacancy = await this.vacancyViewModel.findById(id)
      reply.code(200).send(vacancy)
    } catch (err) {
      console.error(err)
      reply
        .code(400)
        .send({ message: "Ops! Não foi possível listar as vagas!" })
    }
  }

  public async getVacanciesFromCompany(request: any, reply: any) {
    try {
      const id = request.params.id
      if (!id)
        return reply.code(400).send({ message: 'Error: Failed list vacancy by id'})

      const vacancy = await this.vacancyViewModel.findVacancyById(id)
      reply.code(200).send(vacancy)
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
      const data = await this.vacancyViewModel.create(body)
      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha ao publicar a vaga!" })
    }
  }
}
