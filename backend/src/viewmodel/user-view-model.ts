import { User } from "../models/user"
import { UserModel } from "../repositories/protocols/user-repository"

export class UserViewModel {
  constructor(private readonly user: User) { }

  public get() {
    return this.user.getUsers()
  }

  public create(data: UserModel) {
    return this.user.save(data)
  }
}
