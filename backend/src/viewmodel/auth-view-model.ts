import { Auth } from "@/models/auth"
import { AuthModel } from "@/repositories/auth-repository"

export class AuthViewModel {
    constructor(private readonly authModel: Auth) { }

    public login(data: AuthModel) {
        return this.authModel.login(data)
    }
}