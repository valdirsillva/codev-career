import { UserModel } from "../models/user"
import { User } from "../repositories/user-repository"

export class UserViewModel {
  constructor(private readonly userModel: UserModel) { }

  public get() {
    return this.userModel.getUsers()
  }

  public create(data: User) {
    return this.userModel.save(data)
  }
}
