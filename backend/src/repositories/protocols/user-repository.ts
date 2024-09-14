
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
}

export interface Users {
  users: UserModel[]
}

export interface User {
  create: (data: UserModel) => Promise<void>;
  getUsers: () => Promise<Users | {}>
}