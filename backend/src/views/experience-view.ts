import { ExperienceViewModel } from '@/viewmodel/experience-view-model'
import { FastifyReply, FastifyRequest } from 'fastify'

export class ExperienceView {
	constructor(private readonly experienceViewModel: ExperienceViewModel) { }

	public async create(request: any, reply: FastifyReply) {
		try {
			const body = request.body
			const companies = await this.experienceViewModel.create(body)
			reply.code(201).send(companies)
		} catch (err) {
			console.error(err)
			reply.code(400).send({ message: "Houve um erro ao cadastrar suas experiências" })
		}
	}

	public async get(request: any, reply: FastifyReply) {
		try {
			const id = request.params.id
			console.log(id)
			const response = await this.experienceViewModel.getById(id)
			reply.code(200).send(response)
		} catch (err) {
			console.error(err)
			reply.code(400).send({ message: "Houve um erro ao listar suas experiências" })
		}
	}
}