
export abstract class IUser {
    constructor(
        protected readonly name: String,
        protected readonly email: String,
        protected readonly password: String,
        protected readonly phoneNumber: String,
        protected readonly address: String,
    ) { }

    getName() {
        return this.name;
    }

    getEmail() {
        return this.email;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    getAddress() {
        return this.address;
    }
}