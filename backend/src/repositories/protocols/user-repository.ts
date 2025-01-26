
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
  phoneNumber: string
  role: string
  address: string
  city?: string
  state?: string
}

export interface Users {
  users: UserModel[]
}

export interface UserRepository {
  add: (data: UserModel) => Promise<void>;
  getUsers: () => Promise<Users | {}>
}