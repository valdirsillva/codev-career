
export abstract class User {
  constructor(
    protected readonly name: string,
    protected readonly email: string,
    protected readonly password: string,
    protected readonly phoneNumber: string,
    protected readonly address: string,
  ) { }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }

  getPhoneNumber() {
    return this.phoneNumber
  }

  getAddress() {
    return this.address
  }
}