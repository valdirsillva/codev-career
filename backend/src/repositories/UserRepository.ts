
export interface User {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
}

export interface Users {
  users: User[]
}

export interface UserRepository {
  create: (data: User) => Promise<void>;
  getUsers: () => Promise<Users | {}>
}