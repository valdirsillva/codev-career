import { ApiService } from "../services/api-service";

class ApiServiceFactory {
    static create(): ApiService {
        return new ApiService()
    }
}

const makeServiceApi = ApiServiceFactory.create()

export { makeServiceApi }