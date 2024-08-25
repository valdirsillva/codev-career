import { UserModel } from "../models/User";
import { User } from "../repositories/UserRepository";

export class UserViewModel {
  private userModel: UserModel;

  constructor(userModel: UserModel) {
    this.userModel = userModel;
  }

  public get() {
    return this.userModel.getUsers()
  }

  public create(data: User) {
    return this.userModel.save(data);
  }
}
