import { UserViewModel } from "../viewmodel/user-view-model"
import bcrypt from "bcryptjs"

export class UserView {
  constructor(private readonly userViewModel: UserViewModel) { }

  public async get(request: any, reply: any) {
    try {
      const companies = await this.userViewModel.get()
      reply.code(200).send(companies)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Não foi possível listar usuários!" })
    }
  }

  public async create(request: any, reply: any) {
    try {
      const { email, name, password } = request.body
      const saltRounds = 10
      const hash = bcrypt.hashSync(password, saltRounds)

      const data = await this.userViewModel.create({
        email, name, password: hash
      })

      reply.code(201).send(data)
    } catch (err) {
      console.error(err)
      reply.code(400).send({ message: "Ops! Falha ao cadastrar usuário!" })
    }
  }
}