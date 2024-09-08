import { AuthModel } from "../models/auth"
import { Auth } from "../repositories/auth-repository"

export class AuthViewModel {
    constructor(private readonly authModel: AuthModel) { }

    public login(data: Auth) {
        return this.authModel.login(data)
    }
}