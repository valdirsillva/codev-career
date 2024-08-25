import { AuthModel } from "../models/Auth";
import { Auth } from "../repositories/AuthRepository";

export class AuthViewModel {
    private authModel: AuthModel;

    constructor(authModel: AuthModel) {
        this.authModel = authModel;
    }

    public login(data: Auth) {
        return this.authModel.login(data);
    }
}