
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
}

export interface Users {
  users: User[]
}

export interface User {
  create: (data: UserModel) => Promise<void>;
  getUsers: () => Promise<Users | {}>
}