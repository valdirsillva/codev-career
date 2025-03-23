
export interface UserModel {
  id?: string
  name: string
  email: string
  password: string
  password_reset?: string
  phoneNumber: string | null
  role: string
  address: string | null
  city: string | null
  state: string | null
  image: string | null
}

export interface Users {
  users: UserModel[]
}

export interface UserRepository {
  add: (data: UserModel) => Promise<void>;
  getUsers: () => Promise<UserModel[]>
}