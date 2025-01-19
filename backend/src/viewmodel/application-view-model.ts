import { Application } from "@/models/application";
import { ApplicationModel } from "@/repositories/protocols/application-repository";

export class ApplicationViewModel {
    constructor(private readonly applicationModel: Application) { }

    public add(data: ApplicationModel) {
        return this.applicationModel.add(data)
    }

    public get() {
        return this.applicationModel.get()
    }

    public getById(id: string) {
        return this.applicationModel.getById(id)
    }
}