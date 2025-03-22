
import { AuthModel, AuthRepository } from '@/repositories/protocols/auth-repository'

export class Auth {
  private readonly email: string
  private readonly password: string
  private readonly authRepository: AuthRepository

  constructor(email: string, password: string, authRepository: AuthRepository) {
    this.email = email
    this.password = password
    this.authRepository = authRepository
  }

  public login(data: AuthModel) {
    return this.authRepository.login(data)
  }
}
