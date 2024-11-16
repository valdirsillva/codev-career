
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
  phoneNumber: string
  role: string
  address: string
}

export interface Users {
  users: UserModel[]
}

export interface User {
  create: (data: UserModel) => Promise<void>;
  getUsers: () => Promise<Users | {}>
}