import { Company } from "@/models/company"
import { CompanyParams } from "@/repositories/protocols/company-repository"

export class CompanyViewModel {
  constructor(private readonly company: Company) { }

  public get() {
    return this.company.get()
  }

  public findById(id: string) {
    return this.company.getById(id)
  }

  public create(data: CompanyParams) {
    return this.company.add(data)
  }
}


